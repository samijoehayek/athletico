/**
 * Athletico Store — order book (v2)
 * =================================
 * A Google Apps Script web app bound to the club's order sheet. The website's
 * server (app/api/orders and, later, the payment routes) is its only caller.
 *
 * Two tabs:
 *   Items   one row per item, in the columns of the club's paper order sheet
 *           (NAME, DESCR, SIZE, QTY, COLOR, NAME TO PRINT, NUMBER, BRANCH) plus
 *           price, payment and a STATUS dropdown. This is the tab staff work in.
 *   Orders  one row per order: customer, branch, total, payment state,
 *           T&C version, and the full order as JSON (hidden column) so the
 *           website can read an order back without a database.
 *
 * Actions (POST body: {"secret": "...", "action": "...", ...}):
 *   createOrder  {order}                      → writes both tabs as PENDING PAYMENT,
 *                                               emails the customer and the club
 *   markPaid     {reference, payment}         → PAID; returns firstTime=true only
 *                                               the first time (so emails go once)
 *   markFailed   {reference, reason}          → PAYMENT FAILED, if still pending
 *   getOrder     {reference}                  → the order and its payment status
 * Every write runs under a script lock and is idempotent, because payment
 * callbacks, webhooks and the customer's browser can all report the same event.
 *
 * ─── Setup (once, about ten minutes) ──────────────────────────────────────
 *  1. In the club's Google account, create a new Google Sheet
 *     ("Athletico Store — Orders").
 *  2. Extensions → Apps Script. Delete the placeholder code and paste this file.
 *  3. Project Settings (gear icon) → Script properties → add:
 *       SHARED_SECRET   the same long random string as ORDERS_SHARED_SECRET on
 *                       the website (never put it in this file — the repo is public)
 *       NOTIFY_EMAILS   staff addresses for new orders, comma-separated
 *                       (optional; leave empty to send no staff email)
 *  4. Back in the editor, choose `setupSheet` in the toolbar and Run. Approve the
 *     permissions Google asks for (Sheets, send email as you).
 *  5. Deploy → New deployment → type "Web app".
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     ("Anyone" is required: the request comes from the website's server, not
 *      from a signed-in Google user. SHARED_SECRET is what guards it.)
 *  6. Copy the Web app URL (ends in /exec) into ORDERS_WEBHOOK_URL on the website.
 *  7. Optional: run `sendTestOrder` to see a fake order land in both tabs.
 *
 * Updating the code later: Deploy → Manage deployments → edit (pencil) →
 * Version: "New version" → Deploy. That keeps the same /exec URL.
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
var CONFIG = {
  CLUB_NAME: "Athletico Sports Club",
  ITEMS_SHEET: "Items",
  ORDERS_SHEET: "Orders",
  TIMEZONE: "Asia/Beirut",
  // Set false to stop all emails from this script (e.g. once the website sends
  // its own confirmation and receipt emails).
  SEND_EMAILS: true,
};

function secret_() {
  return PropertiesService.getScriptProperties().getProperty("SHARED_SECRET") || "";
}
function notifyList_() {
  var raw = PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAILS") || "";
  return raw.split(",").map(function (s) { return s.trim(); }).filter(String);
}
// ───────────────────────────────────────────────────────────────────────────

/** Item STATUS: the first three are set by the website, the rest by staff. */
var ITEM_STATUSES = [
  "PENDING PAYMENT", "PAID", "PAYMENT FAILED",
  "ORDERED", "READY FOR COLLECTION", "COLLECTED", "CANCELLED", "REFUNDED",
];
var STATUS_COLOURS = {
  "PENDING PAYMENT": "#FFF3CD",
  "PAID": "#D4EDDA",
  "PAYMENT FAILED": "#F8D7DA",
  "ORDERED": "#CCE5FF",
  "READY FOR COLLECTION": "#D1ECF1",
  "COLLECTED": "#E2E3E5",
  "CANCELLED": "#F8D7DA",
  "REFUNDED": "#EADCF8",
};

/** Order PAYMENT: written by the website only. */
var PAYMENT_STATUSES = ["PENDING PAYMENT", "PAID", "PAYMENT FAILED", "REFUNDED"];

// Column layouts. Code below looks columns up by header name, so reordering
// here (and re-running setupSheet on an empty sheet) is safe.
var ITEM_HEADERS = [
  "DATE", "ORDER", "NAME", "PHONE", "DESCR", "SIZE", "QTY", "COLOR",
  "NAME TO PRINT", "NUMBER", "BRANCH", "PRICE", "PAYMENT", "STATUS",
];
var ITEM_WIDTHS = [95, 140, 170, 115, 230, 70, 45, 150, 130, 75, 220, 75, 170, 170];

var ORDER_HEADERS = [
  "ORDER", "DATE", "PAYMENT", "CUSTOMER", "PLAYER", "PHONE", "EMAIL", "BRANCH",
  "UNITS", "TOTAL", "METHOD", "PAYMENT REF", "GATEWAY ID", "PAID AT",
  "T&C VERSION", "NOTES", "ORDER JSON",
];
var ORDER_WIDTHS = [140, 130, 140, 170, 150, 115, 200, 220, 55, 80, 110, 140, 160, 130, 100, 220, 120];

// ─── Setup ─────────────────────────────────────────────────────────────────

/** Run once from the editor to build and format both tabs. Safe to re-run. */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE);

  var items = prepareTab_(ss, CONFIG.ITEMS_SHEET, ITEM_HEADERS, ITEM_WIDTHS);
  var orders = prepareTab_(ss, CONFIG.ORDERS_SHEET, ORDER_HEADERS, ORDER_WIDTHS);

  // Items first: it's the tab staff live in.
  ss.setActiveSheet(items);
  ss.moveActiveSheet(1);

  var rows = items.getMaxRows() - 1;
  items.getRange(2, col_(ITEM_HEADERS, "DATE"), rows, 1).setNumberFormat("d/m/yyyy");
  items.getRange(2, col_(ITEM_HEADERS, "PRICE"), rows, 1).setNumberFormat("$#,##0.00");
  items.getRange(2, col_(ITEM_HEADERS, "QTY"), rows, 1).setHorizontalAlignment("center");

  // STATUS is a dropdown so it can't be mistyped out of a filter, coloured by value.
  var statusRange = items.getRange(2, col_(ITEM_HEADERS, "STATUS"), rows, 1);
  statusRange.setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(ITEM_STATUSES, true).setAllowInvalid(false).build()
  );
  items.setConditionalFormatRules(colourRules_(statusRange, ITEM_STATUSES));
  if (!items.getFilter()) items.getRange(1, 1, items.getMaxRows(), ITEM_HEADERS.length).createFilter();

  var oRows = orders.getMaxRows() - 1;
  orders.getRange(2, col_(ORDER_HEADERS, "DATE"), oRows, 1).setNumberFormat("d/m/yyyy HH:mm");
  orders.getRange(2, col_(ORDER_HEADERS, "PAID AT"), oRows, 1).setNumberFormat("d/m/yyyy HH:mm");
  orders.getRange(2, col_(ORDER_HEADERS, "TOTAL"), oRows, 1).setNumberFormat("$#,##0.00");
  var payRange = orders.getRange(2, col_(ORDER_HEADERS, "PAYMENT"), oRows, 1);
  orders.setConditionalFormatRules(colourRules_(payRange, PAYMENT_STATUSES));
  // Payment state is the website's record of what the gateway confirmed;
  // staff see it but edit the item STATUS instead.
  if (!orders.getProtections(SpreadsheetApp.ProtectionType.RANGE).length) {
    payRange.protect().setDescription("Written by the website").setWarningOnly(true);
  }
  orders.hideColumns(col_(ORDER_HEADERS, "ORDER JSON"));
  if (!orders.getFilter()) orders.getRange(1, 1, orders.getMaxRows(), ORDER_HEADERS.length).createFilter();

  // Remove the default empty "Sheet1" if it's still around.
  var stray = ss.getSheetByName("Sheet1");
  if (stray && stray.getLastRow() === 0 && ss.getSheets().length > 2) ss.deleteSheet(stray);

  // A toast, not an alert: an alert keeps the run "executing" in the editor
  // until someone clicks OK in the Sheet, which looks like a hang.
  var message = secret_()
    ? "Order book ready. Next: Deploy → New deployment → Web app."
    : "Order book ready. Still to do: add SHARED_SECRET in Project Settings → Script properties.";
  ss.toast(message, "Athletico Store", 15);
  console.log(message);
}

function prepareTab_(ss, name, headers, widths) {
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold")
    .setBackground("#0B3E80")
    .setFontColor("#FFFFFF")
    .setVerticalAlignment("middle");
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, headers.length).setVerticalAlignment("top");
  return sheet;
}

function colourRules_(range, values) {
  return values.map(function (v) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(v).setBackground(STATUS_COLOURS[v] || "#FFFFFF").setRanges([range]).build();
  });
}

// ─── Web app ───────────────────────────────────────────────────────────────

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "malformed" });
  }
  var expected = secret_();
  if (!expected || body.secret !== expected) return json_({ ok: false, error: "unauthorised" });

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(25000);
  } catch (err) {
    return json_({ ok: false, error: "busy" });
  }
  try {
    switch (body.action || "createOrder") {
      case "createOrder": return json_(createOrder_(body.order));
      case "markPaid": return json_(markPaid_(body.reference, body.payment || {}));
      case "markFailed": return json_(markFailed_(body.reference, body.reason));
      case "getOrder": return json_(getOrder_(body.reference));
      default: return json_({ ok: false, error: "unknown action" });
    }
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: "athletico-order-book", version: 2 });
}

// ─── Actions ───────────────────────────────────────────────────────────────

function createOrder_(order) {
  if (!order || !order.reference || !order.lines || !order.lines.length) {
    return { ok: false, error: "malformed order" };
  }
  var orders = sheet_(CONFIG.ORDERS_SHEET);
  // Idempotent: a retried request must not duplicate the order or its emails.
  if (findOrderRow_(orders, order.reference)) return { ok: true, reference: order.reference, duplicate: true };

  var c = order.customer;
  var placedAt = new Date(order.placedAt);
  var name = (c.playerName || c.name || "").toUpperCase();
  var paymentLabel = methodLabel_(order.payment) + (order.payment.reference ? " · " + order.payment.reference : "");

  var itemRows = order.lines.map(function (l) {
    var p = l.personalisation || {};
    return byHeader_(ITEM_HEADERS, {
      "DATE": placedAt,
      "ORDER": order.reference,
      "NAME": name,
      "PHONE": c.phone,
      "DESCR": String(l.name).toUpperCase(),
      "SIZE": l.size,
      "QTY": l.qty,
      "COLOR": (l.colourwayName || "").toUpperCase(),
      "NAME TO PRINT": (p.name || "").toUpperCase(),
      "NUMBER": p.number || "",
      "BRANCH": String(order.branchName || "").toUpperCase(),
      "PRICE": l.lineTotalUSD,
      "PAYMENT": paymentLabel,
      "STATUS": "PENDING PAYMENT",
    });
  });
  var items = sheet_(CONFIG.ITEMS_SHEET);
  var start = items.getLastRow() + 1;
  var range = items.getRange(start, 1, itemRows.length, ITEM_HEADERS.length);
  // Plain text for phone and number so Sheets keeps leading zeros and "07".
  items.getRange(start, col_(ITEM_HEADERS, "PHONE"), itemRows.length, 1).setNumberFormat("@");
  items.getRange(start, col_(ITEM_HEADERS, "NUMBER"), itemRows.length, 1).setNumberFormat("@");
  range.setValues(itemRows);

  var units = order.lines.reduce(function (n, l) { return n + l.qty; }, 0);
  orders.appendRow(byHeader_(ORDER_HEADERS, {
    "ORDER": order.reference,
    "DATE": placedAt,
    "PAYMENT": "PENDING PAYMENT",
    "CUSTOMER": c.name,
    "PLAYER": c.playerName || "",
    "PHONE": "'" + c.phone,
    "EMAIL": c.email,
    "BRANCH": order.branchName,
    "UNITS": units,
    "TOTAL": order.totalUSD,
    "METHOD": methodLabel_(order.payment),
    "PAYMENT REF": order.payment.reference || "",
    "GATEWAY ID": order.payment.gatewayId || "",
    "PAID AT": "",
    "T&C VERSION": order.termsVersion || "",
    "NOTES": (order.unavailable || []).join("; "),
    "ORDER JSON": JSON.stringify(order),
  }));

  if (CONFIG.SEND_EMAILS) {
    notifyClub_(order);
    notifyCustomer_(order);
  }
  return { ok: true, reference: order.reference };
}

/**
 * Called once a payment gateway has confirmed the money. Returns firstTime so
 * the caller sends confirmation emails exactly once, however many times the
 * gateway (or the customer's browser) reports the same payment.
 */
function markPaid_(reference, payment) {
  var orders = sheet_(CONFIG.ORDERS_SHEET);
  var row = findOrderRow_(orders, reference);
  if (!row) return { ok: false, error: "not found" };

  var payCol = col_(ORDER_HEADERS, "PAYMENT");
  var current = orders.getRange(row, payCol).getValue();
  var order = JSON.parse(orders.getRange(row, col_(ORDER_HEADERS, "ORDER JSON")).getValue());
  if (current === "PAID") return { ok: true, firstTime: false, order: order };

  var paidAt = payment.paidAt ? new Date(payment.paidAt) : new Date();
  orders.getRange(row, payCol).setValue("PAID");
  orders.getRange(row, col_(ORDER_HEADERS, "PAID AT")).setValue(paidAt);
  if (payment.method) orders.getRange(row, col_(ORDER_HEADERS, "METHOD")).setValue(methodLabel_(payment));
  if (payment.reference) orders.getRange(row, col_(ORDER_HEADERS, "PAYMENT REF")).setValue(payment.reference);
  if (payment.gatewayId) orders.getRange(row, col_(ORDER_HEADERS, "GATEWAY ID")).setValue(payment.gatewayId);

  // Move the order's items from PENDING PAYMENT / PAYMENT FAILED to PAID, but
  // never overwrite a status staff have already moved on.
  setItemStatuses_(reference, "PAID", ["PENDING PAYMENT", "PAYMENT FAILED"], payment);
  return { ok: true, firstTime: true, order: order };
}

function markFailed_(reference, reason) {
  var orders = sheet_(CONFIG.ORDERS_SHEET);
  var row = findOrderRow_(orders, reference);
  if (!row) return { ok: false, error: "not found" };
  var payCol = col_(ORDER_HEADERS, "PAYMENT");
  // A late "failed" must never undo a confirmed payment.
  if (orders.getRange(row, payCol).getValue() !== "PENDING PAYMENT") return { ok: true, changed: false };
  orders.getRange(row, payCol).setValue("PAYMENT FAILED");
  if (reason) {
    var notes = orders.getRange(row, col_(ORDER_HEADERS, "NOTES"));
    notes.setValue([notes.getValue(), "Payment: " + reason].filter(String).join("; "));
  }
  setItemStatuses_(reference, "PAYMENT FAILED", ["PENDING PAYMENT"]);
  return { ok: true, changed: true };
}

function getOrder_(reference) {
  var orders = sheet_(CONFIG.ORDERS_SHEET);
  var row = findOrderRow_(orders, reference);
  if (!row) return { ok: false, error: "not found" };
  return {
    ok: true,
    payment: orders.getRange(row, col_(ORDER_HEADERS, "PAYMENT")).getValue(),
    order: JSON.parse(orders.getRange(row, col_(ORDER_HEADERS, "ORDER JSON")).getValue()),
  };
}

function setItemStatuses_(reference, status, fromStatuses, payment) {
  var items = sheet_(CONFIG.ITEMS_SHEET);
  var last = items.getLastRow();
  if (last < 2) return;
  var orderCol = col_(ITEM_HEADERS, "ORDER");
  var statusCol = col_(ITEM_HEADERS, "STATUS");
  var paymentCol = col_(ITEM_HEADERS, "PAYMENT");
  var refs = items.getRange(2, orderCol, last - 1, 1).getValues();
  for (var i = 0; i < refs.length; i++) {
    if (refs[i][0] !== reference) continue;
    var cell = items.getRange(i + 2, statusCol);
    if (fromStatuses.indexOf(cell.getValue()) !== -1) cell.setValue(status);
    if (payment && payment.method) {
      items.getRange(i + 2, paymentCol).setValue(
        methodLabel_(payment) + (payment.reference ? " · " + payment.reference : "")
      );
    }
  }
}

// ─── Emails ────────────────────────────────────────────────────────────────

/** Staff email, laid out to be printed and dropped into the bag. */
function notifyClub_(order) {
  var to = notifyList_();
  if (!to.length) return;
  var c = order.customer;
  var rows = order.lines.map(function (l) {
    var p = l.personalisation || {};
    var print = p.name || p.number
      ? '<div style="margin-top:4px;padding:4px 8px;background:#FFE400;font-weight:bold">PRINT: '
        + esc_(p.name || "") + " " + esc_(p.number || "") + "</div>"
      : "";
    return "<tr>"
      + '<td style="padding:8px;border-bottom:1px solid #ddd">' + l.qty + "</td>"
      + '<td style="padding:8px;border-bottom:1px solid #ddd">' + esc_(l.name)
      + '<div style="color:#666;font-size:12px">' + esc_(l.size)
      + (l.colourwayName ? " · " + esc_(l.colourwayName) : "") + " · " + esc_(l.sku) + "</div>"
      + print + "</td>"
      + '<td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">$'
      + l.lineTotalUSD.toFixed(2) + "</td></tr>";
  }).join("");

  var html =
    '<div style="font-family:Helvetica,Arial,sans-serif;max-width:640px;color:#12203a">'
    + '<div style="background:#0B3E80;color:#fff;padding:20px"><div style="font-size:11px;letter-spacing:2px;opacity:.7">NEW ORDER · PENDING PAYMENT</div>'
    + '<div style="font-size:26px;font-weight:bold">' + esc_(order.reference) + "</div></div>"
    + '<table style="width:100%;border-collapse:collapse;margin-top:16px">' + rows + "</table>"
    + '<table style="width:100%;margin-top:12px;font-size:14px">'
    + '<tr><td style="padding:8px 0;font-weight:bold;border-top:2px solid #0B3E80">TOTAL</td>'
    + '<td style="padding:8px 0;text-align:right;font-weight:bold;font-size:18px;border-top:2px solid #0B3E80">$'
    + order.totalUSD.toFixed(2) + "</td></tr></table>"
    + '<div style="margin-top:20px;padding:16px;background:#f4f8fc">'
    + "<div><strong>" + esc_(c.name) + "</strong>"
    + (c.playerName ? " · player: <strong>" + esc_(c.playerName) + "</strong>" : "") + "</div>"
    + "<div>" + esc_(c.phone) + " · " + esc_(c.email) + "</div>"
    + '<div style="margin-top:8px">Collect from: <strong>' + esc_(order.branchName) + "</strong></div>"
    + "</div>"
    + '<div style="margin-top:16px;padding:12px;border-left:4px solid #d98324;background:#fafafa">'
    + "<strong>" + esc_(methodLabel_(order.payment)) + "</strong>"
    + (order.payment.reference ? "<br>Reference: <strong>" + esc_(order.payment.reference) + "</strong>" : "")
    + '<br><span style="color:#d98324">Don\'t prepare this order until the order sheet shows it as PAID.</span>'
    + "</div></div>";

  MailApp.sendEmail({
    to: to.join(","),
    replyTo: order.customer.email,
    subject: "New order " + order.reference + " — $" + order.totalUSD.toFixed(2) + " (pending payment)",
    htmlBody: html,
    name: "Athletico Store",
  });
}

/**
 * The "automatic acknowledgement of receipt" of clause 5.2 of the Terms. It
 * says plainly that this is not yet the Order Confirmation (clause 5.3), which
 * only follows once payment is verified.
 */
function notifyCustomer_(order) {
  if (!order.customer.email) return;
  var items = order.lines.map(function (l) {
    var p = l.personalisation || {};
    return "<li>" + l.qty + "× " + esc_(l.name) + " (" + esc_(l.size)
      + (l.colourwayName ? ", " + esc_(l.colourwayName) : "") + ")"
      + (p.name || p.number ? " — " + esc_(p.name || "") + " " + esc_(p.number || "") : "")
      + "</li>";
  }).join("");

  var html =
    '<div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;color:#12203a">'
    + '<div style="background:#0B3E80;color:#fff;padding:24px">'
    + '<div style="font-size:11px;letter-spacing:2px;opacity:.7">ORDER RECEIVED</div>'
    + '<div style="font-size:24px;font-weight:bold">' + esc_(order.reference) + "</div></div>"
    + '<div style="padding:24px 0"><p>Hi ' + esc_(String(order.customer.name).split(" ")[0])
    + ", we've received your order:</p>"
    + "<ul>" + items + "</ul>"
    + "<p><strong>Total: $" + order.totalUSD.toFixed(2) + "</strong><br>"
    + "Collect from " + esc_(order.branchName) + " · " + esc_(order.collectionEta) + "</p>"
    + '<p style="padding:12px;background:#FFF3CD;border-left:4px solid #FFE400">'
    + "This is an acknowledgement of receipt, not yet your order confirmation. "
    + "We'll confirm your order once your payment has been verified.</p>"
    + '<p style="color:#666;font-size:13px">Questions? Reply to this email and quote '
    + esc_(order.reference) + ".</p></div></div>";

  MailApp.sendEmail({
    to: order.customer.email,
    subject: CONFIG.CLUB_NAME + " — order " + order.reference + " received",
    htmlBody: html,
    name: "Athletico Store",
  });
}

// ─── Test helper ───────────────────────────────────────────────────────────

/** Run from the editor to see a fake order land in both tabs (no website needed). */
function sendTestOrder() {
  var ref = "TEST-" + Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyMMdd-HHmmss");
  createOrder_({
    reference: ref,
    placedAt: new Date().toISOString(),
    customer: {
      name: "Test Parent",
      playerName: "Test Player",
      phone: "+961 70 000 000",
      email: Session.getActiveUser().getEmail(),
      branch: "dbaye",
    },
    branchName: "Athletico Sports City - Dbaye",
    collectionEta: "Ready for collection within 10–15 days",
    payment: { method: "bob", reference: "TEST" },
    termsVersion: "test",
    lines: [
      { name: "Hoodie", size: "140", qty: 1, colourwayName: "Blue", sku: "ATH-HOD-140", lineTotalUSD: 35 },
      { name: "Training Socks", size: "KIDS", qty: 2, colourwayName: "White", sku: "ATH-SOC-KIDS", lineTotalUSD: 20 },
    ],
    totalUSD: 55,
    unavailable: [],
  });
  SpreadsheetApp.getActiveSpreadsheet().toast("Test order " + ref + " added.", "Athletico Store", 10);
  console.log("Test order " + ref + " added.");
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function sheet_(name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error('Missing tab "' + name + '" — run setupSheet first.');
  return sheet;
}
function col_(headers, name) {
  var i = headers.indexOf(name);
  if (i === -1) throw new Error("Unknown column " + name);
  return i + 1;
}
function byHeader_(headers, values) {
  return headers.map(function (h) { return values[h] === undefined ? "" : values[h]; });
}
function findOrderRow_(orders, reference) {
  if (!reference || orders.getLastRow() < 2) return 0;
  var hit = orders.getRange(2, col_(ORDER_HEADERS, "ORDER"), orders.getLastRow() - 1, 1)
    .createTextFinder(String(reference)).matchEntireCell(true).findNext();
  return hit ? hit.getRow() : 0;
}
function methodLabel_(payment) {
  switch (payment && payment.method) {
    case "card": return "Card";
    case "bob": return "BOB Finance";
    default: return payment && payment.method ? String(payment.method) : "";
  }
}
function esc_(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

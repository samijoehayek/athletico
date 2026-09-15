/**
 * Athletico Store — order book
 * =============================
 * Paste this into a Google Apps Script project bound to a new Google Sheet,
 * then deploy it as a Web App. It does three things when an order arrives:
 *
 *   1. appends a row to the "Orders" sheet (the club's order book)
 *   2. emails the club a printable packing slip
 *   3. emails the customer a confirmation
 *
 * Setup — once, about ten minutes:
 *   1. Create a Google Sheet in the club's own Google account.
 *   2. Extensions → Apps Script. Delete the placeholder, paste this file.
 *   3. Edit the CONFIG block below.
 *   4. Run `setupSheet` once and grant the permissions it asks for.
 *   5. Deploy → New deployment → Web app.
 *        Execute as:       Me
 *        Who has access:   Anyone
 *      ("Anyone" is required — the request comes from the website's server, not
 *       from a signed-in Google user. SHARED_SECRET is what actually guards it.)
 *   6. Copy the /exec URL into ORDERS_WEBHOOK_URL in the site's environment,
 *      and the same secret into ORDERS_SHARED_SECRET.
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
var CONFIG = {
  // Must match ORDERS_SHARED_SECRET on the website. Change it to a long random
  // string before going live.
  SHARED_SECRET: "CHANGE-ME-TO-A-LONG-RANDOM-STRING",

  // Who gets the order email. Add or remove addresses freely.
  NOTIFY: ["orders@athletico.example"],

  CLUB_NAME: "Athletico Sports Club",
  REPLY_TO: "orders@athletico.example",
  SHEET_NAME: "Orders",
};
// ───────────────────────────────────────────────────────────────────────────

var HEADERS = [
  "Reference", "Received", "Status", "Payment", "Payment ref",
  "Customer", "Phone", "Email",
  "Zone", "Address", "Building/Floor", "Landmark", "Notes",
  "Items", "Personalisation", "Units",
  "Subtotal", "Delivery", "Total",
];

var STATUSES = [
  "NEW — COD", "AWAITING PAYMENT", "PAID", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED",
];

/** Run once from the editor to build and format the order book. */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  sheet.clear();

  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight("bold")
    .setBackground("#0B3E80")
    .setFontColor("#FFFFFF");
  sheet.setFrozenRows(1);

  // Status is a dropdown so it can never be mistyped out of a filter.
  sheet.getRange(2, 3, sheet.getMaxRows() - 1, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
  );

  var statusRange = sheet.getRange(2, 3, sheet.getMaxRows() - 1, 1);
  var rules = [
    { text: "AWAITING PAYMENT", bg: "#FFF3CD" },
    { text: "PAID", bg: "#D4EDDA" },
    { text: "PACKED", bg: "#CCE5FF" },
    { text: "SHIPPED", bg: "#D1ECF1" },
    { text: "DELIVERED", bg: "#E2E3E5" },
    { text: "CANCELLED", bg: "#F8D7DA" },
  ].map(function (r) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(r.text).setBackground(r.bg).setRanges([statusRange]).build();
  });
  sheet.setConditionalFormatRules(rules);

  [140, 150, 150, 120, 120, 160, 120, 200, 150, 240, 140, 160, 200, 320, 180, 70, 90, 90, 90]
    .forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });

  sheet.getRange(2, 1, sheet.getMaxRows() - 1, HEADERS.length).setVerticalAlignment("top");
  SpreadsheetApp.getUi().alert("Order book ready. Now deploy this script as a Web App.");
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (!body.secret || body.secret !== CONFIG.SHARED_SECRET) {
      return json({ ok: false, error: "unauthorised" });
    }
    var order = body.order;
    if (!order || !order.reference) return json({ ok: false, error: "malformed" });

    appendOrder(order);
    notifyClub(order);
    notifyCustomer(order);

    return json({ ok: true, reference: order.reference });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: "athletico-order-book" });
}

function appendOrder(order) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  var items = order.lines.map(function (l) {
    return l.qty + "× " + l.name + " (" + l.size + (l.colourwayName ? ", " + l.colourwayName : "") + ")";
  }).join("\n");

  var personal = order.lines.filter(function (l) {
    return l.personalisation && (l.personalisation.name || l.personalisation.number);
  }).map(function (l) {
    return l.name + ": " + (l.personalisation.name || "") + " " + (l.personalisation.number || "");
  }).join("\n");

  var units = order.lines.reduce(function (n, l) { return n + l.qty; }, 0);
  var c = order.customer;

  sheet.appendRow([
    order.reference,
    new Date(order.placedAt),
    order.status,
    paymentLabel(order.payment.method),
    order.payment.reference || "",
    c.name, c.phone, c.email,
    order.zoneLabel, c.address, c.building, c.landmark, c.notes,
    items, personal || "—", units,
    order.subtotalUSD, order.deliveryUSD, order.totalUSD,
  ]);

  // Keep the newest order visible without scrolling.
  sheet.setActiveRange(sheet.getRange(sheet.getLastRow(), 1));
}

/** Formatted so it can be printed and dropped straight into the box. */
function notifyClub(order) {
  var c = order.customer;
  var rows = order.lines.map(function (l) {
    var personal = l.personalisation && (l.personalisation.name || l.personalisation.number)
      ? '<div style="margin-top:4px;padding:4px 8px;background:#FFE400;font-weight:bold">PRINT: '
        + esc(l.personalisation.name || "") + " " + esc(l.personalisation.number || "") + "</div>"
      : "";
    return '<tr>'
      + '<td style="padding:8px;border-bottom:1px solid #ddd">' + l.qty + "</td>"
      + '<td style="padding:8px;border-bottom:1px solid #ddd">' + esc(l.name)
      + '<div style="color:#666;font-size:12px">' + esc(l.size)
      + (l.colourwayName ? " · " + esc(l.colourwayName) : "") + " · " + esc(l.sku) + "</div>"
      + personal + "</td>"
      + '<td style="padding:8px;border-bottom:1px solid #ddd;text-align:right">$'
      + l.lineTotalUSD.toFixed(2) + "</td></tr>";
  }).join("");

  var html =
    '<div style="font-family:Helvetica,Arial,sans-serif;max-width:640px;color:#12203a">'
    + '<div style="background:#0B3E80;color:#fff;padding:20px"><div style="font-size:11px;letter-spacing:2px;opacity:.7">NEW ORDER</div>'
    + '<div style="font-size:26px;font-weight:bold">' + esc(order.reference) + "</div></div>"
    + '<table style="width:100%;border-collapse:collapse;margin-top:16px">' + rows + "</table>"
    + '<table style="width:100%;margin-top:12px;font-size:14px">'
    + row("Subtotal", "$" + order.subtotalUSD.toFixed(2))
    + row("Delivery — " + esc(order.zoneLabel), "$" + order.deliveryUSD.toFixed(2))
    + '<tr><td style="padding:8px 0;font-weight:bold;border-top:2px solid #0B3E80">TOTAL</td>'
    + '<td style="padding:8px 0;text-align:right;font-weight:bold;font-size:18px;border-top:2px solid #0B3E80">$'
    + order.totalUSD.toFixed(2) + "</td></tr></table>"
    + '<div style="margin-top:20px;padding:16px;background:#f4f8fc">'
    + "<div><strong>" + esc(c.name) + "</strong></div>"
    + "<div>" + esc(c.phone) + " · " + esc(c.email) + "</div>"
    + '<div style="margin-top:8px">' + esc(order.zoneLabel) + "</div>"
    + (c.address ? "<div>" + esc(c.address) + "</div>" : "")
    + (c.building ? "<div>" + esc(c.building) + "</div>" : "")
    + (c.landmark ? '<div style="color:#666">Landmark: ' + esc(c.landmark) + "</div>" : "")
    + (c.notes ? '<div style="margin-top:8px;font-style:italic">“' + esc(c.notes) + "”</div>" : "")
    + "</div>"
    + '<div style="margin-top:16px;padding:12px;border-left:4px solid '
    + (order.payment.method === "cod" ? "#2e8b57" : "#d98324") + ';background:#fafafa">'
    + "<strong>" + paymentLabel(order.payment.method) + "</strong>"
    + (order.payment.reference ? "<br>Reference: <strong>" + esc(order.payment.reference) + "</strong>" : "")
    + (order.payment.method !== "cod"
        ? '<br><span style="color:#d98324">Check this transfer before packing.</span>' : "")
    + "</div></div>";

  MailApp.sendEmail({
    to: CONFIG.NOTIFY.join(","),
    replyTo: order.customer.email,
    subject: "New order " + order.reference + " — $" + order.totalUSD.toFixed(2),
    htmlBody: html,
  });
}

function notifyCustomer(order) {
  if (!order.customer.email) return;

  var items = order.lines.map(function (l) {
    return "<li>" + l.qty + "× " + esc(l.name) + " (" + esc(l.size) + ")"
      + (l.personalisation && (l.personalisation.name || l.personalisation.number)
          ? " — " + esc(l.personalisation.name || "") + " " + esc(l.personalisation.number || "") : "")
      + "</li>";
  }).join("");

  var awaiting = order.payment.method !== "cod";
  var html =
    '<div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;color:#12203a">'
    + '<div style="background:#0B3E80;color:#fff;padding:24px">'
    + '<div style="font-size:11px;letter-spacing:2px;opacity:.7">ORDER RECEIVED</div>'
    + '<div style="font-size:24px;font-weight:bold">' + esc(order.reference) + "</div></div>"
    + '<div style="padding:24px 0"><p>Thanks ' + esc(order.customer.name.split(" ")[0])
    + " — we've got your order and we'll call to confirm before it goes out.</p>"
    + "<ul>" + items + "</ul>"
    + "<p><strong>Total: $" + order.totalUSD.toFixed(2) + "</strong><br>"
    + esc(order.zoneLabel) + " · " + esc(order.zoneEta) + "</p>"
    + (awaiting
        ? '<p style="padding:12px;background:#FFF3CD;border-left:4px solid #FFE400">'
          + "We're checking your " + paymentLabel(order.payment.method)
          + " transfer. Your order is packed as soon as it clears.</p>"
        : "<p>You'll pay the courier when your order arrives.</p>")
    + "<p style=\"color:#666;font-size:13px\">Questions? Reply to this email and quote "
    + esc(order.reference) + ".</p></div></div>";

  MailApp.sendEmail({
    to: order.customer.email,
    replyTo: CONFIG.REPLY_TO,
    subject: CONFIG.CLUB_NAME + " — order " + order.reference + " received",
    htmlBody: html,
  });
}

// ─── helpers ───────────────────────────────────────────────────────────────
function paymentLabel(m) {
  return m === "whish" ? "Whish" : m === "bob" ? "BOB Finance" : "Cash on delivery";
}
function row(label, value) {
  return '<tr><td style="padding:4px 0;color:#666">' + label
    + '</td><td style="padding:4px 0;text-align:right">' + value + "</td></tr>";
}
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

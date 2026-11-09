# Athletico Store — build notes & handover

The Option A ("Google Sheet") build from the proposal. No database, no admin
panel, no commerce platform. One serverless function, one Google Sheet.

---

## 1. What exists

### Routes

| Route | Rendering | Purpose |
|---|---|---|
| `/store` | Static | Landing, catalogue grid, category filtering, kit-drop band |
| `/store/[slug]` | Static, one page per product | Product detail, Kit Customiser |
| `/store/checkout` | Static shell, client form | Single-screen checkout |
| `/store/order/[ref]?t=` | Client, polls the API | The order page: pending / paid / failed (with "try again"), read from the order sheet |
| `/store/pay/card` | Dynamic | Brief stop that hands the customer to the bank's payment page |
| `/store/pay/simulate` | Dynamic, non-production only | Payment simulator standing in for the BOB app until step 6 |
| `/store/info` | Static | Collection, payment, sizing |
| `/terms` | Static | Terms and Conditions of Sale, with PDF download |
| `/api/orders` | Serverless | Validation, server-side re-pricing, saves the order, starts the payment |
| `/api/orders/[ref]` | Serverless | Order status for the order page (token required) |
| `/api/orders/[ref]/retry` | Serverless | Restart a failed payment for the same order |
| `/api/payments/card/return` | Serverless | Customer back from the bank's page (paid, declined or cancelled); checks the gateway, then redirects to the order page |
| `/api/payments/card/webhook` | Serverless | The gateway's notification, for customers who paid and closed the tab |
| `/api/payments/simulate` | Serverless, non-production only | The simulator's approve / decline |

### Key files

```
lib/store/
  types.ts          shared shapes (browser + server)
  catalog.ts        THE PRODUCT LIST — edit prices/stock here
  pricing.ts        single source of truth for money and the collection ETA
  validate.ts       shared form validation
  cart-store.ts     cart state, backed by localStorage
  cart-context.tsx  React wrapper over the store
  order-book.ts     server client for the order sheet (Apps Script)
lib/payments/
  methods.ts        payment methods offered at checkout (BOB Wallet, card)
  providers.ts      which methods are on, and how each payment starts
  mpgs.ts           Mastercard Gateway client, and THE rule for "this card payment is paid"
  card.ts           starts a card attempt; settles the sheet from what the gateway reports
  orders.ts         loads an order back from the sheet for the order page
  token.ts          signed links to order pages
lib/branches.ts     the 10 branches — collection picker, contact map and FAQ
app/components/store/   all UI
app/api/            orders, order status / retry, payment simulator
docs/apps-script/Code.gs the Google Apps Script for the order book
```

### Design

Inherits the existing system with no additions: navy `#0B3E80`, off-white
`#F1EAEA`, accent `#2B87C8`, yellow `#FFE400`; QB One for display type, Outfit
for body; zero border radius throughout; the site's square outline buttons that
fill with `#2B87C8` on hover; the diagonal clip-path split from the Achievements
hero; the `background-clip:text` image fill from the Statistics wordmark; and
`group-hover:scale-105 duration-700` on imagery. No new dependencies were added.

---

## 2. Running it

```bash
npm run dev      # http://localhost:3000/store
npm run build    # production build
npm run lint
```

Copy `.env.local.example` to `.env.local` and fill it in. The store runs without
any environment variables — it just can't record an order, and the checkout
shows placeholder payment details with a visible "setup pending" notice.

---

## 3. WHAT WE NEED FROM THE CLUB

Everything below is currently a placeholder. Nothing here blocks development —
it blocks **launch**.

### 3.1 Product content

The catalogue now holds the club's real range: 23 products built from the 29
lines of `merch price list.xlsx` (colours of the same item are one product with
swatches), with the club's photos in `public/store/products/`. The photos are
normalised by script: white background, trimmed, centred in a 1280×1600 (4:5)
frame, JPEG q82.

Still open with the club:

- [ ] **Sizes**: the price list has none. Clothing uses kids' heights
      120/130/140/150/160 (as written on the club's order sheet) plus adult
      S–XXL; socks and sock sleeves are KIDS/ADULT; the cheer parent T-shirt is
      adult only; bags, bottle, towel, scarf, fanion and cap are ONE SIZE.
- [ ] **Missing colour photos**: thermal pant and top in blue and black, white
      sock sleeves. Until they arrive these options borrow the photo they have,
      and the product page says "Photo shows the white version"
      (`Colourway.photoOf`).
- [ ] **Higher-resolution photos**: fan fanion (178×236 px original), fan scarf,
      techshirt, cotton short.
- [ ] **Cheer parent T-shirt**: photos 2 and 3 show the same "Athletico S.C.
      Since 2006" print, so it is sold as two designs, not three. Confirm.
- [ ] **Size guide**: the club's measurement table. Until then the list in
      `app/components/store/SizeGuideDrawer.tsx` is empty and the "Size guide"
      link is hidden (`HAS_SIZE_GUIDE`).
- [ ] **Long-sleeve polos** (white, black): photographed but not priced, so not
      listed.
- [ ] **Match uniform**: not sold at launch. The Kit Customiser (name and number
      on the back) is still in the code for when it is; it needs a price, sizes,
      a front photo and a flat straight-on photo of the back.

### 3.2 Payments — blocks taking money

Two methods, each offered at checkout only once its credentials are set
(`lib/payments/providers.ts`):

- **BOB Wallet**: the customer enters their BOB Finance mobile number and
  approves a payment request in the BOB app (BOB merchant checkout API).
- **Card**: Visa / Mastercard on Bank of Beirut's Mastercard Gateway hosted
  payment page; card details never touch this site.

The flow is the same for both:
1. `/api/orders` re-prices the cart, validates, and writes the order to the
   order sheet as PENDING PAYMENT. If the sheet can't be reached the customer
   gets an error and no payment starts.
2. The payment starts: a redirect to the payment page, or a BOB push.
3. The customer lands on `/store/order/ATH-…?t=…`, which polls the order's
   status. The link carries an HMAC token, so a reference alone reveals nothing.
4. When the gateway confirms, the order sheet's `markPaid` flips the order and
   its items to PAID, once; a failure flips them to PAYMENT FAILED and the page
   offers "try again" (same order, new payment attempt).

**How a card payment is confirmed.** The site never believes the browser or a
notification. The customer's return, a cancel and the webhook only name the
payment attempt; `reconcileCardAttempt` then asks the gateway, and the order is
PAID only if the gateway says `result=SUCCESS`, `status=CAPTURED`, the full order
total was captured, and the currency is USD (`classifyGatewayOrder`). This also
replaces the plan's `successIndicator` comparison, which would have needed
storing a value per attempt and could never be enough on its own.

Each attempt has its own gateway order id (`ATH-261109-K4P2-3F9A0C`), because the
gateway refuses to reuse one after a failure. A second charge on a paid order
(an old payment page left open, say) is flagged "SECOND PAYMENT, REFUND IT" in
the sheet's NOTES column. A captured amount that doesn't match the order leaves
it unpaid and logs `AMOUNT MISMATCH`. Refunds are done in the merchant portal.

Testing cards: with `MPGS_MERCHANT_ID=TESTATHLETICO`, use Mastercard
`5123450000000008`, CVV `100`. The expiry decides the outcome: `01/39` approved,
`05/39` declined. The 3-D Secure screen is an emulator with a result dropdown.
Orders on a test merchant are tagged as tests in the sheet and emails, and a
`TEST…` merchant is refused on production.

Until BOB's credentials exist, `PAYMENTS_SIMULATOR=1` stands in for BOB Wallet on
local and preview deployments (never on production): its page has Approve /
Decline buttons that drive the real order sheet, and simulated orders are marked
"(simulated)" and "[TEST]" in the sheet and emails.

- [x] Card, test: merchant ID and integration password (step 5).
- [ ] Card, webhook: register the endpoint in the merchant portal and set
      `MPGS_WEBHOOK_SECRET` (see `.env.local.example`).
- [ ] Card, live: production merchant ID, password and host from Bank of Beirut.
- [ ] BOB Wallet: API key, merchant path, whitelisted server IP (step 6).

### 3.3 Order book — blocks receiving orders

The order book is a Google Sheet with an Apps Script web app
(`docs/apps-script/Code.gs`, setup steps in its header), called only by the
site's server through `lib/store/order-book.ts`. It is the shop's only store
of orders.

- **Items** tab: one row per item, in the columns of the club's paper order
  sheet (DATE, ORDER, NAME, PHONE, DESCR, SIZE, QTY, COLOR, NAME TO PRINT,
  NUMBER, BRANCH) plus PRICE, PAYMENT and a coloured STATUS dropdown. NAME is
  the player's name from checkout, or the buyer's when left empty.
- **Orders** tab: one row per order with the payment state (written by the
  site only), totals, gateway references, T&C version and the full order as
  JSON in a hidden column.
- Item STATUS: `PENDING PAYMENT` → `PAID` (set by the site once a payment is
  verified; until the payment integrations land, staff set it by hand after
  checking the BOB reference) → `ORDERED` → `READY FOR COLLECTION` →
  `COLLECTED`, plus `PAYMENT FAILED`, `CANCELLED`, `REFUNDED`.
- Actions `createOrder`, `markPaid`, `markFailed`, `getOrder` are idempotent
  and run under a script lock: a repeated payment notification never
  duplicates a row or an email.
- On a new order it emails the staff in `NOTIFY_EMAILS` and sends the customer
  the acknowledgement of receipt (clause 5.2 of the Terms).

Still needed:

- [x] A Google account to own the sheet: the club's marketing account.
- [ ] The **staff email addresses** for new orders (`NOTIFY_EMAILS`).
- [ ] Deploy it and set `ORDERS_WEBHOOK_URL` + `ORDERS_SHARED_SECRET` on Vercel.

### 3.4 Collection

Every order is collected, free, from one of the 10 branches in
`lib/branches.ts`, and is ready within 10–15 days (`COLLECTION_ETA` in
`lib/store/pricing.ts`). There is no delivery and no returns policy on the site.

### 3.5 Housekeeping

- [ ] Real social links in `app/components/Footer.tsx` (still `facebook.com`,
      `instagram.com`, … placeholders — pre-existing, not introduced here).
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain so social share images resolve.

---

## 4. Terms and Conditions of Sale

The club's T&C live in `lib/legal/`: `terms.ts` holds the version in force
(`TERMS_VERSION`) and `terms-of-sale-2026-11.ts` the text, converted verbatim
from the club's Google Doc. They feed three things that must never disagree:

- `/terms`: the web page (contents with jump links, numbered clauses,
  e-mails and phone numbers tappable), plus a "Cookies & storage" note that is
  not part of the Terms;
- the PDF behind its "Download PDF" button, `public/legal/…pdf`, which is the
  same page printed by `scripts/build-terms-pdf.sh` (A4, page numbers);
- the checkout: a required "I have read and accept…" checkbox. The server
  refuses an order without it and stamps the order with `termsVersion`, which
  the order sheet records (clause 1.2 of the Terms).

To publish a new version, follow the steps at the top of `lib/legal/terms.ts`.
Keep old PDFs: orders point at the version they were accepted under.

## 5. Editing the catalogue

`lib/store/catalog.ts` is the whole catalogue. It is a typed file, so a
malformed product fails the build rather than reaching production, and every
price change is recorded in git.

Stock is set by hand per size:

```ts
variants: sizes("ATH-TRK", CLOTHING, { "140": "low", XXL: "out" }),
```

`"in"` (default) · `"low"` shows a *Last few* badge · `"out"` renders the size
struck through and is rejected by the server if someone forces it.

Changing a price or stock state is a one-line edit and a deploy.

A product can appear under more than one section of the price list
(`categories: ["cheer", "gadgets"]` for the cap), and `featured: true` puts it in
the navy band inside the grid, headed by its first section's name.

---

## 6. Security notes

The browser sends **product IDs and quantities only** — never prices. Every
total is recomputed server-side in `/api/orders` from `catalog.ts`. This is
verified: posting a forged `$1` price for a `$45` jersey still charges $45.

Also enforced server-side:

- personalisation fees can't be forged onto products that don't offer it, or
  skipped on products that do
- sold-out variants are rejected
- quantities are clamped to 10 per line
- honeypot field returns a fake success so bots don't retry
- rate limit of 5 orders per minute per IP
- the Apps Script URL and shared secret never reach the client bundle

**Known limitation:** the rate limit is in-memory and therefore per serverless
instance — it stops naive bursts, not a determined attacker. At three to four
orders a day that is the right trade. A shared store would be the upgrade if
abuse ever becomes real.

**If Google is unreachable**, the order still returns a valid reference, the
full payload is written to the server log prefixed `UNRECORDED ORDER` for
replay. There is no WhatsApp fallback any more, so the order book (and its
emails) must be deployed and monitored.

---

## 7. Deliberate deviations from the proposal

1. **The pinned gallery uses CSS `sticky`, not GSAP ScrollTrigger.** Identical
   visual result, survives resize and orientation change with no cleanup, and
   avoids a scroll-listener lifecycle bug class. GSAP remains in the project for
   the Activities carousel.
2. **The catalogue grid entrance is a CSS animation, not Framer Motion.** The
   first implementation used Framer Motion's `initial`, which server-rendered
   every product card at `opacity: 0` — the store's primary content was
   invisible until JavaScript hydrated. It now uses the `fadeInUp` keyframes
   already defined in `globals.css`, which run on paint regardless of JS.
   Framer Motion still drives the cart drawer, size-guide drawer and lightbox.
3. **`next.config.ts` has `dangerouslyAllowSVG`** so `next/image` can serve
   SVGs. Safe here because every SVG is our own file in `/public`. The store
   no longer uses any; it stays for site graphics such as `/brand/arrow.svg`.

---

## 8. Not included (per the proposal)

BOB Wallet and card payments were outside the original proposal and are now
being added (section 3.2). Still not included: customer accounts, automatic stock decrement, a CMS, discount codes, courier API
integration, Arabic/RTL, analytics dashboards.

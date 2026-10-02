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
| `/store/order/[ref]` | Client | Confirmation, payment summary, collection branch |
| `/store/info` | Static | Collection, payment, sizing |
| `/api/orders` | Serverless | Validation, server-side re-pricing, order dispatch |

### Key files

```
lib/store/
  types.ts          shared shapes (browser + server)
  catalog.ts        THE PRODUCT LIST — edit prices/stock here
  pricing.ts        single source of truth for money, collection ETA, payment method
  validate.ts       shared form validation
  cart-store.ts     cart state, backed by localStorage
  cart-context.tsx  React wrapper over the store
  config.ts         club-specific values (BOB account and QR)
lib/branches.ts     the 10 branches — collection picker, contact map and FAQ
app/components/store/   all UI
app/api/orders/route.ts the only server-side code
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

### 3.1 Product content — blocks a real catalogue

- [ ] **Final product list**: names, descriptions, prices in USD, and the size
      run stocked for each item. The 16 products currently in `catalog.ts` are
      an indicative range, not the club's real one.
- [ ] **Photography**: 2–5 images per product. At minimum one product-only shot
      and one worn/in-play shot — the card cross-fade uses images `[0]` and `[1]`.
      Shoot on a consistent ground, 4:5 portrait, min 1400px on the short edge.
- [ ] **One flat, straight-on photo of the BACK of each personalisable shirt.**
      The Kit Customiser renders the name and number onto this image, so it
      needs to be square-on, evenly lit, and shot flat. This is the single
      highest-value asset in the build.
- [ ] **Size guide**: the club's own measurement table. Placeholder numbers are
      in `app/components/store/SizeGuideDrawer.tsx`.
- [ ] **Which products allow personalisation**, and the surcharge (currently $8).

### 3.2 Payment details — blocks taking money

BOB Finance is the only payment method (no cash on delivery, no Whish): the
customer scans the club's QR code in the BOB app and pays before ordering, so
personalised kit is paid for before it is printed.

- [ ] **BOB Finance**: account number, beneficiary name, and the QR code.
      Replace `public/store/bob-qr.svg`.
- [ ] Set `NEXT_PUBLIC_BOB_ACCOUNT`, `NEXT_PUBLIC_BOB_NAME`.

> Until the QR file and the env vars are in place, the checkout displays an
> obvious yellow "setup pending" warning so placeholder details can't ship by
> accident.

### 3.3 Order book — blocks receiving orders

- [ ] A **Google account** to own the order sheet (the club's, not ours).
- [ ] The **staff email addresses** that should be notified of each order.
- [ ] Deploy `docs/apps-script/Code.gs` (instructions in the file header) and set
      `ORDERS_WEBHOOK_URL` + `ORDERS_SHARED_SECRET`.

### 3.4 Collection

Every order is collected, free, from one of the 10 branches in
`lib/branches.ts`, and is ready within 10–15 days (`COLLECTION_ETA` in
`lib/store/pricing.ts`). There is no delivery and no returns policy on the site.

### 3.5 Housekeeping

- [ ] Real social links in `app/components/Footer.tsx` (still `facebook.com`,
      `instagram.com`, … placeholders — pre-existing, not introduced here).
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain so social share images resolve.

---

## 4. Editing the catalogue

`lib/store/catalog.ts` is the whole catalogue. It is a typed file, so a
malformed product fails the build rather than reaching production, and every
price change is recorded in git.

Stock is set by hand per size:

```ts
variants: sizes("ATH-HJ", APPAREL, { XS: "low", XXL: "out" }),
```

`"in"` (default) · `"low"` shows a *Last few* badge · `"out"` renders the size
struck through and is rejected by the server if someone forces it.

Changing a price or stock state is a one-line edit and a deploy.

---

## 5. Security notes

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

## 6. Deliberate deviations from the proposal

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
3. **`next.config.ts` gained `dangerouslyAllowSVG`** so `next/image` can serve
   the placeholder SVG product imagery. Safe here because every SVG is our own
   file in `/public`; it can be removed once real photography lands.

---

## 7. Not included (per the proposal)

BOB API payment confirmation (needs a merchant account), card payments,
customer accounts, automatic stock decrement, a CMS, discount codes, courier API
integration, Arabic/RTL, analytics dashboards.

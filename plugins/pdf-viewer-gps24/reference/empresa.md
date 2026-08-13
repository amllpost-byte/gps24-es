# GPS24 — company card for PDF work

Shared reference for every skill in this plugin. Read it once per session before
annotating, stamping or extracting anything.

## Rule 0 — `site.config.ts` is the only source of business data

The repo rule is absolute: **`site.config.ts` is the single source of business
data** (prices, terms, phone, guarantees, requisites). Literals in components are
forbidden, and the same applies here.

So: **never hardcode a number from this file into a document.** Before you write
a VAT number, a warranty period, a return window or a contact into a PDF, read
the live values:

```
site.config.ts  →  SITE.company, SITE.contact, SITE.guarantees,
                   SITE.shipping, SITE.location, SITE.launchNotice
```

The table below is a **convenience snapshot taken 13.08.2026**, useful for
recognising values on a scanned page. If it disagrees with `site.config.ts`,
`site.config.ts` wins and this file is stale — say so instead of using it.

## Requisites (snapshot 13.08.2026 — verify against `site.config.ts`)

| Field | Value | `site.config.ts` path |
| --- | --- | --- |
| Trade name | GPS24 | `SITE.name` |
| Legal entity | ELIAN TRADE OÜ | `SITE.company.legalName` |
| Registrikood (EE) | 12040944 | `SITE.company.regCode` |
| KMKR / VAT | EE101588780 | `SITE.company.vat` |
| Country of the entity | EE (Estonia) | `SITE.company.country` |
| Domain | gps24.es | `SITE.domain` |
| Email | info@gps24.es | `SITE.contact.email` |
| WhatsApp | +34 637 792 222 | `SITE.contact.whatsappDisplay` |
| Market / service area | Benidorm, Alicante, Comunidad Valenciana | `SITE.location` |
| Legal warranty | 3 years | `SITE.guarantees.warrantyYears` |
| Withdrawal window | 14 days | `SITE.guarantees.returnDays` |

### Launch phase — matters on every document

Until the full Comunidad Valenciana opening (**October 2026**), orders are
processed and shipped **from Estonia (EU)**, and no delivery time is promised
(`SITE.shipping`, `SITE.launchNotice`). There is **no physical shop and no
opening hours** (`SITE.hours`) — never put a shop address, pickup slot or
opening hours on a document. The only promise is the WhatsApp reply time in
`SITE.hours.replyPromise`.

The invoicing entity is Estonian while the customers are Spanish. Every document
therefore crosses an intra-EU border, which is why the fiscal checks in
`skills/factura` are flags for the accountant rather than conclusions.

## Brand values (from `src/styles/tokens.css`)

Use these for every annotation, highlight and stamp so marked-up PDFs look like
the site. Values are the light-theme tokens; do not invent shades.

| Purpose in a PDF | Token | Hex |
| --- | --- | --- |
| Approval stamp fill, highlight of the key figure | `--amber` | `#FFB400` |
| Text/ink on amber fill — always graphite, never white | `--on-amber` | `#171B21` |
| Body ink, stamp text | `--ink` | `#171B21` |
| Secondary notes, page references | `--muted` | `#6B7280` |
| Verified / matches source | `--ok` | `#1A7F4B` |
| Needs a decision, ask the accountant or the owner | `--warn` | `#B45309` |
| Wrong, missing or contradicts the source | `--err` | `#B42318` |
| Rules, boxes, separators | `--line` | `#E4E2DC` |
| Dark panel behind a stamp block | `--dark-surface` | `#232A33` |

Typeface: **Overpass** for text, **Overpass Mono** for codes, SKUs, VAT numbers
and totals. Corner radius on drawn boxes: 6px for chips/stamps, 12px for panels.

Colour is never the only signal — every coloured mark also carries a short text
note, because a printed or greyscale copy has to stay readable.

## Languages

The site is trilingual and ES is canonical: **ES (`/`), EN (`/en/`), RU
(`/ru/`)**. Anything a customer will read must exist in all three, ES first.
Internal notes to the owner may be RU only, matching the repo's own comments.

Working split for this plugin:

- **Customer-facing text on a PDF** (stamp wording, claim forms, cover notes) —
  ES + EN + RU.
- **Findings and summaries in chat** — ES first, then RU for the owner.
- **Extracted product data** — the trilingual `{es,en,ru}` shape the content
  schema requires.

## Document catalogue

What actually arrives as a PDF, and which skill owns it.

| Document | Direction | Skill |
| --- | --- | --- |
| Factura / proforma from a supplier (BlackVue, Diniwid, Ulefone, naviseade) | in | `factura` |
| Factura issued by ELIAN TRADE OÜ to a customer | out | `factura` |
| Albarán / packing list / CMR for a shipment from Estonia | in/out | `factura` (§ shipping) |
| Presupuesto for a fleet enquiry (`/flotas`) | out | `factura` + `sello` |
| Warranty claim, RMA, withdrawal form | both | `garantia` |
| Manufacturer manual, datasheet, in-the-box diagram | in | `manual-a-ficha` |
| Anything the owner has to approve or sign | out | `sello` |

## Catalogue cross-check

SKUs, names and prices live in `src/content/products/*.md`. Files whose name
starts with `_` are **unpublished drafts** — the loader glob is
`**/[^_]*.md`, so a `_`-prefixed SKU is not on the site. When a document
mentions a product:

1. Find the SKU in `src/content/products/` (frontmatter `sku`, e.g. `DNW-N7-VEO`).
2. Compare the document's unit price with `price` in that file.
3. Report a mismatch as a finding — **never silently edit either side.** Prices
   are an owner decision.
4. If the file is `_`-prefixed, note that the product is a draft and not
   currently sold on the site.

Services are in `src/content/services/*.md` with `priceFrom` (`map-update` is
€49.90 with a 24 h turnaround as of 11.08.2026 — read the file, do not trust
this line).

## What this plugin must never do

- **Never assert tax or legal conclusions.** Flag and cite; the accountant and
  the owner decide. See `skills/factura` and `skills/garantia`.
- **Never invent a spec, a price or a date** that is not visibly on the page.
  This is repo rule №3: no source, no line.
- **Never write a shop address, opening hours or a promised delivery date** —
  none of those exist during the launch phase.
- **Never edit `site.config.ts` or product files as a side effect** of reading a
  PDF. Produce the diff or the YAML and let the owner apply it.

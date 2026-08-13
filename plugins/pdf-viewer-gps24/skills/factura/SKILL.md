---
name: factura
description: Review a GPS24 invoice, proforma, presupuesto, albarán, packing list or CMR in the PDF viewer — check ELIAN TRADE OÜ requisites, counterparty VAT, totals arithmetic, and cross-check every line against the SKUs and prices in src/content/products. Use for supplier invoices coming in, customer invoices going out, fleet quotes, and shipping paperwork from Estonia.
---

# Invoice and shipping-document review

Read `reference/empresa.md` first, and read the live values out of
`site.config.ts` — never type a VAT number from memory.

## Scope, honestly stated

This is a **completeness and consistency checklist**, not tax advice. It finds
missing fields, wrong requisites, broken arithmetic and prices that disagree with
the catalogue. It does **not** decide VAT treatment. Anything fiscal is raised as
a question for the accountant, marked amber, phrased as a question. If you are
tempted to write "this should be reverse-charged", write "reverse charge wording
absent — confirm with the accountant" instead.

## 1. Classify the document

Establish before checking anything:

| Question | Why it matters |
| --- | --- |
| Direction — is ELIAN TRADE OÜ the seller or the buyer? | Decides which requisite block must be perfect |
| Type — factura, proforma, presupuesto, albarán, CMR, packing list? | A proforma is not an invoice; do not check it as one |
| Counterparty country | The entity is Estonian and customers are Spanish; almost everything crosses a border |
| Currency | Should be EUR (`SITE` prices are EUR throughout) |

State the classification in your first line of output. If the document is
ambiguous, say so and stop rather than guessing.

## 2. Requisites of ELIAN TRADE OÜ

Whichever side GPS24 is on, its own block must match `SITE.company` exactly:

- Legal name **ELIAN TRADE OÜ** — not "GPS24", which is the trade name. A
  supplier invoice made out to "GPS24" is a finding.
- Registrikood **12040944**
- KMKR / VAT **EE101588780**
- Contact `SITE.contact.email` / `SITE.contact.whatsappDisplay`

Mark each: green `#1A7F4B` present and correct, red `#B42318` wrong, amber
`#B45309` missing. Put the expected value in the annotation note when it is
wrong, so the owner can forward the mark straight to the counterparty.

**Never put on a GPS24 document:** a shop address, opening hours, or a promised
delivery date. There is no physical shop, and during the launch phase no
delivery time is promised (`SITE.shipping`, `SITE.launchNotice`). If a draft
outgoing document contains one, that is a red finding.

## 3. Counterparty block

- Legal name and address present
- VAT / NIF present, and **format-plausible** for its country (ES: `A12345678`,
  `B12345678`, `X/Y/Z` + 7 digits + letter for a NIE; EE: `EE` + 9 digits)
- Format-plausible is not validity. Say **"format looks valid, VIES check
  pending"** — you cannot query VIES from here, and claiming otherwise would be
  a false assurance. Ask the owner to check it at
  <https://ec.europa.eu/taxation_customs/vies/> and note the date of the check.
- B2C customer with no VAT number is normal, not a finding.

## 4. Invoice mechanics

- Sequential invoice number present
- Issue date; due date or payment terms
- Description per line, quantity, unit price, line total
- VAT rate shown per line, and the rate applied consistently
- Subtotal + VAT = total. **Recompute it.** Rounding differences over one cent
  are a finding.
- Payment details: IBAN, and account holder matching the seller's legal name
- If VAT is 0 %, an exemption reason must be printed somewhere. Whether it is
  the *right* reason is the accountant's call — flag amber, quote the wording
  you found, and move on.

## 5. Catalogue cross-check — the part only GPS24 can do

For every product line, look it up in `src/content/products/`:

1. Match the SKU (frontmatter `sku`, e.g. `DNW-N7-VEO`, `BV-DR770X-BOX-PRO`).
   Match on model name if the document has no SKU.
2. Compare the unit price with `price` in that file. Report any difference in
   euros and as a percentage.
3. Flag `_`-prefixed files: that SKU is an **unpublished draft**, not currently
   sold on the site. An invoice for one is not necessarily wrong, but the owner
   should know the card is not live.
4. Line item with no catalogue match at all → amber, listed by name. It is
   either a new product, an accessory that was never carded, or an error.
5. Services: check against `src/content/services/*.md` `priceFrom` — that field
   is a *from* price, so a higher figure is not automatically a discrepancy.

**Never edit a price on either side.** Prices are an owner decision
(`site.config.ts` and the product files are the only sources); you produce
findings, the owner decides.

## 6. Shipping documents — albarán, packing list, CMR

During the launch phase goods ship from Estonia, so this paperwork travels with
most orders (`SITE.shipping`).

- Consignor is ELIAN TRADE OÜ with the Estonian requisites
- Consignee address is in Spain and matches the order
- Parcel count and weights are internally consistent with the packing list
- **Serial numbers** of every device are legible and recorded — these are what a
  warranty claim will need later (`skills/garantia`). Highlight each one amber
  and list them in your summary so they can be filed with the order.
- SKUs and quantities reconcile with the matching invoice, line for line
- EE → ES is intra-EU, so a **customs declaration should not be there**. If one
  is, that means the shipment is routed outside the EU — raise it as a red
  finding for the owner, it is not routine.

## 7. Output

Annotate the PDF, then summarise in ES followed by RU, in this order:

1. **Bloqueantes** (red) — wrong requisites, broken totals, missing mandatory field
2. **Para el contable** (amber) — anything fiscal, phrased as a question
3. **Discrepancias de catálogo** — price and SKU mismatches, with both figures
4. **Verificado** (green) — one line, just the count

Attach the annotated copy. If nothing is wrong, say so plainly in one line —
do not pad the report to look thorough.

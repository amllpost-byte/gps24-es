---
name: garantia
description: Prepare or review a GPS24 warranty claim, RMA or 14-day withdrawal form as a PDF — compute the deadlines from the purchase date, fill the customer and device block, and produce the trilingual ES/EN/RU customer copy. Use for garantía, devolución, desistimiento, RMA to a manufacturer, or checking whether a claim is still in time.
---

# Warranty, returns and RMA

Read `reference/empresa.md` first. The two periods that drive everything come
from `site.config.ts` and nowhere else:

```
SITE.guarantees.warrantyYears   → legal warranty (currently 3)
SITE.guarantees.returnDays      → withdrawal window (currently 14)
```

**Read them at runtime.** If the owner changes a period, every document this
skill produces must change with it. A number typed from memory into a customer's
warranty letter is the worst kind of error this plugin can make.

## What you may state, and what you must not

The site tells customers exactly one thing about warranty: *"Todos los
dispositivos nuevos tienen 3 años de garantía legal en España"*
(`support.warrantyBody`) — and the trust bar repeats the 3 years.

That is the full extent of what GPS24 has published. So:

- **You may state** the periods from `site.config.ts`, and compute dates from
  them.
- **You must not** state who bears the burden of proof, how long the
  presumption of pre-existing defect lasts, what counts as wear and tear,
  whether a repair or a replacement is owed first, or how the Estonian seller's
  obligations interact with Spanish consumer law. None of that is published, and
  guessing at it in a customer-facing document creates a commitment the company
  did not make.
- When one of those questions decides the case, **stop and put it to the
  owner.** Mark it amber, phrase it as a question, and leave the field blank in
  the draft.

This mirrors the repo's own rule: no source, no line. It applies to legal
statements at least as hard as it applies to spec tables.

## 1. Establish the facts

From the paperwork the customer sent — highlight each on the PDF as you find it:

| Fact | Where it usually is | If missing |
| --- | --- | --- |
| Purchase date | invoice, order confirmation | blocking — ask, nothing can be computed |
| Product and SKU | invoice line | cross-check `src/content/products/` |
| Serial number | device label photo, packing list | blocking for an RMA — the manufacturer will demand it |
| Customer name and contact | invoice | needed on the claim |
| Fault description | customer's message | in the customer's own words, quoted, not paraphrased |

The serial number is the field claims most often stall on. If shipping documents
for that order were reviewed with `skills/factura`, the serials were listed in
that summary — look there before asking the customer.

## 2. Compute the deadlines

From the purchase date:

- **Withdrawal**: purchase date + `SITE.guarantees.returnDays` days. State the
  calendar date, not "14 days". Say whether it has passed.
- **Legal warranty**: purchase date + `SITE.guarantees.warrantyYears` years.
  Same — give the date.

Show the arithmetic in your summary (`comprado 04.03.2026 + 3 años →
04.03.2029`) so the owner can check it at a glance. If a deadline falls within
30 days, say so first, before anything else in the report.

Withdrawal and warranty are different things and the customer may be entitled to
neither, one, or both. Report them separately. Do not merge them into a single
verdict.

## 3. Fill the form

Whether you are filling a manufacturer's RMA PDF or drafting a GPS24 claim:

- Seller block: **ELIAN TRADE OÜ** with the requisites from `SITE.company` —
  the legal entity, not the "GPS24" trade name.
- Contact for the customer: `SITE.contact.email` and
  `SITE.contact.whatsappDisplay`. **No address, no opening hours** — there is no
  shop (`SITE.hours`).
- Return logistics: goods move to and from Estonia during the launch phase
  (`SITE.shipping`). Do not print a return address or a transit time on a
  customer document unless the owner has given you one for that specific case.
- Fault description: the customer's wording, quoted. Add your own observation
  separately and label it as such.
- Leave anything you could not verify blank and list it. A form with three empty
  fields the owner can fill in 30 seconds beats a form with three invented ones.

Fill form fields with the viewer's form tools so the PDF stays a real form. Use
`skills/sello` when the finished document needs the company stamp.

## 4. The customer copy is trilingual

Anything the customer reads exists in **ES, EN and RU**, ES first — the site
rule applies to documents too. Typical blocks:

| Block | ES | EN | RU |
| --- | --- | --- | --- |
| Heading | Solicitud de garantía | Warranty claim | Заявка на гарантию |
| Heading | Desistimiento (14 días) | Withdrawal (14 days) | Отказ от покупки (14 дней) |
| Field | Fecha de compra | Purchase date | Дата покупки |
| Field | Número de serie | Serial number | Серийный номер |
| Field | Descripción del fallo | Fault description | Описание неисправности |
| Field | Solución solicitada | Remedy requested | Требуемое решение |
| Line | Garantía legal de 3 años | 3-year legal warranty | Гарантия по закону 3 года |

Regenerate the warranty line from `SITE.guarantees.warrantyYears` rather than
copying the row above — the row is a shape, not a source.

## 5. Report

ES then RU:

1. **Plazos** — both dates, with the arithmetic, and whether each has passed
2. **Faltan datos** — blocking gaps, serial number first
3. **Para el propietario** — every legal question you refused to answer, each as
   a plain question
4. What you filled in, and what you left blank on purpose

Attach the filled PDF and, if the customer is receiving it, the trilingual copy.

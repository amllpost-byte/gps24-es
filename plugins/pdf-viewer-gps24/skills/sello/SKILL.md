---
name: sello
description: Place the GPS24 corporate stamp or signature block on a PDF using the site's brand tokens — approval, review or rejection stamp with the ELIAN TRADE OÜ requisites, trilingual ES/EN/RU status wording, and a dated signature line. Use when a quote, invoice, warranty form or contract needs to be stamped, approved or signed off.
---

# GPS24 stamp and signature block

Read `reference/empresa.md` for the palette and requisites, and read
`site.config.ts` for the requisite values themselves.

## Signature guardrail — read before placing anything

A stamp asserts that GPS24 approved a document. A signature asserts that a
person did.

- **Place a signature only when the owner has supplied that signature image and
  said, for this document, to place it.** Not "the owner signs things like
  this", not a signature reused from a previous document because it is on hand.
- **Never draw, synthesise or trace a handwritten signature.** If no signature
  image was provided, place the typed signature block in §4 and leave the
  handwritten line empty for the owner to sign.
- The approval stamp is a different thing and is fine to place on request — it
  is a company mark, not a personal one. Still say in your reply exactly what
  you stamped and where.
- If a document is going to a third party and you are unsure whether the owner
  meant to authorise it, ask. Stamping is easy to do and awkward to retract once
  the PDF has been sent.

## 1. Stamp anatomy

The stamp is a rounded box, **6px corner radius** (`--radius-ctl`), sized so the
text sits comfortably — roughly 62 × 26 mm at A4 scale. Four lines:

```
┌──────────────────────────────────────┐
│  APROBADO · APPROVED · УТВЕРЖДЕНО    │  ← status, all three languages
│  GPS24 · gps24.es                    │  ← trade name and domain
│  ELIAN TRADE OÜ                      │  ← legal entity
│  Reg. 12040944 · KMKR EE101588780    │  ← requisites, mono
│  13.08.2026                          │  ← date, mono
└──────────────────────────────────────┘
```

Requisites and the date come from `SITE.company` — read them, do not copy the
box above. It is a layout, not a source.

## 2. Colour by status

Fill and ink are fixed by the site tokens. The graphite ink on amber is not a
preference — `--on-amber` exists precisely because white on `#FFB400` fails
contrast.

| Status | Fill | Ink | Border |
| --- | --- | --- | --- |
| Approved | `#FFB400` (`--amber`) | `#171B21` (`--on-amber`) | none |
| Reviewed / no objection | `#FFFFFF` (`--surface`) | `#1A7F4B` (`--ok`) | `#1A7F4B` 1.5pt |
| Pending a decision | `#FFFFFF` | `#B45309` (`--warn`) | `#B45309` 1.5pt |
| Rejected | `#FFFFFF` | `#B42318` (`--err`) | `#B42318` 1.5pt |

The status word carries the meaning; the colour only reinforces it. A faxed or
greyscale copy has to read correctly, which is why nothing is colour-only and
why three of the four are outlined rather than filled.

## 3. Typography

- Status line and trade name: **Overpass**, semibold, 10–11 pt
- Legal entity: **Overpass**, regular, 9 pt
- Requisites and date: **Overpass Mono**, 8 pt — codes are monospaced everywhere
  on the site, and it makes a VAT number easy to compare digit by digit
- Never stretch the box to fit; reduce to 8/7 pt or wrap the requisites onto two
  lines instead.

If Overpass is unavailable in the viewer, use the nearest grotesque and say in
your reply that the stamp is not in the brand face — do not silently substitute.

## 4. Status wording, all three languages

ES · EN · RU on one line, separated by `·`:

| Status | ES | EN | RU |
| --- | --- | --- | --- |
| Approved | APROBADO | APPROVED | УТВЕРЖДЕНО |
| Reviewed | REVISADO | REVIEWED | ПРОВЕРЕНО |
| Pending | PENDIENTE | PENDING | НА РАССМОТРЕНИИ |
| Rejected | RECHAZADO | REJECTED | ОТКЛОНЕНО |
| Paid | PAGADO | PAID | ОПЛАЧЕНО |
| Copy | COPIA | COPY | КОПИЯ |

Where the stamp box is too narrow for three languages, drop to the document's
own language and put the other two in the signature block. Never truncate a word
to make it fit.

### Signature block

For a typed sign-off, or as the line above a handwritten signature:

```
ELIAN TRADE OÜ · Reg. 12040944 · KMKR EE101588780
info@gps24.es · +34 637 792 222

Firma / Signature / Подпись: ______________________
Fecha / Date / Дата: 13.08.2026
```

Contacts come from `SITE.contact`. **No postal address and no opening hours** —
there is no shop (`SITE.hours`), and printing one on a signed document would be
a statement the company cannot stand behind.

## 5. Placement

- Bottom-right of the last page by default, ~15 mm from each edge.
- Never cover text, a figure, a total, a signature line or a barcode. Check the
  area first; move to the bottom-left, then to a fresh final page, in that order.
- A `COPIA` / `COPY` / `КОПИЯ` mark goes diagonally across the page centre at
  ~30 % opacity in `--muted` `#6B7280`, so it survives photocopying without
  drowning the text.
- One stamp per document. If a document is already stamped, say so and ask
  before adding a second.

## 6. Report

Say plainly: what status you stamped, on which page, at what position, and
whether a signature image was placed or a blank line was left. Attach the
stamped copy as a **new file** — keep the unstamped original intact, since it is
the version that may need to be re-issued.

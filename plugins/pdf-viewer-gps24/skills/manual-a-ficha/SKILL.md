---
name: manual-a-ficha
description: Turn a manufacturer PDF (manual, datasheet, in-the-box diagram, spec sheet) into GPS24 product frontmatter — trilingual specs and box contents with a page-anchored source on every line. Use when a BlackVue, Diniwid, Ulefone, Garmin, TomTom or similar PDF needs to become a card in src/content/products/, when specs must be verified against the manual, or when box[] has to be rebuilt from a factory diagram.
---

# Manual → product card

Read `reference/empresa.md` and `reference/etiquetas.md` first.

Manufacturer PDFs are the strongest source GPS24 has: they beat a shop listing,
and they are the only way to fill `box[]` honestly. This skill turns one into
frontmatter that satisfies the content schema on the first try.

## The rule that governs everything here

> Every spec line needs a `source`. No source, no line. (repo rule №3, encoded
> in `src/content.config.ts` as `source: z.string().min(1)`)

The schema will accept any non-empty string. That is not permission to write a
vague one. **A value you cannot point at on a page does not get written down** —
not as a guess, not as "probably", not carried over from a sibling model. If the
manual covers a whole product series and does not distinguish the variant in
front of you, that spec is unknown; say so and leave it out.

## Workflow

### 1. Open and identify

Open the PDF in the viewer. Record, for the citation:

- the exact document title as printed on the cover
- revision / version / date, if printed
- which models it covers, and whether it is series-generic

Series-generic manuals are common for BlackVue (one manual for DR770X 1CH and
2CH). Note it now — it changes what you are allowed to claim later.

### 2. Locate the spec table

Jump to the specifications section. In BlackVue manuals it is usually the last
pages before warranty text; in Diniwid and Ulefone material it is a single table
near the front. Keep the page number for every value you take.

### 3. Extract, page by page

For each row of the manufacturer's table:

1. **Highlight the row in the viewer** so the owner can eyeball it — amber
   `#FFB400` for a value you extracted, red `#B42318` for a row you deliberately
   skipped as ambiguous. Add a one-line note on each mark.
2. **Pick the label** from `reference/etiquetas.md`. Reuse an existing triple
   verbatim. Only compose a new one when nothing fits, following the house style
   there. If the spec is one of the eight unresolved collisions, use the more
   frequent variant and flag it in your summary.
3. **Normalise the value** to the catalogue conventions — `×` not `x`, space
   before the unit, cm in parentheses after inches. Never convert units the
   manual did not state; transcribe what is printed.
4. **Write the source** in the citation format below.

### 4. Citation format

`source` is a free string, so make it one a human can re-check in under a minute:

```
'<Document title as printed> (rev. <X>), p. <N>'
```

Examples:

```yaml
source: 'BlackVue DR770X Box PRO User Manual (v1.20), p. 44'
source: 'Diniwid N7 User Manual, p. 12'
source: 'Ulefone Tab A10 Truck datasheet (2026-03), p. 2'
```

Rules:

- **Page number is mandatory.** A manual without one is not a citation.
- Use the **printed page number** when it differs from the PDF page index; if
  only the PDF index exists, write `PDF p. <N>`.
- For a series-generic manual, say so: `…, p. 44 (series-generic: covers 1CH and
  2CH)`. This is the flag that stops a 2CH figure being published on a 1CH card.
- If the PDF is online, a URL is a better `source` than a filename — the
  catalogue already cites URLs. Prefer
  `'https://…/DR770X_manual.pdf, p. 44'` over a local path, which means nothing
  to anyone else.
- Never cite a file that only exists on this machine without also naming the
  document.

### 5. Box contents from the in-the-box diagram

`box[]` is the one field where the factory diagram beats the text — the owner
rebuilt eleven cards from in-the-box photos precisely because the shop listings
were wrong ("фото важнее", 11.08.2026).

- Read the diagram, not the prose. Count the items pictured.
- One entry per pictured item, trilingual, matching the phrasing already used
  in the catalogue (`Cable de alimentación de mechero de la unidad principal
  (3p)` — that level of specificity).
- Quantities go in the entry when the diagram shows more than one:
  `Cable de conexión de cámara (3 uds.)`.
- microSD **size** is usually not in the diagram. Take it from the card text and
  say where it came from; do not read it off a photo of a label.
- `box[]` has no `source` field in the schema. Put the citation in the HTML
  comment at the bottom of the product file, where the catalogue keeps its notes.

### 6. Emit the frontmatter

Output a YAML block ready to paste into `src/content/products/<slug>.md`. Match
the catalogue's formatting exactly — inline `{ es: …, en: …, ru: … }` maps for
labels and box entries, single quotes, two-space indent:

```yaml
specs:
  - label: { es: 'Pantalla', en: 'Screen', ru: 'Экран' }
    value: '7" LCD (17.8 cm)'
    source: 'Diniwid N7 User Manual, p. 3'
  - label: { es: 'Resolución', en: 'Resolution', ru: 'Разрешение' }
    value: '480 × 800'
    source: 'Diniwid N7 User Manual, p. 3'
box:
  - { es: 'Navegador Diniwid N7', en: 'Diniwid N7 navigator', ru: 'Навигатор Diniwid N7' }
  - { es: 'Cargador de coche', en: 'Car charger', ru: 'Автомобильная зарядка' }
```

Fields you must **not** invent, because they are owner decisions, not manual
facts: `price`, `stock`, `sku`, `related`, `serviceAddons`. Leave them out and
say so. `name`, `tagline` and `description` are marketing copy — draft them only
if asked, and never dress a spec up as a claim the manual does not make.

New file? Prefix it `_` (`_blackvue-xxx.md`) so the glob `**/[^_]*.md` keeps it
off the site until the owner publishes it. Existing file? Produce a diff of the
`specs`/`box` blocks; do not touch anything else.

### 7. Report

Summarise in ES then RU:

- how many spec lines were extracted, and from which pages
- **what you refused to write down and why** — this is the useful half
- any label collision you hit
- whether the manual was series-generic
- any value that contradicts what is already in the product file, as a finding
  for the owner (never a silent edit)

Then verify: `npm run build` runs the schema check and will reject a missing
`source` or a broken trilingual map. Run it before saying the card is done.

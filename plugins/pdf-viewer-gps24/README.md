# PDF Viewer — GPS24

A company layer on top of the **PDF Viewer** plugin
(`pdf-viewer@knowledge-work-plugins`), which does the actual viewing, annotating,
form filling and signing. This plugin does not reimplement any of that. It
supplies the part a generic PDF tool cannot know: who GPS24 is, what its
documents have to contain, and what it is not allowed to claim.

## Relationship to the upstream plugin

| Upstream `pdf-viewer` | This plugin |
| --- | --- |
| Render, annotate, highlight, stamp, sign, fill forms, export | What to check, in which colour, against which source of truth |
| Generic across companies | ELIAN TRADE OÜ requisites, GPS24 brand tokens, ES/EN/RU wording |

Keep the upstream plugin enabled. There is deliberately **no `dependencies`
entry** in `plugin.json`: the upstream plugin is delivered through the claude.ai
account plugin system, and declaring a hard cross-registry dependency here risks
blocking installation on a machine where that registry is not present. The
requirement is real but documented rather than enforced.

## Install

The repository root is the marketplace, so from the repo:

```
/plugin marketplace add .
/plugin install pdf-viewer-gps24@gps24-tools
```

Or from anywhere, once this branch is on `main`:

```
/plugin marketplace add amllpost-byte/gps24-es
/plugin install pdf-viewer-gps24@gps24-tools
```

If the install summary says `Run /reload-plugins to activate.`, run it. Validate
after any edit with `claude plugin validate ./plugins/pdf-viewer-gps24`.

## Skills

| Skill | For |
| --- | --- |
| `pdf-viewer-gps24:manual-a-ficha` | Manufacturer manual, datasheet or in-the-box diagram → trilingual product frontmatter with a page-anchored `source` on every line |
| `pdf-viewer-gps24:factura` | Supplier and customer invoices, proformas, fleet quotes, albaranes, packing lists, CMR — requisites, arithmetic, and a cross-check against the live catalogue |
| `pdf-viewer-gps24:garantia` | Warranty claims, RMA and 14-day withdrawal — deadlines computed from the purchase date, trilingual customer copy |
| `pdf-viewer-gps24:sello` | The GPS24 approval stamp and signature block in the site's brand tokens |

Shared references, read by all four: `reference/empresa.md` (requisites, palette,
document catalogue, prohibitions) and `reference/etiquetas.md` (the spec label
bank generated from the catalogue).

## The three rules the plugin is built around

**1. `site.config.ts` is the only source of business data.** The skills read
requisites, warranty periods and contacts at runtime rather than carrying
copies. A stale VAT number in a customer's warranty letter is the worst failure
mode available here, so the plugin is written to make that structurally hard.

**2. No source, no line.** Repo rule №3 — enforced in the content schema as
`source: z.string().min(1)`. `manual-a-ficha` extends it: a citation without a
page number is not a citation, and a value you cannot point at on a page does not
get written down.

**3. Flag, don't conclude.** Nothing fiscal or legal is decided here. VAT
treatment goes to the accountant; anything about burden of proof, remedies or
which country's consumer law governs goes to the owner. Both `factura` and
`garantia` are written to raise questions rather than answer them, because a
wrong answer in a document sent to a customer or a tax authority is expensive
and hard to retract.

## Language

Skill instructions are in English. Everything that reaches a customer — stamp
wording, claim forms, extracted product data — is ES · EN · RU with ES canonical,
matching the site. Summaries back to the owner are ES then RU.

## Maintenance

The label bank in `reference/etiquetas.md` is a snapshot of the catalogue
(34 SKUs, 13.08.2026). Regenerate it when products are added:

```bash
grep -ho "label: {[^}]*}" src/content/products/*.md | sort -u
```

It currently records **eight unresolved label collisions** — the same Spanish
label rendered with two different EN/RU translations across product pages
(`Pantalla` → `Screen`/`Экран` vs `Display`/`Дисплей`, and seven more). The
skills use the more frequent variant and flag the collision; settling them is an
owner decision, listed in that file.

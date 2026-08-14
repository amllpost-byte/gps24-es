# Test fixtures

Reproducible check that `factura` still catches what it is supposed to catch.
Not wired into `npm run build` — the site build must not depend on a Python PDF
library. Run it by hand after editing `skills/factura/SKILL.md`.

```bash
pip install reportlab
python3 plugins/pdf-viewer-gps24/test/make-factura-fixture.py   # → factura-test.pdf
```

Then, in a session with the plugin installed:

```
Use pdf-viewer-gps24:factura to review factura-test.pdf. Report findings only.
```

## Ground truth — six planted defects

| # | Defect | Expected finding |
| --- | --- | --- |
| 1 | Buyer is "GPS24 SL" | Trade name, not the legal entity — must be ELIAN TRADE OÜ |
| 2 | Buyer VAT `EE101588781` | One digit off `SITE.company.vat` (`EE101588780`) |
| 3 | No seller VAT anywhere | Mandatory field absent |
| 4 | TOTAL printed 4291.00 | 3548.10 + 745.10 = 4293.20 — a €2.20 gap, not rounding |
| 5 | DNW-N7-VEO at 169.90 | Catalogue `price` is 149.90 — +20.00 € (+13.3 %) |
| 6 | BV-DR770X-1CH billed | File is `_`-prefixed — an unpublished draft, not live on the site |

A pass means all six are reported **and** nothing in the repo is modified.
Defects 5 and 6 are the ones that prove the catalogue cross-check really reads
`src/content/products/` rather than guessing: change a price in the catalogue and
the expected delta in row 5 has to move with it.

Defects 1, 2 and 5 also guard rule 1 of the plugin — they can only be caught by
reading `site.config.ts` and the product files at runtime, so they fail loudly if
someone ever hardcodes those values into a skill.

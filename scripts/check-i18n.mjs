// Паритет ключей ui.es/en/ru.json: ES — канон, наборы обязаны совпадать.
// Падает с кодом 1 при расхождении (шаг CI перед сборкой).
import { readFileSync } from 'node:fs';

const langs = ['es', 'en', 'ru'];
const keysByLang = new Map(
  langs.map((lang) => {
    const url = new URL(`../src/i18n/ui.${lang}.json`, import.meta.url);
    return [lang, Object.keys(JSON.parse(readFileSync(url, 'utf8')))];
  }),
);

const canon = new Set(keysByLang.get('es'));
let failed = false;
for (const lang of langs.slice(1)) {
  const keys = keysByLang.get(lang);
  const missing = [...canon].filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !canon.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`ui.${lang}.json: missing=[${missing.join(', ')}] extra=[${extra.join(', ')}]`);
  }
}

if (failed) process.exit(1);
console.log(`i18n OK: ${canon.size} keys × ${langs.length} langs`);

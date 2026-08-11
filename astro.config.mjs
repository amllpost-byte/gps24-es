// gps24.es — конфиг Astro (ТЗ docs/06-environment.md).
// ES — корень без префикса, EN/RU — /en/ и /ru/.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// из sitemap исключаются 404, privacidad/privacy, cookies (ТЗ §SEO)
// и сравнение (заглушка до island — не индексируем)
const SITEMAP_EXCLUDE = /\/(404|privacidad|privacy|cookies|comparar|compare|sravnenie)(\/|$)/;

export default defineConfig({
  site: 'https://gps24.es',
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ru'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // hreflang-альтернаты sitemap-плагин собирает неверно (частично, без
    // x-default и вразнобой с on-page hreflang) — on-page разметки достаточно
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.test(page),
    }),
  ],
});

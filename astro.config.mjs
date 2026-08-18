// Сайт охранных систем (рабочее название segur24) — конфиг Astro.
// ⚠ site — домен-заглушка до покупки реального (см. site.config.ts).
// ES — корень без префикса, EN/RU — /en/ и /ru/.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// из sitemap исключаются 404, privacidad/privacy, cookies (ТЗ §SEO)
const SITEMAP_EXCLUDE = /\/(404|privacidad|privacy|cookies)(\/|$)/;

export default defineConfig({
  site: 'https://segur24.es',
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

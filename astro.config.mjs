// gps24.es — конфиг Astro (ТЗ docs/06-environment.md).
// ES — корень без префикса, EN/RU — /en/ и /ru/.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// из sitemap исключаются 404, privacidad/privacy и cookies (ТЗ §SEO)
const SITEMAP_EXCLUDE = /\/(404|privacidad|privacy|cookies)(\/|$)/;

export default defineConfig({
  site: 'https://gps24.es',
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ru'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.test(page),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-GB', ru: 'ru-RU' },
      },
    }),
  ],
});

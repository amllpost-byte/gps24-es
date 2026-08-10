// i18n-хелперы: словари UI, карта слагов между языками, построение путей.
// ES — канон: любая новая строка сначала появляется в ui.es.json.
import es from './ui.es.json';
import en from './ui.en.json';
import ru from './ui.ru.json';
import type { Lang } from '@config';

const ui = { es, en, ru } as const;

export type UIKey = keyof typeof es;

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui.es[key];
  };
}

// Канонический ES-слаг → эквиваленты EN/RU. Используется и в LangSwitch,
// чтобы переключение языка вело на эквивалентную страницу, а не на главную.
export const routeMap = {
  '': { en: '', ru: '' },
  tienda: { en: 'catalog', ru: 'katalog' },
  productos: { en: 'products', ru: 'products' },
  'actualizacion-de-mapas': { en: 'map-updates', ru: 'obnovlenie-kart' },
  'instalacion-dashcam': { en: 'dashcam-installation', ru: 'ustanovka-registratora' },
  'gps-para-camiones': { en: 'truck-gps', ru: 'gps-dlya-gruzovikov' },
  comparar: { en: 'compare', ru: 'sravnenie' },
  flotas: { en: 'fleets', ru: 'avtoparki' },
  soporte: { en: 'support', ru: 'podderzhka' },
  contacto: { en: 'contact', ru: 'kontakty' },
  privacidad: { en: 'privacy', ru: 'privacy' },
  cookies: { en: 'cookies', ru: 'cookies' },
} as const;

export type RouteKey = keyof typeof routeMap;

/** Путь страницы для языка: localizePath('tienda', 'ru') → '/ru/katalog'.
 *  rest — хвост после слага (напр. '/navi-truck-7' для карточки). */
export function localizePath(route: RouteKey, lang: Lang, rest = ''): string {
  const slug = lang === 'es' ? route : routeMap[route][lang];
  const parts = [lang === 'es' ? '' : lang, slug].filter(Boolean);
  return '/' + parts.join('/') + rest;
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' || first === 'ru' ? first : 'es';
}

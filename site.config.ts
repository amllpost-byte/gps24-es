// gps24.es — единственный источник бизнес-данных.
// Цены, часы, телефон, сроки, тексты trust-бара, флаг Этапа 2 — ТОЛЬКО здесь.
// Шаблоны читают отсюда; литералы в компонентах запрещены.

export const SITE = {
  name: 'GPS24',
  domain: 'gps24.es',
  url: 'https://gps24.es',
  defaultLang: 'es' as const,
  langs: ['es', 'en', 'ru'] as const,

  contact: {
    whatsapp: '34637792222',             // только цифры — для wa.me
    whatsappDisplay: '+34 637 792 222',  // как показываем
    email: 'info@gps24.es',
    // предзаполненные сообщения; {product} подставляет компонент WhatsAppCTA
    waMessages: {
      es: 'Hola, me interesa {product}. ¿Está disponible?',
      en: 'Hi, I am interested in {product}. Is it available?',
      ru: 'Здравствуйте, интересует {product}. Есть в наличии?',
    },
    waGeneric: {
      es: 'Hola, tengo una consulta sobre navegación GPS.',
      en: 'Hi, I have a question about GPS navigation.',
      ru: 'Здравствуйте, у меня вопрос по GPS-навигации.',
    },
  },

  hours: {
    // Физического магазина НЕТ (решение владельца, август 2026):
    // часов работы и самовывоза не существует, OpeningHours в JSON-LD не выводим.
    // Единственное обещание — статичное, про ответ в WhatsApp:
    replyPromise: {
      es: 'Respondemos por WhatsApp normalmente en menos de 1 h durante el día',
      en: 'WhatsApp reply usually within 1 h during the day',
      ru: 'Отвечаем в WhatsApp обычно в течение часа днём',
    },
  },

  location: {
    city: 'Benidorm',
    province: 'Alicante',
    region: 'Comunidad Valenciana',
    country: 'ES',
    serviceArea: ['Benidorm', 'Alicante', 'Valencia', 'Comunidad Valenciana'],
  },

  shipping: {
    // ⚠️ ЗАГЛУШКА — сроки не подтверждены (курьерку для Испании ещё не выбирали).
    // Заменить после выбора перевозчика; на сайте обещать только то, что курьерка
    // реально гарантирует (правило: доверие числами = проверяемыми числами).
    es: 'Envío 24–48 h en la Comunidad Valenciana · 2–4 días al resto de España',
    en: 'Delivery 24–48 h in the Valencia region · 2–4 days rest of Spain',
    ru: 'Доставка 24–48 ч по региону Валенсия · 2–4 дня по Испании',
  },

  guarantees: {
    warrantyYears: 3,   // закон Испании с 2022 — новые товары
    returnDays: 14,     // дистанционная продажа, EU
  },

  trust: {
    // trust-бар: только проверяемые числа, никаких «качество/надёжность»
    es: [
      { value: '15+',     label: 'años en navegación GPS' },
      { value: '24 h',    label: 'actualización de mapas' },
      { value: '3 años',  label: 'garantía legal' },
      { value: '< 1 h',   label: 'respuesta por WhatsApp (de día)' },
    ],
    en: [
      { value: '15+',     label: 'years in GPS navigation' },
      { value: '24 h',    label: 'map update turnaround' },
      { value: '3 yrs',   label: 'legal warranty' },
      { value: '< 1 h',   label: 'WhatsApp reply' },
    ],
    ru: [
      { value: '15+',     label: 'лет в GPS-навигации' },
      { value: '24 ч',    label: 'обновление карт' },
      { value: '3 года',  label: 'гарантия по закону' },
      { value: '< 1 ч',   label: 'ответ в WhatsApp' },
    ],
  },

  // Этап 2 (онлайн-оплата). false = сайт работает в WhatsApp-режиме:
  // корзина, чекаут и цены «в корзину» не рендерятся вовсе.
  checkout: {
    enabled: false,
    methods: ['bizum', 'card'] as const,
  },

  analytics: {
    // Этап 1: без трекеров. Далее — только privacy-first без кук (Plausible),
    // тогда cookie-баннер не нужен (см. раздел 5 ТЗ).
    enabled: false,
    provider: 'plausible' as const,
  },
} as const;

export type Lang = (typeof SITE.langs)[number];

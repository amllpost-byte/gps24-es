// Сайт охранных систем (анти-окупа) — единственный источник бизнес-данных.
// Цены, часы, телефон, сроки, тексты trust-бара — ТОЛЬКО здесь.
// Шаблоны читают отсюда; литералы в компонентах запрещены.
//
// ⚠ РАБОЧЕЕ НАЗВАНИЕ. Домен ещё не куплен (решение владельца 18.08.2026:
// «начни с рабочим названием»). Когда появится домен/бренд — поменять здесь
// name/domain/url/brand и email, плюс public/robots.txt и site в astro.config.mjs.

export const SITE = {
  name: 'SEGUR24', // рабочее название в духе gps24.es; НЕ финальное
  domain: 'segur24.es', // заглушка до покупки домена
  url: 'https://segur24.es',
  defaultLang: 'es' as const,
  langs: ['es', 'en', 'ru'] as const,

  // Текстовый логотип: {mark}{accent}, accent — янтарный (канон холдинга GPS24).
  brand: {
    mark: 'SEGUR',
    accent: '24',
  },

  company: {
    // Юрлицо этапа запуска — эстонская фирма владельца, как на gps24.es /
    // naviseade.ee (продажи и отправка из Эстонии до октябрьского открытия).
    legalName: 'ELIAN TRADE OÜ',
    regCode: '12040944', // Registrikood (Эстония)
    vat: 'EE101588780', // KMKR / VAT
    country: 'EE',
  },

  contact: {
    whatsapp: '34637792222',             // только цифры — для wa.me
    whatsappDisplay: '+34 637 792 222',  // как показываем
    // TODO(домен): после покупки домена завести catch-all (ImprovMX) и заменить.
    // Пока — рабочий ящик владельца с gps24.es (catch-all уже настроен и работает).
    email: 'info@gps24.es',
    // предзаполненные сообщения; {product} подставляет компонент WhatsAppCTA
    // (товар или пакет — шаблон универсальный)
    waMessages: {
      es: 'Hola, me interesa {product}. ¿Me pasan precio y disponibilidad?',
      en: 'Hi, I am interested in {product}. Could you tell me the price and availability?',
      ru: 'Здравствуйте, интересует {product}. Подскажите цену и наличие?',
    },
    waGeneric: {
      es: 'Hola, quiero proteger mi vivienda. ¿Me pueden asesorar?',
      en: 'Hi, I want to protect my home in Spain. Could you advise me?',
      ru: 'Здравствуйте, хочу защитить жильё в Испании. Подскажете?',
    },
  },

  hours: {
    // Физического магазина НЕТ (как на gps24.es): часов работы и самовывоза
    // не существует, OpeningHours в JSON-LD не выводим.
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
    // зона концентрации ниши по исследованию 11.08: Torrevieja, Benidorm,
    // Elche, Orihuela — провинция Аликанте №1 по вторым резиденциям
    serviceArea: ['Benidorm', 'Alicante', 'Torrevieja', 'Orihuela Costa', 'Comunidad Valenciana'],
  },

  shipping: {
    // Этап запуска (как gps24.es): оформление и отправка — из Эстонии (ЕС),
    // конкретных сроков не обещаем. Полноценное открытие в Comunidad
    // Valenciana — октябрь 2026, тогда заменить на локальные сроки.
    es: 'Envíos desde Estonia (UE) · plazo de entrega — consultar por WhatsApp',
    en: 'Ships from Estonia (EU) · delivery time — ask on WhatsApp',
    ru: 'Отправка из Эстонии (ЕС) · срок доставки — уточняйте в WhatsApp',
  },

  // Плашка на всех страницах до полноценного октябрьского открытия.
  launchNotice: {
    es: 'Apertura completa en la Comunidad Valenciana — octubre de 2026. Hasta entonces, los pedidos se gestionan y envían desde Estonia (UE).',
    en: 'Full opening in the Comunidad Valenciana — October 2026. Until then, orders are processed and shipped from Estonia (EU).',
    ru: 'Полноценное открытие в Comunidad Valenciana — октябрь 2026. Пока заказы оформляются и отправляются из Эстонии (ЕС).',
  },

  guarantees: {
    warrantyYears: 3,   // закон Испании с 2022 — новые товары
    returnDays: 14,     // дистанционная продажа, EU
  },

  trust: {
    // trust-бар: только проверяемые числа, никаких «качество/надёжность».
    // «0 € куот» — суть оффера (продажа без абонплаты, самомониторинг).
    es: [
      { value: '0 €',     label: 'cuotas mensuales' },
      { value: '3 años',  label: 'garantía legal' },
      { value: '14 días', label: 'devolución (UE)' },
      { value: '< 1 h',   label: 'respuesta por WhatsApp (de día)' },
    ],
    en: [
      { value: '€0',      label: 'monthly fees' },
      { value: '3 yrs',   label: 'legal warranty' },
      { value: '14 days', label: 'returns (EU)' },
      { value: '< 1 h',   label: 'WhatsApp reply' },
    ],
    ru: [
      { value: '0 €',     label: 'абонплата в месяц' },
      { value: '3 года',  label: 'гарантия по закону' },
      { value: '14 дней', label: 'возврат (ЕС)' },
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
    // тогда cookie-баннер не нужен.
    enabled: false,
    provider: 'plausible' as const,
  },
} as const;

export type Lang = (typeof SITE.langs)[number];

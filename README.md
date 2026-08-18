# casalarma.es — охранные системы в Испании

⚠️ **ЭТА ВЕТКА — ЗАГОТОВКА ОТДЕЛЬНОГО САЙТА, НЕ МЁРЖИТЬ В `main`.**
`main` этого репозитория — боевой сайт gps24.es (грузовая навигация); push в
`main` деплоится на прод. Ветка `claude/security-devices-spain-site-9b5as7`
переедет в собственный репозиторий (например `casalarma-es`) — см. чек-лист ниже.

Сайт продажи и установки охранных систем (сигнализации Ajax, камеры, датчики
движения/открытия/протечки, WaterStop) для владельцев жилья в Испании —
ниша «анти-окупа», Коста-Бланка / Comunidad Valenciana. Исследование ниши:
приватное репо `amllpost-byte/gps24`, `docs/research-antiokupa-security.md`.

Бренд: **CASALARMA** (casa+alarma с общей «a», произносится одинаково на
ES/EN/RU). Домен куплен 18.08.2026 в DonDominio, истекает 18/08/2027.
Всё брендозависимое — в `site.config.ts` (+ `site` в `astro.config.mjs`,
`Sitemap` в `public/robots.txt`).

Astro 5 (static) + ванильный CSS на дизайн-токенах + минимум JS. Три языка:
ES (канон, `/`), EN (`/en/`), RU (`/ru/`).

## Команды

| Команда | Что делает |
| --- | --- |
| `npm install` | зависимости |
| `npm run dev` | дев-сервер на `localhost:4321` |
| `npm run build` | проверка паритета i18n-ключей + сборка в `dist/` |
| `npm run preview` | локальный просмотр собранного `dist/` |
| `npm run check:i18n` | наборы ключей `ui.es/en/ru.json` обязаны совпадать |

## Структура

- `site.config.ts` — единственный источник бизнес-данных (телефон, тексты trust-бара, юрлицо).
- `src/styles/tokens.css` — все дизайн-токены (light + dark); компоненты используют только `var(--…)`.
- `src/content/` — коллекции: `products/` (1 файл = 1 SKU, три локали во frontmatter), `services/`, `faq/`. Пока пусты — карточки Ajax появятся после подтверждения закупки и розничных цен.
- `src/i18n/` — словари UI + карта слагов между языками (`routeMap`).
- `src/components/pages/` — шаблоны страниц; файлы в `src/pages/` — тонкие локальные обёртки.

Правила контента:
- ТТХ — только из проверенных источников (поле `source` обязательно в схеме); нет источника — строки нет. Цены не выдумываем: пока их нет — «presupuesto por WhatsApp».
- Юридическая рамка текстов: «мгновенное обнаружение + доказательства для полиции»; НЕ обещаем «полиция выселит без суда»; НЕ называемся «empresa de seguridad» (термин зарезервирован Ley 5/2014) — только «venta e instalación de sistemas de alarma y videovigilancia».

## Деплой

`.github/workflows/deploy.yml` — для БУДУЩЕГО репозитория casalarma
(build на PR, деплой GitHub Pages только с `main` того репо). Пока ветка
живёт здесь, workflow даёт только PR-проверку сборки.

## Чек-лист запуска casalarma.es (владелец + Claude)

1. ✅ ~~Купить домен~~ — casalarma.es, 18.08.2026, DonDominio.
2. Автопродление: домен в Automatic **и способ оплаты привязан** (DonDominio →
   Preferences → Auto renewals; тот же висяк у gps24.es — закрыть оба разом).
3. Почта: ImprovMX → Add domain `casalarma.es`; в DNS DonDominio:
   MX `10 mx1.improvmx.com`, `20 mx2.improvmx.com`; TXT SPF
   `v=spf1 include:spf.improvmx.com ~all`. Catch-all — на ящик владельца
   (как у gps24.es). До этого `info@casalarma.es` в шапке сайта — мёртвый.
4. Новый репозиторий (например `amllpost-byte/casalarma-es`), эту ветку — в его
   `main`; создать `public/CNAME` с `casalarma.es` (здесь не создаём, чтобы
   случайный merge не увёл домен у gps24.es).
5. GitHub Pages в новом репо: Source = GitHub Actions; DNS в DonDominio:
   A `185.199.108.153 / .109. / .110. / .111.153`, `www` CNAME
   `amllpost-byte.github.io`; дождаться серта, включить Enforce HTTPS.
6. Контент: карточки Ajax (после дилерских цен ELKO/BK Eesti и решения по
   розничным), FAQ, страницы сценариев, фото пилот-кита.

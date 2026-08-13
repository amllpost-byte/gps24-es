# Spec label bank

The `{es,en,ru}` label triples already in use in `src/content/products/*.md`,
generated from the catalogue on 13.08.2026 (34 SKUs).

**Reuse before you invent.** A new product that says "Screen" must use the same
triple as every other product that says "Screen", or the site ends up with two
words for one thing in the same table. Only invent a triple when the spec has no
existing equivalent — and then follow the house style below.

Regenerate this file when the catalogue grows:

```bash
grep -ho "label: {[^}]*}" src/content/products/*.md | sort -u
```

## Reuse first — the established triples

Ordered by how often they appear. These are settled; copy them verbatim.

| ES | EN | RU | uses |
| --- | --- | --- | --- |
| Códec de vídeo | Video codec | Видеокодек | 14 |
| Tarjeta de memoria | Memory card | Карта памяти | 14 |
| Compatibilidad | Compatibility | Совместимость | 13 |
| Wi-Fi | Wi-Fi | Wi-Fi | 12 |
| Sensor | Sensor | Сенсор | 10 |
| Resolución | Resolution | Разрешение | 8 |
| Cámara frontal | Front camera | Передняя камера | 7 |
| Cámara trasera | Rear camera | Задняя камера | 7 |
| Modelo | Model | Модель | 6 |
| GPS integrado | Built-in GPS | Встроенный GPS | 6 |
| Ángulo de visión | Viewing angle | Угол обзора | 4 |
| G-Sensor (3 ejes) | G-sensor (3-axis) | G-сенсор (3-осевой) | 4 |
| Procesador | Processor | Процессор | 4 |
| Sistema operativo | Operating system | Операционная система | 4 |
| Batería | Battery | Аккумулятор | 4 |
| Tipo | Type | Тип | 4 |
| Pantalla | Screen | Экран | 4 |
| Peso | Weight | Вес | 4 |
| Nube (opcional) | Cloud (optional) | Облако (опционально) | 3 |
| Cámara | Camera | Камера | 3 |
| Modo aparcamiento | Parking mode | Режим парковки | 3 |
| Código | Code | Код | 3 |
| Original BlackVue | Genuine BlackVue | Оригинал BlackVue | 3 |
| Memoria RAM | RAM | Оперативная память | 3 |
| Memoria interna | Internal storage | Встроенная память | — |
| Ranura de tarjeta | Card slot | Слот карты памяти | — |
| Resolución de vídeo | Video resolution | Разрешение видео | — |
| Temperatura de funcionamiento | Operating temperature | Рабочая температура | — |
| Tensión | Voltage | Напряжение | — |
| Consumo | Power consumption | Энергопотребление | — |
| Capacidad | Capacity | Ёмкость | — |
| Longitud del cable | Cable length | Длина кабеля | — |
| Puertos | Ports | Разъёмы | — |
| Certificación | Certification | Сертификация | — |
| Clase de protección | Protection rating | Класс защиты | — |
| Formato | Form factor | Формат | — |
| Conectividad | Connectivity | Связь | — |
| USB | USB | USB | — |

## Unresolved collisions — ask the owner, do not pick silently

The catalogue currently uses **two different triples for the same ES label**.
Both variants render in the same spec table, so a customer switching between two
product pages sees two words for one thing.

When a manual gives you one of these specs: use the more frequent variant, and
**say in your summary that the collision exists and is unresolved**. Do not
rewrite the other product files to match — that is a content decision for the
owner, not a side effect of reading a PDF.

| ES | Variant A (uses) | Variant B (uses) | more frequent |
| --- | --- | --- | --- |
| Pantalla | `Screen` / `Экран` (4) | `Display` / `Дисплей` (1) | A |
| Sensor | `Sensor` / `Сенсор` (10) | `Sensor` / `Датчик` (3) | A |
| GPS integrado | `Built-in GPS` / `Встроенный GPS` (6) | `Built-in GPS` / `GPS встроенный` (2) | A |
| Ángulo de visión | `Viewing angle` / `Угол обзора` (4) | `Field of view` / `Угол обзора` (1) | A |
| Dimensiones | `Dimensions` / `Габариты` (3) | `Dimensions` / `Размеры` (2) | A |
| Avisos de voz de eventos de aparcamiento | `Voice alerts for…` (1) | `Voice notifications of…` (1) | tie |
| Fija el ángulo de grabación | `…` / `Фиксация угла записи` (1) | `…` / `Фиксация угла съёмки` (1) | tie |
| Conexión (alimentación desde la unidad principal) | `…` / `…основного регистратора` (1) | `…` / `…основной камеры` (1) | tie |

## House style for a new triple

- **ES is canonical.** Write the Spanish label first, then translate.
- **Sentence case**, no trailing colon: `Ángulo de visión`, not `ÁNGULO DE VISIÓN:`.
- **Qualifier in parentheses** when a spec exists per camera or per mode:
  `Resolución (cámara trasera)`, `Modo aparcamiento (ultrabajo consumo)`.
- **Keep units out of the label** — they belong in `value`: label
  `Temperatura de funcionamiento`, value `-20 °C … 70 °C`.
- **Brand and product names stay untranslated** in all three languages:
  `Wi-Fi`, `BlackVue Cloud`, `G-Sensor`, `microSD`, `HDR`, `USB`.
- **RU uses ё where it belongs** (`Ёмкость`, `Разъёмы`) — the catalogue does.
- **Non-breaking space before units** is not used in the catalogue; a normal
  space is the convention (`64 GB`, `360 g`, `12 V`).

## Value formatting, as used in the catalogue

| Kind | Convention | Example |
| --- | --- | --- |
| Screen size | inches with `"` plus cm in parentheses | `7" LCD (17.8 cm)` |
| Resolution | `×` (multiplication sign, not `x`) | `480 × 800` |
| Dimensions | `×` with spaces, unit once at the end | `186 × 115 × 16 mm` |
| Weight | space before unit | `360 g` |
| Capacity | space before unit | `1500 mAh`, `256 MB DDR3` |
| Temperature | `°C` with a space, range with `…` | `-20 °C … 70 °C` |
| Voltage | space before unit | `12 V` |

`value` is a **single plain string** (not localized) — the schema types it as
`z.string()`. Keep numbers and units language-neutral so one string works in all
three locales; put anything that needs translating into the `label`.

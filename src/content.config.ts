// Схемы контент-коллекций (Astro 5 content layer).
// Трилингвальность обязательна на уровне схемы: name/tagline/description — {es,en,ru}.
// У каждой строки ТТХ обязателен source (datasheet производителя и т.п.) —
// правило CLAUDE.md №3: нет источника — строка не существует.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const localized = z.object({ es: z.string(), en: z.string(), ru: z.string() });

const products = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      sku: z.string(),
      name: localized,
      tagline: localized,
      description: localized,
      price: z.number().positive(), // EUR
      stock: z.enum(['in-stock', 'on-order', 'out']),
      category: z.enum(['navigator', 'dashcam', 'accessory']),
      brand: z.string().optional(),
      specs: z
        .array(z.object({ label: localized, value: z.string(), source: z.string().min(1) }))
        .default([]),
      box: z.array(localized).default([]),
      images: z.array(z.object({ src: image(), alt: localized })).default([]),
      whatsappText: localized.optional(),
      related: z.array(z.string()).default([]),
      serviceAddons: z.array(z.string()).default([]),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/services' }),
  schema: z.object({
    name: localized,
    priceFrom: z.number().positive(), // EUR, «desde»
    turnaround: localized, // срок выполнения
    includes: z.array(localized).default([]),
    supportedBrands: z.array(z.string()).default([]),
  }),
});

// Ответ — в frontmatter (answer.{es,en,ru}), не в body: body одноязычен,
// а FAQ обязан существовать на трёх языках (осознанное отступление от ТЗ §Среда).
const faq = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/faq' }),
  schema: z.object({
    question: localized,
    answer: localized,
    category: z.enum(['garantia', 'envio', 'devolucion', 'pago', 'servicio', 'general']),
    order: z.number().default(100),
  }),
});

export const collections = { products, services, faq };

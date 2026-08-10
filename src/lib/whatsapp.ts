// Единственное место сборки wa.me-ссылок; номер и шаблоны — из site.config.
import { SITE, type Lang } from '@config';

export function waLink(lang: Lang, product?: string): string {
  const text = product
    ? SITE.contact.waMessages[lang].replace('{product}', product)
    : SITE.contact.waGeneric[lang];
  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Единый формат цен по ТЗ 03 §1.3.1: локаль es-ES (десятичные через запятую),
// целые — без «,00». Валюта « €» добавляется в месте вывода (после суммы, с пробелом).
export function formatPrice(amount: number): string {
  const digits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

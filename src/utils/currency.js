const grouped = new Intl.NumberFormat("en-PH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(amount) {
  const value = Number(amount);
  return `\u20B1${grouped.format(Number.isFinite(value) ? value : 0)}`;
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(amount) {
  const value = Number(amount);
  return formatter.format(Number.isFinite(value) ? value : 0);
}

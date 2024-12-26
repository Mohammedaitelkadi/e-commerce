export function calculateTotalAmount(pricePerDay: number, days: number): number {
  return Math.round(pricePerDay * days * 100) / 100;
}
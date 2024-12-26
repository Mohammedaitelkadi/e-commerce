export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(' ').substr(0, 19);
}

export function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.substr(0, 2)}/${digits.substr(2, 2)}`;
  }
  return digits;
}
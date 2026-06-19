export function onlyNumbers(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatDateInput(value: string): string {
  const numbersOnly = onlyNumbers(value).slice(0, 8);

  if (numbersOnly.length <= 4) {
    return numbersOnly;
  }

  if (numbersOnly.length <= 6) {
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
  }

  return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(
    4,
    6,
  )}-${numbersOnly.slice(6)}`;
}

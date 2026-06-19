export function parseOptionalNumber(value: string): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const parsedValue = Number(trimmedValue);

  if (Number.isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
}

export function isValidOptionalNumber(value: string): boolean {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return true;
  }

  return !Number.isNaN(Number(trimmedValue));
}

export function isValidOptionalDate(value: string): boolean {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return true;
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(trimmedValue)) {
    return false;
  }

  const date = new Date(trimmedValue);

  return !Number.isNaN(date.getTime());
}

export function parseOptionalDate(value: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  return trimmedValue;
}

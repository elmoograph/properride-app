export function formatOptionalValue(value?: string | number | null): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

export function formatNumber(value?: number | null): string {
  if (value === null || value === undefined) {
    return "-";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCc(value?: number | null): string {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${value} cc`;
}

export function formatMileage(value?: number | null): string {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${new Intl.NumberFormat("en-US").format(value)} km`;
}

export function formatCurrency(value?: number | null): string {
  if (value === null || value === undefined) {
    return "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value?: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

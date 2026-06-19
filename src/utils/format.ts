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

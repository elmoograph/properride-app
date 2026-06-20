import { formatCurrency } from "@/src/shared/utils/formatCurrency";
import { formatNumber } from "@/src/shared/utils/formatNumber";

import type { GarageMotorcycle } from "../types/garage.types";

export function getMotorcycleDisplayName(motorcycle: GarageMotorcycle): string {
  return motorcycle.nickname || motorcycle.model;
}

export function getMotorcycleMeta(motorcycle: GarageMotorcycle): string {
  return `${motorcycle.brand} • ${motorcycle.year} • ${motorcycle.color}`;
}

export function formatBuildCost(value: number): string {
  return formatCurrency(value);
}

export function formatTotalParts(value: number): string {
  return formatNumber(value);
}

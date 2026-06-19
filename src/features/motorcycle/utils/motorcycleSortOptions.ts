import {
  MOTORCYCLE_COPY,
  MOTORCYCLE_SORT_OPTIONS,
} from "@/src/features/motorcycle/constants/motorcycle.constants";
import type { MotorcycleSortOption } from "@/src/features/motorcycle/types/motorcycle.types";

export type MotorcycleSortOptionItem = {
  label: string;
  value: MotorcycleSortOption;
};

export const MOTORCYCLE_SORT_OPTION_ITEMS: MotorcycleSortOptionItem[] = [
  {
    label: MOTORCYCLE_COPY.GARAGE_SORT_NEWEST,
    value: MOTORCYCLE_SORT_OPTIONS.NEWEST,
  },
  {
    label: MOTORCYCLE_COPY.GARAGE_SORT_OLDEST,
    value: MOTORCYCLE_SORT_OPTIONS.OLDEST,
  },
  {
    label: MOTORCYCLE_COPY.GARAGE_SORT_BRAND,
    value: MOTORCYCLE_SORT_OPTIONS.BRAND,
  },
  {
    label: MOTORCYCLE_COPY.GARAGE_SORT_YEAR,
    value: MOTORCYCLE_SORT_OPTIONS.YEAR,
  },
];

export function getMotorcycleSortOptionLabels(): string[] {
  return MOTORCYCLE_SORT_OPTION_ITEMS.map((option) => option.label);
}

export function getMotorcycleSortValueByLabel(
  label: string,
): MotorcycleSortOption {
  return (
    MOTORCYCLE_SORT_OPTION_ITEMS.find((option) => option.label === label)
      ?.value ?? MOTORCYCLE_SORT_OPTIONS.NEWEST
  );
}

export function getMotorcycleSortLabelByValue(
  value: MotorcycleSortOption,
): string {
  return (
    MOTORCYCLE_SORT_OPTION_ITEMS.find((option) => option.value === value)
      ?.label ?? MOTORCYCLE_COPY.GARAGE_SORT_NEWEST
  );
}

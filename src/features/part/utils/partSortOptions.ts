import {
  PART_COPY,
  PART_SORT_OPTIONS,
} from "@/src/features/part/constants/part.constants";
import type { PartSortOption } from "@/src/features/part/types/part.types";

export type PartSortOptionItem = {
  label: string;
  value: PartSortOption;
};

export const PART_SORT_OPTION_ITEMS: PartSortOptionItem[] = [
  {
    label: PART_COPY.SORT_NEWEST,
    value: PART_SORT_OPTIONS.NEWEST,
  },
  {
    label: PART_COPY.SORT_PRICE_HIGH,
    value: PART_SORT_OPTIONS.PRICE_HIGH,
  },
  {
    label: PART_COPY.SORT_PRICE_LOW,
    value: PART_SORT_OPTIONS.PRICE_LOW,
  },
  {
    label: PART_COPY.SORT_INSTALL_DATE,
    value: PART_SORT_OPTIONS.INSTALL_DATE,
  },
];

export function getPartSortOptionLabels(): string[] {
  return PART_SORT_OPTION_ITEMS.map((option) => option.label);
}

export function getPartSortValueByLabel(label: string): PartSortOption {
  return (
    PART_SORT_OPTION_ITEMS.find((option) => option.label === label)?.value ??
    PART_SORT_OPTIONS.NEWEST
  );
}

export function getPartSortLabelByValue(value: PartSortOption): string {
  return (
    PART_SORT_OPTION_ITEMS.find((option) => option.value === value)?.label ??
    PART_COPY.SORT_NEWEST
  );
}

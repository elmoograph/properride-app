import { PART_SORT_OPTIONS } from "@/src/features/part/constants/part.constants";
import type {
  Part,
  PartSortOption,
} from "@/src/features/part/types/part.types";

function getTimeValue(value?: string | null): number {
  if (!value) {
    return 0;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 0;
  }

  return date.getTime();
}

function getPriceValue(value?: number | null): number {
  return value ?? 0;
}

export function sortParts(parts: Part[], sortOption: PartSortOption): Part[] {
  const nextParts = [...parts];

  if (sortOption === PART_SORT_OPTIONS.PRICE_HIGH) {
    return nextParts.sort(
      (firstPart, secondPart) =>
        getPriceValue(secondPart.price) - getPriceValue(firstPart.price),
    );
  }

  if (sortOption === PART_SORT_OPTIONS.PRICE_LOW) {
    return nextParts.sort(
      (firstPart, secondPart) =>
        getPriceValue(firstPart.price) - getPriceValue(secondPart.price),
    );
  }

  if (sortOption === PART_SORT_OPTIONS.INSTALL_DATE) {
    return nextParts.sort(
      (firstPart, secondPart) =>
        getTimeValue(secondPart.install_date) -
        getTimeValue(firstPart.install_date),
    );
  }

  return nextParts.sort(
    (firstPart, secondPart) =>
      getTimeValue(secondPart.created_at) - getTimeValue(firstPart.created_at),
  );
}

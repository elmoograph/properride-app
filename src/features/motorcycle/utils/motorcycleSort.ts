import { MOTORCYCLE_SORT_OPTIONS } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type {
  Motorcycle,
  MotorcycleSortOption,
} from "@/src/features/motorcycle/types/motorcycle.types";

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

function getYearValue(value?: number | null): number {
  return value ?? 0;
}

export function sortMotorcycles(
  motorcycles: Motorcycle[],
  sortOption: MotorcycleSortOption,
): Motorcycle[] {
  const nextMotorcycles = [...motorcycles];

  if (sortOption === MOTORCYCLE_SORT_OPTIONS.OLDEST) {
    return nextMotorcycles.sort(
      (firstMotorcycle, secondMotorcycle) =>
        getTimeValue(firstMotorcycle.created_at) -
        getTimeValue(secondMotorcycle.created_at),
    );
  }

  if (sortOption === MOTORCYCLE_SORT_OPTIONS.BRAND) {
    return nextMotorcycles.sort((firstMotorcycle, secondMotorcycle) =>
      firstMotorcycle.brand.localeCompare(secondMotorcycle.brand),
    );
  }

  if (sortOption === MOTORCYCLE_SORT_OPTIONS.YEAR) {
    return nextMotorcycles.sort(
      (firstMotorcycle, secondMotorcycle) =>
        getYearValue(secondMotorcycle.year) -
        getYearValue(firstMotorcycle.year),
    );
  }

  return nextMotorcycles.sort(
    (firstMotorcycle, secondMotorcycle) =>
      getTimeValue(secondMotorcycle.created_at) -
      getTimeValue(firstMotorcycle.created_at),
  );
}

import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

export function filterMotorcycles(params: {
  motorcycles: Motorcycle[];
  searchQuery: string;
}): Motorcycle[] {
  const normalizedSearchQuery = params.searchQuery.trim().toLowerCase();

  if (!normalizedSearchQuery) {
    return params.motorcycles;
  }

  return params.motorcycles.filter((motorcycle) => {
    const searchableText = [
      motorcycle.brand,
      motorcycle.model,
      motorcycle.variant,
      motorcycle.color,
      motorcycle.nickname,
      motorcycle.description,
      motorcycle.status,
      motorcycle.visibility,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedSearchQuery);
  });
}

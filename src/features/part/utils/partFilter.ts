import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";

export function getPartFilterCategories(parts: Part[]): string[] {
  const categorySet = new Set<string>();

  parts.forEach((part) => {
    if (part.category) {
      categorySet.add(part.category);
    }
  });

  return [PART_COPY.FILTER_ALL, ...Array.from(categorySet)];
}

export function filterParts(params: {
  parts: Part[];
  selectedCategory: string;
  searchQuery: string;
}): Part[] {
  const normalizedSearchQuery = params.searchQuery.trim().toLowerCase();

  return params.parts.filter((part) => {
    const matchesCategory =
      params.selectedCategory === PART_COPY.FILTER_ALL ||
      part.category === params.selectedCategory;

    const searchableText = [
      part.category,
      part.brand,
      part.product_name,
      part.custom_brand,
      part.custom_product_name,
      part.workshop,
      part.location,
      part.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !normalizedSearchQuery || searchableText.includes(normalizedSearchQuery);

    return matchesCategory && matchesSearch;
  });
}

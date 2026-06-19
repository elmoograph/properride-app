import type { Part } from "@/src/features/part/types/part.types";

export type PartCategoryGroup = {
  category: string;
  parts: Part[];
};

export type PartSummary = {
  totalParts: number;
  totalCost: number;
  totalCategories: number;
};

export function calculatePartSummary(parts: Part[]): PartSummary {
  const categorySet = new Set<string>();

  const totalCost = parts.reduce((total, part) => {
    const price = part.price ?? 0;

    if (part.category) {
      categorySet.add(part.category);
    }

    return total + price;
  }, 0);

  return {
    totalParts: parts.length,
    totalCost,
    totalCategories: categorySet.size,
  };
}

export function groupPartsByCategory(parts: Part[]): PartCategoryGroup[] {
  const groupMap = new Map<string, Part[]>();

  parts.forEach((part) => {
    const currentParts = groupMap.get(part.category) ?? [];

    groupMap.set(part.category, [...currentParts, part]);
  });

  return Array.from(groupMap.entries()).map(([category, groupedParts]) => ({
    category,
    parts: groupedParts,
  }));
}

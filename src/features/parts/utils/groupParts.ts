import { MotorcyclePart } from "../types/part.types";

export function groupPartsByCategory(parts: MotorcyclePart[]) {
  const grouped: Record<string, MotorcyclePart[]> = {};

  parts.forEach((part) => {
    if (!grouped[part.category]) {
      grouped[part.category] = [];
    }

    grouped[part.category].push(part);
  });

  return Object.entries(grouped).map(([category, items]) => ({
    title: category,
    items,
  }));
}

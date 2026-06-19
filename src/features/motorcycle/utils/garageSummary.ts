import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import type { Part } from "@/src/features/part/types/part.types";

export type GarageSummary = {
  totalMotorcycles: number;
  totalParts: number;
  estimatedBuildCost: number;
};

export function calculateGarageSummary(params: {
  motorcycles: Motorcycle[];
  parts: Part[];
}): GarageSummary {
  const estimatedBuildCost = params.parts.reduce((total, part) => {
    return total + (part.price ?? 0);
  }, 0);

  return {
    totalMotorcycles: params.motorcycles.length,
    totalParts: params.parts.length,
    estimatedBuildCost,
  };
}

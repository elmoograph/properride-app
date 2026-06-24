import type { Part } from "@/src/features/part/types/part.types";

export type MotorcycleDetailSummary = {
  totalParts: number;
  totalGalleryPhotos: number;
  estimatedBuildCost: number;
};

export function calculateMotorcycleDetailSummary(params: {
  parts: Part[];
  galleryMediaCount: number;
}): MotorcycleDetailSummary {
  const estimatedBuildCost = params.parts.reduce((total, part) => {
    return total + (part.price ?? 0);
  }, 0);

  return {
    totalParts: params.parts.length,
    totalGalleryPhotos: params.galleryMediaCount,
    estimatedBuildCost,
  };
}

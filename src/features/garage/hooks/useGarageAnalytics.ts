import { useParts } from "@/features/parts/hooks/useParts";
import { useTimeline } from "@/features/timeline/hooks/useTimeline";
import { useGallery } from "@/features/gallery/hooks/useGallery";

export function useGarageAnalytics() {
  const { totalParts, totalCost } = useParts();

  const { events } = useTimeline();

  const { images } = useGallery();

  return {
    totalCost,
    totalParts,
    totalEvents: events.length,
    totalPhotos: images.length,
  };
}

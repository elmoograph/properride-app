import { useEffect, useState } from "react";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";

import { getGallery } from "../repositories/gallery.repository";

import { GalleryImage } from "../types/gallery.types";

export function useGallery() {
  const { featuredMotorcycle } = useMotorcycles();

  const [images, setImages] = useState<GalleryImage[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, [featuredMotorcycle?.id]);

  async function loadGallery() {
    if (!featuredMotorcycle?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const data = await getGallery(featuredMotorcycle.id);

    setImages(data);

    setLoading(false);
  }

  return {
    images,
    loading,
    refreshGallery: loadGallery,
  };
}

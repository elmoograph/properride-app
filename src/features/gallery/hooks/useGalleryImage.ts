import { useEffect, useState } from "react";

import { getGalleryImage } from "../repositories/gallery.repository";

export function useGalleryImage(galleryId: string) {
  const [image, setImage] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImage();
  }, [galleryId]);

  async function loadImage() {
    const data = await getGalleryImage(galleryId);

    setImage(data);

    setLoading(false);
  }

  return {
    image,
    loading,
  };
}

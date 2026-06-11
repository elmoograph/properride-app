import { supabase } from "@/services/supabase/client";

export async function getGallery(motorcycleId: string) {
  const { data, error } = await supabase
    .from("motorcycle_gallery")
    .select("*")
    .eq("motorcycle_id", motorcycleId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function createGalleryImage(data: {
  motorcycleId: string;
  imageUrl: string;
  caption?: string;
}) {
  const { error } = await supabase.from("motorcycle_gallery").insert({
    motorcycle_id: data.motorcycleId,
    image_url: data.imageUrl,
    caption: data.caption,
  });

  if (error) {
    throw error;
  }
}

export async function getGalleryImage(galleryId: string) {
  const { data, error } = await supabase
    .from("motorcycle_gallery")
    .select("*")
    .eq("id", galleryId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteGalleryImage(galleryId: string) {
  const { error } = await supabase
    .from("motorcycle_gallery")
    .delete()
    .eq("id", galleryId);

  if (error) {
    throw error;
  }
}

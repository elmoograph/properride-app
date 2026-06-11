import { supabase } from "@/services/supabase/client";

export async function uploadGalleryImage(motorcycleId: string, uri: string) {
  console.log("UPLOAD START");

  const response = await fetch(uri);

  console.log("FETCH OK");

  const arrayBuffer = await response.arrayBuffer();

  console.log("ARRAYBUFFER OK");

  const filePath = `${motorcycleId}-${Date.now()}.jpg`;

  const { error } = await supabase.storage
    .from("gallery")
    .upload(filePath, arrayBuffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  console.log("UPLOAD RESULT", {
    error,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("gallery").getPublicUrl(filePath);

  return data.publicUrl;
}

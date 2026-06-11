import { supabase } from "@/services/supabase/client";

export async function uploadMotorcycleImage(motorcycleId: string, uri: string) {
  const response = await fetch(uri);

  const arrayBuffer = await response.arrayBuffer();

  const filePath = `${motorcycleId}-${Date.now()}.jpg`;

  const { error } = await supabase.storage
    .from("motorcycles")
    .upload(filePath, arrayBuffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) {
    console.log("STORAGE ERROR", error);
    throw error;
  }

  const { data } = supabase.storage.from("motorcycles").getPublicUrl(filePath);

  return data.publicUrl;
}

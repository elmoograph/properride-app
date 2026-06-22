import { supabase } from "@/src/lib/supabase";
import { MOTORCYCLE_IMAGE_TABLE } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import type {
  CreateMotorcycleImagePayload,
  MotorcycleImage,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";

export async function getMotorcycleImages(
  motorcycleId: string,
): Promise<MotorcycleImage[]> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_IMAGE_TABLE)
    .select("*")
    .eq("motorcycle_id", motorcycleId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
export async function getMotorcycleImagesByUserId(userId: string) {
  const { data, error } = await supabase
    .from(MOTORCYCLE_IMAGE_TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createMotorcycleImage(
  payload: CreateMotorcycleImagePayload,
): Promise<MotorcycleImage> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_IMAGE_TABLE)
    .insert({
      motorcycle_id: payload.motorcycle_id,
      user_id: payload.user_id,
      image_url: payload.image_url,
      image_path: payload.image_path ?? null,
      caption: payload.caption ?? null,
      is_hero: payload.is_hero ?? false,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteMotorcycleImage(imageId: string): Promise<void> {
  const { error } = await supabase
    .from(MOTORCYCLE_IMAGE_TABLE)
    .delete()
    .eq("id", imageId);

  if (error) {
    throw new Error(error.message);
  }
}

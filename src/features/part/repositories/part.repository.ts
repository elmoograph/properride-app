import { supabase } from "@/src/lib/supabase";
import { PART_TABLE } from "@/src/features/part/constants/part.constants";
import type {
  CreatePartPayload,
  Part,
} from "@/src/features/part/types/part.types";

export async function getPartsByMotorcycleId(
  motorcycleId: string,
): Promise<Part[]> {
  const { data, error } = await supabase
    .from(PART_TABLE)
    .select("*")
    .eq("motorcycle_id", motorcycleId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getPartsByUserId(userId: string): Promise<Part[]> {
  const { data, error } = await supabase
    .from(PART_TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getPartById(partId: string): Promise<Part | null> {
  const { data, error } = await supabase
    .from(PART_TABLE)
    .select("*")
    .eq("id", partId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createPart(payload: CreatePartPayload): Promise<Part> {
  const { data, error } = await supabase
    .from(PART_TABLE)
    .insert({
      motorcycle_id: payload.motorcycle_id,
      user_id: payload.user_id,

      category: payload.category,
      brand: payload.brand ?? null,
      product_name: payload.product_name ?? null,
      custom_brand: payload.custom_brand ?? null,
      custom_product_name: payload.custom_product_name ?? null,

      price: payload.price ?? null,
      purchase_date: payload.purchase_date ?? null,
      install_date: payload.install_date ?? null,

      description: payload.description ?? null,
      rating: payload.rating ?? null,
      location: payload.location ?? null,
      workshop: payload.workshop ?? null,

      main_image_url: payload.main_image_url ?? null,
      main_image_path: payload.main_image_path ?? null,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updatePart(
  partId: string,
  payload: Partial<CreatePartPayload>,
): Promise<Part> {
  const { data, error } = await supabase
    .from(PART_TABLE)
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", partId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deletePart(partId: string): Promise<void> {
  const { error } = await supabase.from(PART_TABLE).delete().eq("id", partId);

  if (error) {
    throw new Error(error.message);
  }
}

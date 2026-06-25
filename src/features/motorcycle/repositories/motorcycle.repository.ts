import { supabase } from "@/src/lib/supabase";
import {
  MOTORCYCLE_STATUS,
  MOTORCYCLE_TABLE,
  MOTORCYCLE_VISIBILITY,
} from "@/src/features/motorcycle/constants/motorcycle.constants";
import type {
  CreateMotorcyclePayload,
  Motorcycle,
} from "@/src/features/motorcycle/types/motorcycle.types";

export async function getMyMotorcycles(userId: string): Promise<Motorcycle[]> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getMotorcycleById(
  motorcycleId: string,
): Promise<Motorcycle | null> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_TABLE)
    .select("*")
    .eq("id", motorcycleId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createMotorcycle(
  payload: CreateMotorcyclePayload,
): Promise<Motorcycle> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_TABLE)
    .insert({
      user_id: payload.user_id,

      brand: payload.brand,
      model: payload.model,
      variant: payload.variant ?? null,
      year: payload.year ?? null,
      color: payload.color ?? null,
      engine_cc: payload.engine_cc ?? null,
      nickname: payload.nickname ?? null,
      plate_number: payload.plate_number ?? null,
      purchase_date: payload.purchase_date ?? null,
      mileage: payload.mileage ?? 0,
      description: payload.description ?? null,
      hero_image_url: payload.hero_image_url ?? null,

      visibility: payload.visibility ?? "public",
      status: payload.status ?? "in_progress",
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateMotorcycle(
  motorcycleId: string,
  payload: Partial<CreateMotorcyclePayload>,
): Promise<Motorcycle> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_TABLE)
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", motorcycleId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteMotorcycle(motorcycleId: string): Promise<void> {
  const { error } = await supabase
    .from(MOTORCYCLE_TABLE)
    .delete()
    .eq("id", motorcycleId);

  if (error) {
    throw new Error(error.message);
  }
}
export async function getMotorcyclesByUserId(
  userId: string,
): Promise<Motorcycle[]> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getPublicMotorcyclesByUserId(
  userId: string,
): Promise<Motorcycle[]> {
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("user_id", userId)
    .eq("visibility", "public")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

import { supabase } from "@/src/lib/supabase";

import type {
  CreateProfilePayload,
  Profile,
} from "@/src/features/profile/types/profile.types";

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createProfile(
  payload: CreateProfilePayload,
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: payload.id,
        username: payload.username.trim().toLowerCase(),
        full_name: payload.full_name.trim(),
        bio: payload.bio ?? null,
        location: payload.location ?? null,
        is_completed: true,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      },
    )
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProfile(
  userId: string,
  payload: Partial<CreateProfilePayload>,
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

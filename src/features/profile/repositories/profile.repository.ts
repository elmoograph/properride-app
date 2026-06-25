import { supabase } from "@/src/lib/supabase";

import type {
  CreateProfilePayload,
  Profile,
  UpdateProfilePayload,
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

export async function isUsernameAvailable(
  username: string,
  excludedUserId?: string,
): Promise<boolean> {
  const normalizedUsername = username.trim().toLowerCase();

  let query = supabase
    .from("profiles")
    .select("id")
    .eq("username", normalizedUsername);

  if (excludedUserId) {
    query = query.neq("id", excludedUserId);
  }

  const { data, error } = await query.limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data.length === 0;
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
        bio: normalizeOptionalText(payload.bio) ?? null,
        location: normalizeOptionalText(payload.location) ?? null,
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
  payload: UpdateProfilePayload,
): Promise<Profile> {
  const normalizedPayload: UpdateProfilePayload = {
    ...payload,
    username:
      payload.username === undefined
        ? undefined
        : (normalizeOptionalText(payload.username)?.toLowerCase() ?? null),
    full_name: normalizeOptionalText(payload.full_name),
    bio: normalizeOptionalText(payload.bio),
    location: normalizeOptionalText(payload.location),
    website: normalizeOptionalText(payload.website),
    instagram: normalizeOptionalText(payload.instagram),
  };

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...normalizedPayload,
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

function normalizeOptionalText(
  value: string | null | undefined,
): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : null;
}

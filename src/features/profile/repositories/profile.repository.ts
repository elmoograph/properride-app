import { supabase } from "@/services/supabase/client";

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) {
    throw error;
  }

  return data;
}

export async function createProfile(data: {
  id: string;
  email: string;
  username: string;
  displayName: string;
  location?: string;
  bio?: string;
}) {
  const { error } = await supabase.from("profiles").insert({
    id: data.id,
    email: data.email,
    username: data.username,
    display_name: data.displayName,
    location: data.location,
    bio: data.bio,
  });

  if (error) {
    throw error;
  }
}

export async function updateProfile(
  userId: string,
  payload: Record<string, any>,
) {
  const { error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId);

  if (error) {
    throw error;
  }
}

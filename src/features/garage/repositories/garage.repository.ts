import { supabase } from "@/services/supabase/client";

export async function createGarage(data: {
  ownerId: string;
  name: string;
  location?: string;
  bio?: string;
}) {
  const { error } = await supabase.from("garages").insert({
    owner_id: data.ownerId,
    name: data.name,
    location: data.location,
  });

  if (error) {
    throw error;
  }
}

export async function getGarage(ownerId: string) {
  const { data, error } = await supabase
    .from("garages")
    .select("*")
    .eq("owner_id", ownerId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

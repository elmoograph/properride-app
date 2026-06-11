import { supabase } from "@/services/supabase/client";

export async function createPart(data: {
  motorcycleId: string;
  category: string;
  name: string;
  brand?: string;
  price?: number;
  notes?: string;
}) {
  const { error } = await supabase.from("motorcycle_parts").insert({
    motorcycle_id: data.motorcycleId,
    category: data.category,
    name: data.name,
    brand: data.brand,
    price: data.price ?? 0,
    notes: data.notes,
  });

  if (error) {
    throw error;
  }
}

export async function getParts(motorcycleId: string) {
  const { data, error } = await supabase
    .from("motorcycle_parts")
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

export async function updatePart(
  partId: string,
  data: {
    category: string;
    name: string;
    brand?: string;
    price?: number;
  },
) {
  const { error } = await supabase
    .from("motorcycle_parts")
    .update({
      category: data.category,
      name: data.name,
      brand: data.brand,
      price: data.price,
    })
    .eq("id", partId);

  if (error) {
    throw error;
  }
}

export async function deletePart(partId: string) {
  const { error } = await supabase
    .from("motorcycle_parts")
    .delete()
    .eq("id", partId);

  if (error) {
    throw error;
  }
}

export async function getPart(partId: string) {
  const { data, error } = await supabase
    .from("motorcycle_parts")
    .select("*")
    .eq("id", partId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

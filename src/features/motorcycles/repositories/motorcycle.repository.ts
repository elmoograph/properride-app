import { supabase } from "@/services/supabase/client";

export async function createMotorcycle(data: {
  garageId: string;
  name: string;
  nickname?: string;
  brand: string;
  model: string;
  year?: number;
}) {
  const isFirstMotorcycle = !(await hasMotorcycle(data.garageId));

  const { error } = await supabase.from("motorcycles").insert({
    garage_id: data.garageId,
    name: data.name,
    nickname: data.nickname,
    brand: data.brand,
    model: data.model,
    year: data.year,

    is_featured: isFirstMotorcycle,
  });

  if (error) {
    throw error;
  }
}

export async function getMotorcycles(garageId: string) {
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("garage_id", garageId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFeaturedMotorcycle(garageId: string) {
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("garage_id", garageId)
    .eq("is_featured", true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function hasMotorcycle(garageId: string) {
  const { count, error } = await supabase
    .from("motorcycles")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("garage_id", garageId);

  if (error) {
    throw error;
  }

  return (count ?? 0) > 0;
}

export async function updateMotorcycleImage(
  motorcycleId: string,
  imageUrl: string,
) {
  const { error } = await supabase
    .from("motorcycles")
    .update({
      image_url: imageUrl,
    })
    .eq("id", motorcycleId);

  if (error) {
    throw error;
  }
}

export async function setFeaturedMotorcycle(
  garageId: string,
  motorcycleId: string,
) {
  const { error: resetError } = await supabase
    .from("motorcycles")
    .update({
      is_featured: false,
    })
    .eq("garage_id", garageId);

  if (resetError) {
    throw resetError;
  }

  const { error } = await supabase
    .from("motorcycles")
    .update({
      is_featured: true,
    })
    .eq("id", motorcycleId);

  if (error) {
    throw error;
  }
}

export async function getMotorcycle(motorcycleId: string) {
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("id", motorcycleId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateMotorcycle(
  motorcycleId: string,
  data: {
    name: string;
    nickname?: string;
    brand: string;
    model: string;
    year?: number;
  },
) {
  const { error } = await supabase
    .from("motorcycles")
    .update({
      name: data.name,
      nickname: data.nickname,
      brand: data.brand,
      model: data.model,
      year: data.year,
    })
    .eq("id", motorcycleId);

  if (error) {
    throw error;
  }
}

export async function deleteMotorcycle(motorcycleId: string) {
  const { error } = await supabase
    .from("motorcycles")
    .delete()
    .eq("id", motorcycleId);

  if (error) {
    throw error;
  }
}

export async function deleteMotorcycleSafe(
  garageId: string,
  motorcycleId: string,
) {
  // CEK JUMLAH MOTOR DULU
  const motorcycles = await getMotorcycles(garageId);

  if (motorcycles.length <= 1) {
    throw new Error("At least one motorcycle is required");
  }

  const motorcycle = await getMotorcycle(motorcycleId);

  if (motorcycle.is_featured) {
    const { data: others, error } = await supabase
      .from("motorcycles")
      .select("*")
      .eq("garage_id", garageId)
      .neq("id", motorcycleId)
      .limit(1);

    if (error) throw error;

    if (others && others.length > 0) {
      await setFeaturedMotorcycle(garageId, others[0].id);
    }
  }

  const { error } = await supabase
    .from("motorcycles")
    .delete()
    .eq("id", motorcycleId);

  if (error) throw error;
}

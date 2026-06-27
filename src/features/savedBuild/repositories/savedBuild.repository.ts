import { supabase } from "@/src/lib/supabase";
import { SAVED_BUILDS_TABLE } from "@/src/features/savedBuild/constants/savedBuild.constants";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";

type SaveBuildParams = {
  userId: string;
  motorcycleId: string;
};

export async function getSavedBuildIds(
  userId: string,
  motorcycleIds: string[],
): Promise<Set<string>> {
  if (motorcycleIds.length === 0) {
    return new Set();
  }

  const { data, error } = await supabase
    .from(SAVED_BUILDS_TABLE)
    .select("motorcycle_id")
    .eq("user_id", userId)
    .in("motorcycle_id", motorcycleIds);

  if (error) {
    throw new Error(error.message);
  }

  return new Set((data ?? []).map((item) => item.motorcycle_id));
}
export async function getSavedBuilds(userId: string): Promise<FeedBuild[]> {
  const { data, error } = await supabase
    .from(SAVED_BUILDS_TABLE)
    .select(
      `
      motorcycle:feed_builds (
        id,
        user_id,
        brand,
        model,
        variant,
        year,
        color,
        engine_cc,
        nickname,
        description,
        hero_image_url,
        visibility,
        status,
        created_at,
        updated_at,
        owner_username,
        owner_full_name,
        owner_avatar_url,
        part_count,
        gallery_post_count,
        gallery_media_count
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).flatMap((item) => {
    const motorcycle = item.motorcycle;

    if (!motorcycle) {
      return [];
    }

    return Array.isArray(motorcycle) ? motorcycle : [motorcycle];
  }) as FeedBuild[];
}

export async function saveBuild({
  userId,
  motorcycleId,
}: SaveBuildParams): Promise<void> {
  const { error } = await supabase.from(SAVED_BUILDS_TABLE).insert({
    user_id: userId,
    motorcycle_id: motorcycleId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function unsaveBuild({
  userId,
  motorcycleId,
}: SaveBuildParams): Promise<void> {
  const { error } = await supabase
    .from(SAVED_BUILDS_TABLE)
    .delete()
    .eq("user_id", userId)
    .eq("motorcycle_id", motorcycleId);

  if (error) {
    throw new Error(error.message);
  }
}

export function getSavedBuildErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    console.error("Saved build error:", error.message);
  }

  return "Status simpan Build tidak dapat diperbarui.";
}

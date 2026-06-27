import { supabase } from "@/src/lib/supabase";
import { BUILD_LIKES_TABLE } from "@/src/features/buildLike/constants/buildLike.constants";

type BuildLikeParams = {
  userId: string;
  motorcycleId: string;
};

export async function getLikedBuildIds(
  userId: string,
  motorcycleIds: string[],
): Promise<Set<string>> {
  if (motorcycleIds.length === 0) {
    return new Set();
  }

  const { data, error } = await supabase
    .from(BUILD_LIKES_TABLE)
    .select("motorcycle_id")
    .eq("user_id", userId)
    .in("motorcycle_id", motorcycleIds);

  if (error) {
    throw new Error(error.message);
  }

  return new Set((data ?? []).map((item) => item.motorcycle_id));
}

export async function likeBuild({
  userId,
  motorcycleId,
}: BuildLikeParams): Promise<void> {
  const { error } = await supabase.from(BUILD_LIKES_TABLE).insert({
    user_id: userId,
    motorcycle_id: motorcycleId,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function unlikeBuild({
  userId,
  motorcycleId,
}: BuildLikeParams): Promise<void> {
  const { error } = await supabase
    .from(BUILD_LIKES_TABLE)
    .delete()
    .eq("user_id", userId)
    .eq("motorcycle_id", motorcycleId);

  if (error) {
    throw new Error(error.message);
  }
}

export function getBuildLikeErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    console.error("Build like error:", error.message);
  }

  return "Status Like Build tidak dapat diperbarui.";
}

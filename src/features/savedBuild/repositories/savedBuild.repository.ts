import { supabase } from "@/src/lib/supabase";
import { SAVED_BUILDS_TABLE } from "@/src/features/savedBuild/constants/savedBuild.constants";

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

import {
  CONTENT_REPORTS_TABLE,
  SAFETY_COPY,
  USER_BLOCKS_TABLE,
} from "@/src/features/safety/constants/safety.constants";
import type {
  BlockUserParams,
  CreateContentReportParams,
  UnblockUserParams,
  UserBlock,
} from "@/src/features/safety/types/safety.types";
import { supabase } from "@/src/lib/supabase";

export async function createContentReport({
  reporterId,
  reportedUserId = null,
  motorcycleId = null,
  partId = null,
  galleryPostId = null,
  reason,
  details = null,
}: CreateContentReportParams): Promise<void> {
  const normalizedDetails = details?.trim() || null;

  const { error } = await supabase.from(CONTENT_REPORTS_TABLE).insert({
    reporter_id: reporterId,
    reported_user_id: reportedUserId,
    motorcycle_id: motorcycleId,
    part_id: partId,
    gallery_post_id: galleryPostId,
    reason,
    details: normalizedDetails,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function blockUser({
  blockerId,
  blockedId,
}: BlockUserParams): Promise<void> {
  if (blockerId === blockedId) {
    return;
  }

  const { error } = await supabase.from(USER_BLOCKS_TABLE).upsert(
    {
      blocker_id: blockerId,
      blocked_id: blockedId,
    },
    {
      onConflict: "blocker_id,blocked_id",
      ignoreDuplicates: true,
    },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function unblockUser({
  blockerId,
  blockedId,
}: UnblockUserParams): Promise<void> {
  const { error } = await supabase
    .from(USER_BLOCKS_TABLE)
    .delete()
    .eq("blocker_id", blockerId)
    .eq("blocked_id", blockedId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getBlockedUserIds(userId: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from(USER_BLOCKS_TABLE)
    .select("blocked_id")
    .eq("blocker_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as Pick<UserBlock, "blocked_id">[];

  return new Set(rows.map((row) => row.blocked_id));
}

export async function isUserBlocked({
  blockerId,
  blockedId,
}: BlockUserParams): Promise<boolean> {
  if (blockerId === blockedId) {
    return false;
  }

  const { data, error } = await supabase
    .from(USER_BLOCKS_TABLE)
    .select("id")
    .eq("blocker_id", blockerId)
    .eq("blocked_id", blockedId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

export function filterBlockedUsers<T extends { user_id: string }>(
  items: T[],
  blockedUserIds: Set<string>,
): T[] {
  if (blockedUserIds.size === 0) {
    return items;
  }

  return items.filter((item) => !blockedUserIds.has(item.user_id));
}

export function filterBlockedProfiles<T extends { id: string }>(
  profiles: T[],
  blockedUserIds: Set<string>,
): T[] {
  if (blockedUserIds.size === 0) {
    return profiles;
  }

  return profiles.filter((profile) => !blockedUserIds.has(profile.id));
}

export function getSafetyErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    console.error("Safety error:", error.message);
  }

  return SAFETY_COPY.REPORT_FAILED_MESSAGE;
}

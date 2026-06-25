import { supabase } from "@/src/lib/supabase";

import type {
  Follow,
  FollowStats,
  FollowProfile,
} from "@/src/features/profile/types/follow.types";

export async function getFollowStats(userId: string): Promise<FollowStats> {
  const [followersResult, followingResult] = await Promise.all([
    supabase
      .from("follows")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("following_id", userId),

    supabase
      .from("follows")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("follower_id", userId),
  ]);

  if (followersResult.error) {
    throw new Error(followersResult.error.message);
  }

  if (followingResult.error) {
    throw new Error(followingResult.error.message);
  }

  return {
    followerCount: followersResult.count ?? 0,
    followingCount: followingResult.count ?? 0,
  };
}

export async function getIsFollowing(params: {
  followerId: string;
  followingId: string;
}): Promise<boolean> {
  const { data, error } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("follower_id", params.followerId)
    .eq("following_id", params.followingId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

export async function followUser(params: {
  followerId: string;
  followingId: string;
}): Promise<Follow> {
  if (params.followerId === params.followingId) {
    throw new Error("Anda tidak dapat mengikuti akun sendiri.");
  }

  const { data, error } = await supabase
    .from("follows")
    .insert({
      follower_id: params.followerId,
      following_id: params.followingId,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function unfollowUser(params: {
  followerId: string;
  followingId: string;
}): Promise<void> {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", params.followerId)
    .eq("following_id", params.followingId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getFollowerProfiles(
  userId: string,
): Promise<FollowProfile[]> {
  const { data, error } = await supabase
    .from("follows")
    .select(
      `
      follower:profiles!follows_follower_id_fkey (
        id,
        username,
        full_name,
        avatar_url,
        bio,
        location
      )
    `,
    )
    .eq("following_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).flatMap((item) => {
    const follower = item.follower;

    if (!follower) {
      return [];
    }

    return Array.isArray(follower) ? follower : [follower];
  });
}
export async function getFollowingProfiles(
  userId: string,
): Promise<FollowProfile[]> {
  const { data, error } = await supabase
    .from("follows")
    .select(
      `
      following:profiles!follows_following_id_fkey (
        id,
        username,
        full_name,
        avatar_url,
        bio,
        location
      )
    `,
    )
    .eq("follower_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).flatMap((item) => {
    const following = item.following;

    if (!following) {
      return [];
    }

    return Array.isArray(following) ? following : [following];
  });
}
export async function getFollowingUserIds(
  viewerUserId: string,
  targetUserIds: string[],
): Promise<Set<string>> {
  if (targetUserIds.length === 0) {
    return new Set();
  }

  const { data, error } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", viewerUserId)
    .in("following_id", targetUserIds);

  if (error) {
    throw new Error(error.message);
  }

  return new Set((data ?? []).map((item) => item.following_id));
}

export function getFollowErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Aksi tidak dapat diproses. Silakan coba kembali.";
  }

  const message = error.message.toLowerCase();

  if (message.includes("duplicate key") || message.includes("follows_pkey")) {
    return "Anda sudah mengikuti rider ini.";
  }

  if (
    message.includes("follows_cannot_follow_self") ||
    message.includes("check constraint")
  ) {
    return "Anda tidak dapat mengikuti akun sendiri.";
  }

  if (
    message.includes("row-level security") ||
    message.includes("permission denied") ||
    message.includes("unauthorized")
  ) {
    return "Aksi tidak dapat dilakukan karena izin akun tidak sesuai.";
  }

  if (
    message.includes("network") ||
    message.includes("fetch") ||
    message.includes("timeout")
  ) {
    return "Koneksi bermasalah. Periksa internet Anda lalu coba kembali.";
  }

  return "Aksi tidak dapat diproses. Silakan coba kembali.";
}

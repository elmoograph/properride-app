export type Follow = {
  follower_id: string;
  following_id: string;
  created_at: string;
};

export type FollowStats = {
  followerCount: number;
  followingCount: number;
};

export type FollowState = {
  isFollowing: boolean;
  followerCount: number;
  followingCount: number;
};

export type FollowProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
};

export type FollowProfileItem = {
  profile: FollowProfile;
  isFollowing: boolean;
};

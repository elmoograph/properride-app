import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import type { Profile } from "@/src/features/profile/types/profile.types";

export type SearchTabKey = "builds" | "riders";

export type SearchProfileResult = Pick<
  Profile,
  "id" | "username" | "full_name" | "avatar_url" | "bio" | "location"
>;

export type SearchResults = {
  builds: FeedBuild[];
  profiles: SearchProfileResult[];
};

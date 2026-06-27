import { SEARCH_LIMIT } from "@/src/features/search/constants/search.constants";
import type {
  SearchProfileResult,
  SearchResults,
} from "@/src/features/search/types/search.types";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import { supabase } from "@/src/lib/supabase";

function normalizeSearchQuery(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

function toIlikePattern(query: string): string {
  return `%${query}%`;
}

export async function searchBuilds(
  query: string,
  limit = SEARCH_LIMIT,
): Promise<FeedBuild[]> {
  const normalizedQuery = normalizeSearchQuery(query);

  if (normalizedQuery.length < 2) {
    return [];
  }

  const pattern = toIlikePattern(normalizedQuery);

  const { data, error } = await supabase
    .from("feed_builds")
    .select("*")
    .or(
      [
        `brand.ilike.${pattern}`,
        `model.ilike.${pattern}`,
        `variant.ilike.${pattern}`,
        `nickname.ilike.${pattern}`,
        `description.ilike.${pattern}`,
        `owner_username.ilike.${pattern}`,
        `owner_full_name.ilike.${pattern}`,
      ].join(","),
    )
    .order("created_at", {
      ascending: false,
      nullsFirst: false,
    })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as FeedBuild[];
}

export async function searchProfiles(
  query: string,
  limit = SEARCH_LIMIT,
): Promise<SearchProfileResult[]> {
  const normalizedQuery = normalizeSearchQuery(query);

  if (normalizedQuery.length < 2) {
    return [];
  }

  const pattern = toIlikePattern(normalizedQuery);

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, bio, location")
    .or(
      [
        `username.ilike.${pattern}`,
        `full_name.ilike.${pattern}`,
        `bio.ilike.${pattern}`,
        `location.ilike.${pattern}`,
      ].join(","),
    )
    .order("updated_at", {
      ascending: false,
      nullsFirst: false,
    })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SearchProfileResult[];
}

export async function searchProperRide(query: string): Promise<SearchResults> {
  const normalizedQuery = normalizeSearchQuery(query);

  if (normalizedQuery.length < 2) {
    return {
      builds: [],
      profiles: [],
    };
  }

  const [builds, profiles] = await Promise.all([
    searchBuilds(normalizedQuery),
    searchProfiles(normalizedQuery),
  ]);

  return {
    builds,
    profiles,
  };
}

export function getSearchErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    console.error("Search error:", error.message);
  }

  return "Search tidak dapat dimuat. Silakan coba kembali.";
}

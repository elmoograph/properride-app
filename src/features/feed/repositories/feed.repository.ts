import { supabase } from "@/src/lib/supabase";
import {
  FEED_PAGE_SIZE,
  FEED_VIEW,
} from "@/src/features/feed/constants/feed.constants";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";

type GetFeedBuildsParams = {
  page?: number;
  pageSize?: number;
};

export async function getFeedBuilds({
  page = 0,
  pageSize = FEED_PAGE_SIZE,
}: GetFeedBuildsParams = {}): Promise<FeedBuild[]> {
  const normalizedPage = Math.max(0, page);
  const normalizedPageSize = Math.max(1, pageSize);

  const from = normalizedPage * normalizedPageSize;
  const to = from + normalizedPageSize - 1;

  const { data, error } = await supabase
    .from(FEED_VIEW)
    .select("*")
    .order("created_at", {
      ascending: false,
      nullsFirst: false,
    })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as FeedBuild[];
}

export function getFeedErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    console.error("Feed repository error:", error.message);
  }

  return "Feed tidak dapat dimuat. Periksa koneksi lalu coba kembali.";
}

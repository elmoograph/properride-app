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

export type FeedBuildPage = {
  items: FeedBuild[];
  hasMore: boolean;
  nextPage: number | null;
};

export async function getFeedBuilds({
  page = 0,
  pageSize = FEED_PAGE_SIZE,
}: GetFeedBuildsParams = {}): Promise<FeedBuildPage> {
  const normalizedPage = Math.max(0, page);
  const normalizedPageSize = Math.max(1, pageSize);

  const from = normalizedPage * normalizedPageSize;

  // Ambil satu item tambahan untuk mendeteksi halaman berikutnya.
  const to = from + normalizedPageSize;

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

  const rows = (data ?? []) as FeedBuild[];
  const hasMore = rows.length > normalizedPageSize;

  return {
    items: hasMore ? rows.slice(0, normalizedPageSize) : rows,
    hasMore,
    nextPage: hasMore ? normalizedPage + 1 : null,
  };
}

export function getFeedErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    console.error("Feed repository error:", error.message);
  }

  return "Feed tidak dapat dimuat. Periksa koneksi lalu coba kembali.";
}

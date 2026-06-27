import { supabase } from "@/src/lib/supabase";
import {
  FEED_PAGE_SIZE,
  FEED_VIEW,
} from "@/src/features/feed/constants/feed.constants";
import type {
  FeedBuild,
  FeedFilterKey,
} from "@/src/features/feed/types/feed.types";

type GetFeedBuildsParams = {
  page?: number;
  pageSize?: number;
  filter?: FeedFilterKey;
};

export type FeedBuildPage = {
  items: FeedBuild[];
  hasMore: boolean;
  nextPage: number | null;
};
function getFeedFilterExpression(filter: FeedFilterKey): string | null {
  switch (filter) {
    case "nmax":
      return "model.ilike.%nmax%";

    case "aerox":
      return "model.ilike.%aerox%";

    case "pcx":
      return "model.ilike.%pcx%";

    case "vespa":
      return "brand.ilike.%vespa%,model.ilike.%vespa%";

    case "mt15":
      return [
        "model.ilike.%mt-15%",
        "model.ilike.%mt15%",
        "model.ilike.%mt 15%",
      ].join(",");

    case "all":
    default:
      return null;
  }
}
export async function getFeedBuilds({
  page = 0,
  pageSize = FEED_PAGE_SIZE,
  filter = "all",
}: GetFeedBuildsParams = {}): Promise<FeedBuildPage> {
  const normalizedPage = Math.max(0, page);
  const normalizedPageSize = Math.max(1, pageSize);

  const from = normalizedPage * normalizedPageSize;
  const to = from + normalizedPageSize;

  let query = supabase.from(FEED_VIEW).select("*");

  const filterExpression = getFeedFilterExpression(filter);

  if (filterExpression) {
    query = query.or(filterExpression);
  }

  const { data, error } = await query
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

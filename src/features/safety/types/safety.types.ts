import type { REPORT_REASONS } from "@/src/features/safety/constants/safety.constants";

export type ReportReason = (typeof REPORT_REASONS)[keyof typeof REPORT_REASONS];

export type ContentReportStatus =
  | "pending"
  | "reviewed"
  | "dismissed"
  | "actioned";

export type UserBlock = {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
};

export type ContentReport = {
  id: string;
  reporter_id: string;
  reported_user_id: string | null;
  motorcycle_id: string | null;
  part_id: string | null;
  gallery_post_id: string | null;
  reason: string;
  details: string | null;
  status: ContentReportStatus;
  created_at: string;
  updated_at: string;
};

export type CreateContentReportParams = {
  reporterId: string;
  reportedUserId?: string | null;
  motorcycleId?: string | null;
  partId?: string | null;
  galleryPostId?: string | null;
  reason: ReportReason;
  details?: string | null;
};

export type BlockUserParams = {
  blockerId: string;
  blockedId: string;
};

export type UnblockUserParams = {
  blockerId: string;
  blockedId: string;
};

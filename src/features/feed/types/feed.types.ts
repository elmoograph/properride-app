import type {
  MotorcycleStatus,
  MotorcycleVisibility,
} from "@/src/features/motorcycle/types/motorcycle.types";

export type FeedBuild = {
  id: string;
  user_id: string;

  brand: string;
  model: string;
  variant: string | null;
  year: number | null;
  color: string | null;
  engine_cc: number | null;
  nickname: string | null;
  description: string | null;
  hero_image_url: string | null;

  visibility: MotorcycleVisibility;
  status: MotorcycleStatus;

  created_at: string | null;
  updated_at: string | null;

  owner_username: string | null;
  owner_full_name: string | null;
  owner_avatar_url: string | null;

  part_count: number;
  gallery_post_count: number;
  gallery_media_count: number;
};

export type MotorcycleImage = {
  id: string;
  motorcycle_id: string;
  user_id: string;

  image_url: string;
  image_path: string | null;
  caption: string | null;
  is_hero: boolean;

  created_at: string;
};

export type GalleryVisibility = "public" | "private";

export type GalleryMediaType = "image" | "video";

export type MotorcycleGalleryMedia = {
  id: string;
  post_id: string;

  media_type: GalleryMediaType;

  media_url: string;
  media_path: string;

  thumbnail_url: string | null;
  thumbnail_path: string | null;

  width: number | null;
  height: number | null;
  duration_ms: number | null;

  sort_order: number;
  created_at: string;
};

export type MotorcycleGalleryPost = {
  id: string;
  motorcycle_id: string;
  user_id: string;

  caption: string | null;
  visibility: GalleryVisibility;

  created_at: string;
  updated_at: string;

  media: MotorcycleGalleryMedia[];
};

export type CreateMotorcycleGalleryPostInput = {
  motorcycle_id: string;
  user_id: string;
  caption?: string | null;
  visibility?: GalleryVisibility;
};

export type UpdateMotorcycleGalleryPostInput = {
  caption?: string | null;
  visibility?: GalleryVisibility;
};

export type CreateMotorcycleGalleryMediaInput = {
  post_id: string;

  media_type: GalleryMediaType;

  media_url: string;
  media_path: string;

  thumbnail_url?: string | null;
  thumbnail_path?: string | null;

  width?: number | null;
  height?: number | null;
  duration_ms?: number | null;

  sort_order: number;
};

export type GalleryPostWithMediaRow = Omit<MotorcycleGalleryPost, "media"> & {
  media: MotorcycleGalleryMedia[] | null;
};

export type CreateMotorcycleImagePayload = {
  motorcycle_id: string;
  user_id: string;
  image_url: string;
  image_path?: string | null;
  caption?: string | null;
  is_hero?: boolean;
};

export type PickedGalleryMedia = {
  id: string;
  uri: string;
  mediaType: GalleryMediaType;

  width: number | null;
  height: number | null;
  durationMs: number | null;

  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
};

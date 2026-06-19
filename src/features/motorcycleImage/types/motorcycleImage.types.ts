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

export type CreateMotorcycleImagePayload = {
  motorcycle_id: string;
  user_id: string;
  image_url: string;
  image_path?: string | null;
  caption?: string | null;
  is_hero?: boolean;
};

export type Motorcycle = {
  id: string;
  garage_id: string;

  name: string;
  nickname: string | null;

  brand: string;
  model: string;

  year: number | null;

  image_url: string | null;

  is_featured: boolean;

  created_at: string;
};

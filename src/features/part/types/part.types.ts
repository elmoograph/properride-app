import type { PART_CATEGORIES } from "@/src/features/part/constants/part.constants";

export type PartCategory = (typeof PART_CATEGORIES)[number];

export type Part = {
  id: string;

  motorcycle_id: string;
  user_id: string;

  category: string;
  brand: string | null;
  product_name: string | null;
  custom_brand: string | null;
  custom_product_name: string | null;

  price: number | null;
  purchase_date: string | null;
  install_date: string | null;

  description: string | null;
  rating: number | null;
  location: string | null;
  workshop: string | null;

  main_image_url: string | null;
  main_image_path: string | null;

  created_at: string;
  updated_at: string;
};

export type CreatePartPayload = {
  motorcycle_id: string;
  user_id: string;

  category: string;
  brand?: string | null;
  product_name?: string | null;
  custom_brand?: string | null;
  custom_product_name?: string | null;

  price?: number | null;
  purchase_date?: string | null;
  install_date?: string | null;

  description?: string | null;
  rating?: number | null;
  location?: string | null;
  workshop?: string | null;

  main_image_url?: string | null;
  main_image_path?: string | null;
};

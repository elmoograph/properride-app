import type {
  MOTORCYCLE_STATUS,
  MOTORCYCLE_VISIBILITY,
} from "@/src/features/motorcycle/constants/motorcycle.constants";

export type MotorcycleVisibility =
  (typeof MOTORCYCLE_VISIBILITY)[keyof typeof MOTORCYCLE_VISIBILITY];

export type MotorcycleStatus =
  (typeof MOTORCYCLE_STATUS)[keyof typeof MOTORCYCLE_STATUS];

export type Motorcycle = {
  id: string;
  user_id: string;

  brand: string;
  model: string;
  variant: string | null;
  year: number | null;
  color: string | null;
  engine_cc: number | null;
  nickname: string | null;
  plate_number: string | null;
  purchase_date: string | null;
  mileage: number;
  description: string | null;

  hero_image_url: string | null;
  visibility: MotorcycleVisibility;
  status: MotorcycleStatus;

  created_at: string;
  updated_at: string;
};

export type CreateMotorcyclePayload = {
  user_id: string;
  brand: string;
  model: string;
  variant?: string | null;
  year?: number | null;
  color?: string | null;
  engine_cc?: number | null;
  nickname?: string | null;
  plate_number?: string | null;
  purchase_date?: string | null;
  mileage?: number;
  description?: string | null;
  hero_image_url?: string | null;
  visibility?: MotorcycleVisibility;
  status?: MotorcycleStatus;
};

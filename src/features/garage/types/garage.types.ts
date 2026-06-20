export type GarageTabKey = "setup" | "timeline" | "gallery";

export type GaragePartCategoryKey =
  | "cockpit"
  | "engine"
  | "suspension"
  | "exterior"
  | "brake"
  | "wheel"
  | "cvt"
  | "other";

export type GarageMotorcycle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  nickname?: string;
  imageUrl: string;
  totalBuildCost: number;
  totalParts: number;
};

export type GaragePart = {
  id: string;
  name: string;
  brand: string;
  category: GaragePartCategoryKey;
  categoryLabel: string;
  area: string;
  price?: number;
  imageUrl?: string;
  productUrl?: string;
};

export type GaragePartSection = {
  id: string;
  title: string;
  category: GaragePartCategoryKey;
  parts: GaragePart[];
};

export type GarageSummaryItem = {
  id: string;
  label: string;
  value: string;
  icon: "wallet" | "settings" | "image" | "calendar";
};

export type GarageViewMode = "owner" | "public";

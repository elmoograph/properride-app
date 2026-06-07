import { ImageSourcePropType } from "react-native";

export type ProductCategory =
  | "Windshield"
  | "Bolt"
  | "Footstep"
  | "Brake"
  | "Suspension";

export type VehicleCategory = "NMAX" | "Aerox" | "PCX" | "Vespa" | "MT15";

export type Profile = {
  id: string;

  name: string;

  username: string;

  location: string;

  avatar: string;

  followers: number;

  following: number;

  posts: number;
};

export type Garage = {
  id: string;

  ownerId: string;

  bikeName: string;

  nickname: string;

  brand: string;

  location: string;

  followers: number;

  views: number;

  totalParts: number;

  totalCost: number;
};

export type Post = {
  id: string;

  authorId: string;

  category: VehicleCategory;

  caption: string;

  hashtags: string[];

  likes: number;

  comments: number;

  totalBuildCost: number;

  image: ImageSourcePropType;
};

export type Product = {
  id: string;

  name: string;

  brand: string;

  category: ProductCategory;

  price: number;

  image: ImageSourcePropType;

  description: string;

  affiliateUrl: string;
};

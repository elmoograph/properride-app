import { ImageSourcePropType } from "react-native";

export type ProductCategory =
  | "All"
  | "Windshield"
  | "Bolt"
  | "Footstep"
  | "Brake"
  | "Suspension";

export type Profile = {
  name: string;

  username: string;

  location: string;

  avatar: string;

  stats: {
    followers: string;

    following: string;

    posts: string;
  };
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

import { ImageSourcePropType } from "react-native";

export type FeedPart = {
  id: string;

  name: string;

  price: string;
};

export type FeedPost = {
  id: string;

  username: string;

  handle: string;

  time: string;

  category: Exclude<FeedCategory, "For You">;

  caption: string;

  hashtags: string[];

  likes: string;

  comments: string;

  totalPrice: string;

  image: ImageSourcePropType;

  parts: FeedPart[];
};

export type FeedCategory = "All" | "NMAX" | "Aerox" | "PCX" | "Vespa" | "MT15";

export type FeaturedBuild = {
  id: string;

  title: string;

  owner: string;

  image: ImageSourcePropType;

  totalBuildCost: string;

  category: Exclude<FeedCategory, "For You">;
};

export type TrendingBuild = {
  id: string;

  title: string;

  image: ImageSourcePropType;

  likes: string;

  category: Exclude<FeedCategory, "For You">;
};

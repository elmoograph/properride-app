export type BikeData = {
  name: string;
};

export type UserData = {
  name: string;

  nickname: string;

  username: string;

  location: string;

  followers: string;

  views: string;

  parts: string;
};

export type StatsData = {
  totalCost: string;

  totalParts: string;

  brand: string;
};

export type SetupItem = {
  id: string;

  name: string;

  brand: string;

  price: string;
};

export type SetupSection = {
  title: string;

  items: SetupItem[];
};

export type TimelineItem = {
  id: string;

  title: string;

  date: string;

  price: string;
};

export type GalleryItem = {
  id: string;

  image: any;
};

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

  badge: string;

  category: string;

  caption: string;

  hashtags: string[];

  likes: string;

  comments: string;

  totalPrice: string;

  image: any;

  parts: FeedPart[];
};

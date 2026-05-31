import { FeedPost } from "../types/feed.types";

export const postsData: FeedPost[] = [
  {
    id: "1",

    username: "Rizky Pratama",

    handle: "@rizky_nmax",

    time: "2 jam lalu",

    category: "NMAX",

    caption:
      "Finally done with my NMAX build. Full carbon setup with titanium bolts. Took 3 months but worth it.",

    hashtags: ["#nmax", "#carbonstyle", "#cleanbuild", "#nytrosync"],

    likes: "1,243",

    comments: "89",

    totalPrice: "Rp 1.080.000",

    image: require("../../../../assets/images/feed/feed-1.jpg"),

    parts: [
      {
        id: "1",

        name: "NYTROSYNC Carbon Windshield",

        price: "Rp 450.000",
      },

      {
        id: "2",

        name: "NYTROSYNC CNC Footstep",

        price: "Rp 380.000",
      },

      {
        id: "3",

        name: "NYTROSYNC Bolt Kit Titanium",

        price: "Rp 250.000",
      },
    ],
  },
];

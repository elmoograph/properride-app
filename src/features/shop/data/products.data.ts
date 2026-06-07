import { Product } from "@/types/database";

export const productsData: Product[] = [
  {
    id: "1",

    name: "Carbon Windshield",

    brand: "NitroSync",

    category: "Windshield",

    price: 250000,

    image: require("../../../../assets/images/feed/feed-1.jpg"),

    description: "Premium carbon windshield untuk Yamaha NMAX.",
    affiliateUrl: "https://shopee.co.id",
  },

  {
    id: "2",

    name: "Titanium Bolt Kit",

    brand: "NitroSync",

    category: "Bolt",

    price: 250000,

    image: require("../../../../assets/images/feed/feed-2.jpg"),

    description: "Titanium bolt kit ringan dan tahan korosi.",
    affiliateUrl: "https://shopee.co.id",
  },
];

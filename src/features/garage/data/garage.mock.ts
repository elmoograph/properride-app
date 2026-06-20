import type {
  GarageMotorcycle,
  GaragePartSection,
} from "../types/garage.types";

export const garageMotorcycleMock: GarageMotorcycle = {
  id: "motorcycle-nmax-neo",
  brand: "Yamaha",
  model: "NMAX Neo",
  year: 2020,
  color: "Black Lime",
  nickname: "NMAX Neo",
  imageUrl:
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop",
  totalBuildCost: 1250000,
  totalParts: 150,
};

export const garagePartSectionsMock: GaragePartSection[] = [
  {
    id: "cockpit",
    title: "Cockpit (4)",
    category: "cockpit",
    parts: [
      {
        id: "part-carbon-windshield-1",
        name: "Carbon Windshield Pro",
        brand: "NITROSYNC",
        category: "cockpit",
        categoryLabel: "Cockpit",
        area: "Front Windshield",
        price: 450000,
        imageUrl:
          "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "part-carbon-windshield-2",
        name: "Carbon Windshield Pro",
        brand: "NITROSYNC",
        category: "cockpit",
        categoryLabel: "Cockpit",
        area: "Front Windshield",
        price: 450000,
        imageUrl:
          "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "part-carbon-windshield-3",
        name: "Carbon Windshield Pro",
        brand: "NITROSYNC",
        category: "cockpit",
        categoryLabel: "Cockpit",
        area: "Front Windshield",
        price: 450000,
        imageUrl:
          "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "part-carbon-windshield-4",
        name: "Carbon Windshield Pro",
        brand: "NITROSYNC",
        category: "cockpit",
        categoryLabel: "Cockpit",
        area: "Front Windshield",
        price: 450000,
        imageUrl:
          "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "suspensions",
    title: "Suspensions (1)",
    category: "suspension",
    parts: [
      {
        id: "part-rear-shock-1",
        name: "Rear Shock Absorber Pro",
        brand: "NITROSYNC",
        category: "suspension",
        categoryLabel: "Suspension",
        area: "Rear Suspension",
        price: 450000,
        imageUrl:
          "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
];

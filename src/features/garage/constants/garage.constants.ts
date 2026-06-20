import type { GarageTabKey } from "../types/garage.types";
import { GARAGE_COPY } from "./garage.copy";

export const GARAGE_TABS: {
  key: GarageTabKey;
  label: string;
}[] = [
  {
    key: "setup",
    label: GARAGE_COPY.tabs.setup,
  },
  {
    key: "timeline",
    label: GARAGE_COPY.tabs.timeline,
  },
  {
    key: "gallery",
    label: GARAGE_COPY.tabs.gallery,
  },
];

export const GARAGE_HERO_HEIGHT = 360;

export const GARAGE_PART_PREVIEW_LIMIT = 3;

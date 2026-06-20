import { useMemo, useState } from "react";

import {
  garageMotorcycleMock,
  garagePartSectionsMock,
} from "../data/garage.mock";
import type { GarageSummaryItem, GarageTabKey } from "../types/garage.types";
import { formatBuildCost, formatTotalParts } from "../utils/garage-formatters";
import { GARAGE_COPY } from "../constants/garage.copy";

export function useGarageScreen() {
  const [activeTab, setActiveTab] = useState<GarageTabKey>("setup");

  const motorcycle = garageMotorcycleMock;
  const partSections = garagePartSectionsMock;

  const summaryItems = useMemo<GarageSummaryItem[]>(
    () => [
      {
        id: "total-build-cost",
        label: GARAGE_COPY.summary.totalBuildCost,
        value: formatBuildCost(motorcycle.totalBuildCost),
        icon: "wallet",
      },
      {
        id: "total-parts",
        label: GARAGE_COPY.summary.totalPart,
        value: formatTotalParts(motorcycle.totalParts),
        icon: "settings",
      },
    ],
    [motorcycle.totalBuildCost, motorcycle.totalParts],
  );

  return {
    activeTab,
    setActiveTab,
    motorcycle,
    partSections,
    summaryItems,
  };
}

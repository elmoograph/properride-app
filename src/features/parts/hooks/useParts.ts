import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";

import { getParts } from "../repositories/part.repository";
import { MotorcyclePart } from "../types/part.types";

export function useParts() {
  const { featuredMotorcycle } = useMotorcycles();

  const [parts, setParts] = useState<MotorcyclePart[]>([]);
  const [loading, setLoading] = useState(true);

  const totalParts = parts.length;

  const totalCost = parts.reduce((sum, part) => sum + (part.price ?? 0), 0);

  useFocusEffect(
    React.useCallback(() => {
      loadParts();
    }, [featuredMotorcycle?.id]),
  );

  async function loadParts() {
    if (!featuredMotorcycle?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const data = await getParts(featuredMotorcycle.id);

    setParts(data);

    setLoading(false);
  }

  return {
    parts,
    totalParts,
    totalCost,
    loading,
    refreshParts: loadParts,
  };
}

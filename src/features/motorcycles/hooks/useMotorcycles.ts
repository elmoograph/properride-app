import { useEffect, useState } from "react";

import { useGarage } from "@/features/garage/hooks/useGarage";
import { Motorcycle } from "../types/motorcycle.types";
import { useFocusEffect } from "@react-navigation/native";

import {
  getMotorcycles,
  getFeaturedMotorcycle,
} from "../repositories/motorcycle.repository";
import React from "react";

export function useMotorcycles() {
  const { garage } = useGarage();

  const [motorcycles, setMotorcycles] = useState<any[]>([]);
  const [featuredMotorcycle, setFeaturedMotorcycle] = useState<any>(null);
  const hasMotorcycles = motorcycles.length > 0;

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadMotorcycles();
    }, [garage?.id]),
  );

  async function loadMotorcycles() {
    setLoading(true);
    if (!garage?.id) {
      setLoading(false);
      return;
    }

    const list = await getMotorcycles(garage.id);

    const featured = await getFeaturedMotorcycle(garage.id);

    setMotorcycles(list);
    setFeaturedMotorcycle(featured);

    setLoading(false);
  }

  return {
    motorcycles,
    featuredMotorcycle,
    hasMotorcycles,
    loading,
    refreshMotorcycles: loadMotorcycles,
  };
}

import { useEffect, useState } from "react";

import { getMotorcycle } from "../repositories/motorcycle.repository";
import React from "react";

export function useMotorcycle(motorcycleId: string) {
  const [motorcycle, setMotorcycle] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMotorcycle();
  }, [motorcycleId]);

  async function loadMotorcycle() {
    const data = await getMotorcycle(motorcycleId);

    setMotorcycle(data);

    setLoading(false);
  }

  return {
    motorcycle,
    loading,
    refreshMotorcycle: loadMotorcycle,
  };
}

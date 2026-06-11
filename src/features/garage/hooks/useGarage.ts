import { useEffect, useState } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { getGarage } from "../repositories/garage.repository";

export function useGarage() {
  const { user } = useAuth();

  const [garage, setGarage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    loadGarage();
  }, [user?.id]);

  async function loadGarage() {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const data = await getGarage(user.id);

    setGarage(data);

    setLoading(false);
  }

  return {
    garage,
    loading,
    refreshGarage: loadGarage,
  };
}

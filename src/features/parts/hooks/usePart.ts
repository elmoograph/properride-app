import { useEffect, useState } from "react";

import { getPart } from "../repositories/part.repository";

import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export function usePart(partId: string) {
  const [part, setPart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadPart();
    }, [partId]),
  );

  async function loadPart() {
    const data = await getPart(partId);

    setPart(data);

    setLoading(false);
  }

  return {
    part,
    loading,
    refreshPart: loadPart,
  };
}

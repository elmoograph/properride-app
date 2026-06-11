import { useEffect, useState } from "react";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";

import { getTimelineEvents } from "../repositories/timeline.repository";

import { TimelineEvent } from "../types/timeline.types";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useTimeline() {
  const { featuredMotorcycle } = useMotorcycles();

  const [events, setEvents] = useState<TimelineEvent[]>([]);

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadTimeline();
    }, [featuredMotorcycle?.id]),
  );

  async function loadTimeline() {
    if (!featuredMotorcycle?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const data = await getTimelineEvents(featuredMotorcycle.id);

    setEvents(data);

    setLoading(false);
  }

  return {
    events,
    loading,
    refreshTimeline: loadTimeline,
  };
}

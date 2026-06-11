import { useEffect, useState } from "react";

import { getTimelineEvent } from "../repositories/timeline.repository";

export function useTimelineEvent(timelineId: string) {
  const [event, setEvent] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [timelineId]);

  async function loadEvent() {
    const data = await getTimelineEvent(timelineId);

    setEvent(data);

    setLoading(false);
  }

  return {
    event,
    loading,
    refreshEvent: loadEvent,
  };
}

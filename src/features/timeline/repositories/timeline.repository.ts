import { supabase } from "@/services/supabase/client";

export async function getTimelineEvents(motorcycleId: string) {
  const { data, error } = await supabase
    .from("motorcycle_timelines")
    .select("*")
    .eq("motorcycle_id", motorcycleId)
    .order("event_date", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function createTimelineEvent(data: {
  motorcycleId: string;
  title: string;
  description?: string;
  cost?: number;
  eventDate: string;
}) {
  const { error } = await supabase.from("motorcycle_timelines").insert({
    motorcycle_id: data.motorcycleId,
    title: data.title,
    description: data.description,
    cost: data.cost ?? 0,
    event_date: data.eventDate,
  });

  if (error) {
    throw error;
  }
}

export async function getTimelineEvent(timelineId: string) {
  const { data, error } = await supabase
    .from("motorcycle_timelines")
    .select("*")
    .eq("id", timelineId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateTimelineEvent(
  timelineId: string,
  data: {
    title: string;
    description?: string;
    cost?: number;
    eventDate: string;
  },
) {
  const { error } = await supabase
    .from("motorcycle_timelines")
    .update({
      title: data.title,
      description: data.description,
      cost: data.cost,
      event_date: data.eventDate,
    })
    .eq("id", timelineId);

  if (error) {
    throw error;
  }
}

export async function deleteTimelineEvent(timelineId: string) {
  const { error } = await supabase
    .from("motorcycle_timelines")
    .delete()
    .eq("id", timelineId);

  if (error) {
    throw error;
  }
}

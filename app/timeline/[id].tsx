import { View, Text, TouchableOpacity, Alert } from "react-native";

import { useTimelineEvent } from "@/features/timeline/hooks/useTimelineEvent";
import { router, useLocalSearchParams } from "expo-router";

import { deleteTimelineEvent } from "@/features/timeline/repositories/timeline.repository";

export default function TimelineDetailScreen() {
  const { id } = useLocalSearchParams();

  const { event, loading } = useTimelineEvent(id as string);

  async function handleDelete() {
    Alert.alert("Delete Timeline", "Yakin ingin menghapus event ini?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTimelineEvent(event.id);

            Alert.alert("Success", "Timeline deleted");

            router.back();
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!event) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Timeline not found</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        {event.title}
      </Text>

      <Text>{event.description}</Text>

      <Text>Rp {event.cost.toLocaleString("id-ID")}</Text>

      <Text>{new Date(event.event_date).toLocaleDateString("id-ID")}</Text>
      <TouchableOpacity
        onPress={() => router.push(`/timeline/edit/${event.id}`)}
        style={{
          marginTop: 24,

          padding: 16,

          borderRadius: 12,

          alignItems: "center",

          backgroundColor: "#2563EB",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Edit Timeline
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          marginTop: 12,

          padding: 16,

          borderRadius: 12,

          alignItems: "center",

          backgroundColor: "#DC2626",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Delete Timeline
        </Text>
      </TouchableOpacity>
    </View>
  );
}

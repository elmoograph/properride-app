import { useEffect, useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import {
  getTimelineEvent,
  updateTimelineEvent,
} from "@/features/timeline/repositories/timeline.repository";

export default function EditTimelineScreen() {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [cost, setCost] = useState("");

  const [eventDate, setEventDate] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvent();
  }, []);

  async function loadEvent() {
    try {
      const event = await getTimelineEvent(id as string);

      setTitle(event.title ?? "");

      setDescription(event.description ?? "");

      setCost(String(event.cost ?? 0));

      setEventDate(event.event_date ?? "");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert("Title wajib diisi");
      return;
    }

    try {
      setLoading(true);

      await updateTimelineEvent(id as string, {
        title,
        description,
        cost: Number(cost || 0),
        eventDate,
      });

      Alert.alert("Success", "Timeline updated");

      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        Edit Timeline Event
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
          minHeight: 100,
          textAlignVertical: "top",
        }}
      />

      <TextInput
        placeholder="Cost"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={eventDate}
        onChangeText={setEventDate}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TouchableOpacity
        disabled={loading}
        onPress={handleSave}
        style={{
          padding: 18,
          borderRadius: 12,
          alignItems: "center",
          backgroundColor: "#17B169",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

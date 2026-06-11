import { useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { router } from "expo-router";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";

import { createTimelineEvent } from "@/features/timeline/repositories/timeline.repository";

export default function AddTimelineScreen() {
  const { featuredMotorcycle } = useMotorcycles();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [cost, setCost] = useState("");

  async function handleSave() {
    if (!featuredMotorcycle?.id) {
      return;
    }

    try {
      await createTimelineEvent({
        motorcycleId: featuredMotorcycle.id,
        title,
        description,
        cost: Number(cost || 0),
        eventDate: new Date().toISOString().split("T")[0],
      });

      Alert.alert("Success", "Timeline event added");

      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
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
        Add Timeline Event
      </Text>

      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Cost"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

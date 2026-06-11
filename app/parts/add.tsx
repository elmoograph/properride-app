import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";
import { createPart } from "@/features/parts/repositories/part.repository";

import { createTimelineEvent } from "@/features/timeline/repositories/timeline.repository";

import { router } from "expo-router";

export default function AddPartScreen() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);

  const { featuredMotorcycle } = useMotorcycles();

  async function handleSave() {
    if (!featuredMotorcycle?.id) {
      Alert.alert("Motorcycle not found");
      return;
    }

    if (!category.trim()) {
      Alert.alert("Category wajib diisi");
      return;
    }

    if (!name.trim()) {
      Alert.alert("Part name wajib diisi");
      return;
    }

    try {
      setLoading(true);

      await createPart({
        motorcycleId: featuredMotorcycle.id,
        category,
        name,
        brand,
        price: Number(price || 0),
      });

      await createTimelineEvent({
        motorcycleId: featuredMotorcycle.id,

        title: `Added ${name}`,

        description: `Category: ${category}${
          brand ? ` • Brand: ${brand}` : ""
        }`,

        cost: Number(price || 0),

        eventDate: new Date().toISOString().split("T")[0],
      });

      Alert.alert("Success", "Part added");

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
        Add Part
      </Text>

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Part Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
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
          {loading ? "Saving..." : "Save Part"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import {
  getPart,
  updatePart,
} from "@/features/parts/repositories/part.repository";

export default function EditPartScreen() {
  const { id } = useLocalSearchParams();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPart();
  }, []);

  async function loadPart() {
    try {
      const part = await getPart(id as string);

      setCategory(part.category ?? "");
      setName(part.name ?? "");
      setBrand(part.brand ?? "");
      setPrice(String(part.price ?? 0));
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  async function handleSave() {
    try {
      setLoading(true);

      await updatePart(id as string, {
        category,
        name,
        brand,
        price: Number(price || 0),
      });

      Alert.alert("Success", "Part updated");

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
        Edit Part
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
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

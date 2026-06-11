import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import {
  getMotorcycle,
  updateMotorcycle,
} from "@/features/motorcycles/repositories/motorcycle.repository";

export default function EditMotorcycleScreen() {
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMotorcycle();
  }, []);

  async function loadMotorcycle() {
    try {
      const motorcycle = await getMotorcycle(id as string);

      setName(motorcycle.name ?? "");
      setNickname(motorcycle.nickname ?? "");
      setBrand(motorcycle.brand ?? "");
      setModel(motorcycle.model ?? "");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  async function handleSave() {
    try {
      setLoading(true);

      await updateMotorcycle(id as string, {
        name,
        nickname,
        brand,
        model,
      });

      Alert.alert("Success", "Motorcycle updated");

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
        Edit Motorcycle
      </Text>

      <TextInput
        placeholder="Motorcycle Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
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
        placeholder="Model"
        value={model}
        onChangeText={setModel}
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

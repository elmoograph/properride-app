import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { useGarage } from "@/features/garage/hooks/useGarage";

import { createMotorcycle } from "@/features/motorcycles/repositories/motorcycle.repository";

import { router } from "expo-router";

export default function MotorcycleOnboardingScreen() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const { garage } = useGarage();
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!garage?.id) return;
    if (!name.trim()) {
      Alert.alert("Motorcycle name wajib diisi");
      return;
    }

    if (!brand.trim()) {
      Alert.alert("Brand wajib diisi");
      return;
    }

    if (!model.trim()) {
      Alert.alert("Model wajib diisi");
      return;
    }

    try {
      setLoading(true);

      await createMotorcycle({
        garageId: garage.id,
        name,
        nickname,
        brand,
        model,
      });

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
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
        Add First Motorcycle
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
        placeholder="Nickname (optional)"
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
          {loading ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

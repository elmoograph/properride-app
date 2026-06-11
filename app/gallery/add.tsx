import { useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { router } from "expo-router";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";

import { pickMotorcycleImage } from "@/features/motorcycles/services/image-picker.service";

import { uploadGalleryImage } from "@/features/gallery/repositories/upload.repository";

import { createGalleryImage } from "@/features/gallery/repositories/gallery.repository";

export default function AddGalleryScreen() {
  const { featuredMotorcycle } = useMotorcycles();

  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    try {
      if (!featuredMotorcycle?.id) {
        return;
      }

      const asset = await pickMotorcycleImage();

      if (!asset) {
        return;
      }

      setLoading(true);

      const imageUrl = await uploadGalleryImage(
        featuredMotorcycle.id,
        asset.uri,
      );

      await createGalleryImage({
        motorcycleId: featuredMotorcycle.id,
        imageUrl,
        caption,
      });

      Alert.alert("Success", "Photo added");

      router.back();
    } catch (error: any) {
      Alert.alert("Upload Failed", error.message);
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
        Add Gallery Photo
      </Text>

      <TextInput
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleUpload}
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
          {loading ? "Uploading..." : "Select Photo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useMotorcycle } from "@/features/motorcycles/hooks/useMotorcycle";
import { TouchableOpacity, Alert } from "react-native";

import { useGarage } from "@/features/garage/hooks/useGarage";

import { setFeaturedMotorcycle } from "@/features/motorcycles/repositories/motorcycle.repository";

import { router } from "expo-router";
import { Image } from "react-native";
import { pickMotorcycleImage } from "@/features/motorcycles/services/image-picker.service";
import { uploadMotorcycleImage } from "@/features/motorcycles/repositories/upload.repository";
import { updateMotorcycleImage } from "@/features/motorcycles/repositories/motorcycle.repository";

import { deleteMotorcycleSafe } from "@/features/motorcycles/repositories/motorcycle.repository";

export default function MotorcycleDetailScreen() {
  const { id } = useLocalSearchParams();

  // const { motorcycle, loading } = useMotorcycle(id as string);
  const { motorcycle, loading, refreshMotorcycle } = useMotorcycle(
    id as string,
  );
  const { garage } = useGarage();

  async function handleSetActive() {
    if (!garage?.id) return;

    try {
      await setFeaturedMotorcycle(garage.id, motorcycle.id);

      Alert.alert("Success", "Active motorcycle updated");

      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  async function handleChangePhoto() {
    try {
      const asset = await pickMotorcycleImage();

      if (!asset) return;

      const imageUrl = await uploadMotorcycleImage(motorcycle.id, asset.uri);

      await updateMotorcycleImage(motorcycle.id, imageUrl);

      Alert.alert("Success", "Photo updated");

      refreshMotorcycle();
    } catch (error: any) {
      Alert.alert("Upload Failed", error.message);
    }
  }

  async function handleDelete() {
    if (!garage?.id) return;

    Alert.alert("Delete Motorcycle", "Yakin ingin menghapus motor ini?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMotorcycleSafe(garage.id, motorcycle.id);

            router.replace("/motorcycles");
          } catch (error: any) {
            Alert.alert("Delete Failed", error.message);
          }
        },
      },
    ]);
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <Image
        source={
          motorcycle.image_url
            ? { uri: motorcycle.image_url }
            : require("assets/images/gallery/gallery-1.jpg")
        }
        resizeMode="cover"
        style={{
          width: "100%",
          height: 220,
          borderRadius: 16,
          marginBottom: 24,
        }}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        {motorcycle.name}
      </Text>

      <Text>{motorcycle.brand}</Text>

      <Text>{motorcycle.model}</Text>
      <Text
        style={{
          marginTop: 12,
          color: motorcycle.is_featured ? "#17B169" : "#6B7280",
          fontWeight: "600",
        }}
      >
        {motorcycle.is_featured ? "Active Motorcycle" : "Inactive Motorcycle"}
      </Text>
      {!motorcycle.is_featured && (
        <TouchableOpacity
          onPress={handleSetActive}
          style={{
            marginTop: 24,

            padding: 16,

            borderRadius: 12,

            alignItems: "center",

            backgroundColor: "#17B169",
          }}
        >
          <TouchableOpacity
            onPress={handleChangePhoto}
            style={{
              marginTop: 24,
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
              backgroundColor: "#111827",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
              }}
            >
              Change Photo
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Set Active Motorcycle
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => router.push(`/motorcycles/edit/${motorcycle.id}`)}
        style={{
          marginTop: 12,
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
          Edit Motorcycle
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
          Delete Motorcycle
        </Text>
      </TouchableOpacity>
    </View>
  );
}

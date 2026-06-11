import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useGalleryImage } from "@/features/gallery/hooks/useGalleryImage";

import { deleteGalleryImage } from "@/features/gallery/repositories/gallery.repository";

export default function GalleryDetailScreen() {
  const { id } = useLocalSearchParams();

  const { image, loading } = useGalleryImage(id as string);

  async function handleDelete() {
    Alert.alert("Delete Photo", "Yakin ingin menghapus foto ini?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteGalleryImage(image.id);

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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={{
          uri: image.image_url,
        }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 350,
        }}
      />

      <View
        style={{
          padding: 24,
        }}
      >
        <Text>{image.caption ?? "No caption"}</Text>

        <TouchableOpacity
          onPress={handleDelete}
          style={{
            marginTop: 24,

            backgroundColor: "#DC2626",

            padding: 16,

            borderRadius: 12,

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
            }}
          >
            Delete Photo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

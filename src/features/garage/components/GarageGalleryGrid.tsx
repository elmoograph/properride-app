import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { spacing } from "../../../constants/spacing";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";

import { GarageGalleryItem } from "./GarageGalleryItem";

import { useGallery } from "@/features/gallery/hooks/useGallery";

export function GarageGalleryGrid() {
  const { images, loading } = useGallery();

  if (loading) {
    return (
      <View
        style={{
          paddingVertical: 40,
          alignItems: "center",
        }}
      >
        <Text>Loading gallery...</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.screen,

          paddingTop: 24,

          gap: 16,

          marginBottom: spacing.lg,
        }}
        columnWrapperStyle={{
          gap: 16,
        }}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              alignItems: "center",
              paddingVertical: 40,
            }}
          >
            <Text>No photos yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <GarageGalleryItem
            image={item.image_url}
            onPress={() => router.push(`/gallery/${item.id}`)}
          />
        )}
      />

      <TouchableOpacity
        onPress={() => router.push("/gallery/add")}
        style={{
          marginHorizontal: spacing.screen,

          marginBottom: spacing.xl,

          backgroundColor: colors.primary,

          paddingVertical: 12,

          borderRadius: radius.sm,

          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.background,

            fontWeight: "700",
          }}
        >
          + Add Photo
        </Text>
      </TouchableOpacity>
    </>
  );
}

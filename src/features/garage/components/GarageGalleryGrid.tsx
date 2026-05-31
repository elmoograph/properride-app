import { FlatList } from "react-native";

import { spacing } from "../../../constants/spacing";

import { galleryData } from "../data/gallery.data";

import { GarageGalleryItem } from "./GarageGalleryItem";

export function GarageGalleryGrid() {
  return (
    <FlatList
      data={galleryData}
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
      renderItem={({ item }) => <GarageGalleryItem image={item.image} />}
    />
  );
}

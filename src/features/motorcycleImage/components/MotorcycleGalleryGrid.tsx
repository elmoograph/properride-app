import { Image, Pressable, StyleSheet, View } from "react-native";

import { radius, spacing } from "@/src/theme";
import type { MotorcycleImage } from "@/src/features/motorcycleImage/types/motorcycleImage.types";

type MotorcycleGalleryGridProps = {
  images: MotorcycleImage[];
  onPressImage?: (image: MotorcycleImage) => void;
};

export function MotorcycleGalleryGrid({
  images,
  onPressImage,
}: MotorcycleGalleryGridProps) {
  return (
    <View style={styles.grid}>
      {images.map((image) => (
        <Pressable
          key={image.id}
          style={styles.item}
          onPress={() => onPressImage?.(image)}
        >
          <Image source={{ uri: image.image_url }} style={styles.image} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  item: {
    width: "31.8%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: radius.md,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from "react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { MotorcycleImage } from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import { radius, spacing } from "@/src/theme";

type MotorcycleGalleryGridProps = {
  images: MotorcycleImage[];
  onPressImage?: (image: MotorcycleImage) => void;
};

const COLUMN_COUNT = 3;
const COLUMN_GAP = spacing.sm;

export function MotorcycleGalleryGrid({
  images,
  onPressImage,
}: MotorcycleGalleryGridProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const totalGap = COLUMN_GAP * (COLUMN_COUNT - 1);
  const itemSize =
    containerWidth > 0
      ? Math.floor((containerWidth - totalGap) / COLUMN_COUNT)
      : 0;

  function handleLayout(event: LayoutChangeEvent) {
    setContainerWidth(event.nativeEvent.layout.width);
  }

  return (
    <View style={styles.grid} onLayout={handleLayout}>
      {itemSize > 0
        ? images.map((image) => (
            <Pressable
              key={image.id}
              accessibilityRole="button"
              accessibilityLabel={
                image.caption?.trim()
                  ? `Open gallery photo: ${image.caption.trim()}`
                  : "Open gallery photo"
              }
              onPress={() => onPressImage?.(image)}
              style={({ pressed }) => [
                styles.item,
                {
                  width: itemSize,
                  height: itemSize,
                },
                pressed ? styles.itemPressed : null,
              ]}
            >
              <Image
                source={{ uri: image.image_url }}
                style={styles.image}
                resizeMode="cover"
                onLoad={() => {
                  console.log("Gallery image loaded:", image.id);
                }}
                onError={(event) => {
                  console.log(
                    "Gallery image failed:",
                    image.id,
                    event.nativeEvent.error,
                  );
                }}
              />

              <View pointerEvents="none" style={styles.imageBorder} />
            </Pressable>
          ))
        : null}

      {images.length === 0 ? (
        <Text style={styles.emptyText}>No gallery photos yet.</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: "100%",
    minHeight: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: COLUMN_GAP,
  },
  item: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radius.md,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageBorder: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    borderRadius: radius.md,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
  itemPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  emptyText: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
});

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { Trash2, X } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import type { MotorcycleImage } from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import { radius, spacing } from "@/src/theme";

type MotorcycleGalleryModalProps = {
  visible: boolean;
  images: MotorcycleImage[];
  initialImageId?: string | null;
  deleting?: boolean;
  canDelete?: boolean;
  onClose: () => void;
  onDelete: (image: MotorcycleImage) => void;
  onChangeImage?: (image: MotorcycleImage) => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export function MotorcycleGalleryModal({
  visible,
  images,
  initialImageId,
  deleting = false,
  canDelete = true,
  onClose,
  onDelete,
  onChangeImage,
}: MotorcycleGalleryModalProps) {
  const listRef = useRef<FlatList<MotorcycleImage>>(null);

  const initialIndex = useMemo(() => {
    if (!initialImageId) {
      return 0;
    }

    const foundIndex = images.findIndex((image) => image.id === initialImageId);

    return foundIndex >= 0 ? foundIndex : 0;
  }, [images, initialImageId]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const activeImage = images[activeIndex] ?? null;
  const activeCaption = activeImage?.caption?.trim();

  useEffect(() => {
    if (!visible) {
      return;
    }

    setActiveIndex(initialIndex);

    const timeout = setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [visible, initialIndex]);

  function handleMomentumScrollEnd(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
    );

    if (nextIndex < 0 || nextIndex >= images.length) {
      return;
    }

    setActiveIndex(nextIndex);

    const nextImage = images[nextIndex];

    if (nextImage) {
      onChangeImage?.(nextImage);
    }
  }

  function handleDelete() {
    if (!activeImage || deleting) {
      return;
    }

    onDelete(activeImage);
  }

  function getItemLayout(
    _: ArrayLike<MotorcycleImage> | null | undefined,
    index: number,
  ) {
    return {
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    };
  }

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <FlatList
        ref={listRef}
        data={images}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        initialScrollIndex={initialIndex}
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <View style={styles.topOverlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={MOTORCYCLE_IMAGE_COPY.CLOSE_VIEWER_ACCESSIBILITY}
          disabled={deleting}
          onPress={onClose}
          style={({ pressed }) => [
            styles.iconButton,
            pressed ? styles.pressed : null,
            deleting ? styles.disabled : null,
          ]}
        >
          <X size={24} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {images.length > 0 ? activeIndex + 1 : 0} / {images.length}
          </Text>
        </View>

        {canDelete ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={MOTORCYCLE_IMAGE_COPY.DELETE_ACCESSIBILITY}
            disabled={deleting || !activeImage}
            onPress={handleDelete}
            style={({ pressed }) => [
              styles.iconButton,
              styles.deleteButton,
              pressed ? styles.pressed : null,
              deleting ? styles.disabled : null,
            ]}
          >
            <Trash2 size={21} color="#FF5A5F" />
          </Pressable>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>

      {activeCaption ? (
        <View style={styles.captionOverlay}>
          <Text style={styles.caption}>{activeCaption}</Text>
        </View>
      ) : null}

      {images.length > 1 ? (
        <View style={styles.pagination}>
          {images.map((image, index) => (
            <View
              key={image.id}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : null,
              ]}
            />
          ))}
        </View>
      ) : null}

      {deleting ? (
        <View style={styles.deletingOverlay}>
          <Text style={styles.deletingText}>
            {MOTORCYCLE_IMAGE_COPY.DELETING_LABEL}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
    elevation: 999,
    backgroundColor: "#000000",
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: spacing.xl,
    right: spacing.lg,
    left: spacing.lg,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
  },
  deleteButton: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  counter: {
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  counterText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  captionOverlay: {
    position: "absolute",
    right: spacing.xl,
    bottom: 72,
    left: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: "rgba(0, 0, 0, 0.58)",
  },
  caption: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 21,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  pagination: {
    position: "absolute",
    right: spacing.xl,
    bottom: 42,
    left: spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
  },
  dotActive: {
    width: 18,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  deletingOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  deletingText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});

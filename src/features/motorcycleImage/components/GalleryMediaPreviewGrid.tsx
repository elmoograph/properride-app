import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ImageIcon, Play, Plus, X } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { GALLERY_UPLOAD_LIMITS } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import type { PickedGalleryMedia } from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import { radius, spacing } from "@/src/theme";

type GalleryMediaPreviewGridProps = {
  media: PickedGalleryMedia[];
  disabled?: boolean;
  onAddMedia: () => void;
  onRemoveMedia: (mediaId: string) => void;
};

export function GalleryMediaPreviewGrid({
  media,
  disabled = false,
  onAddMedia,
  onRemoveMedia,
}: GalleryMediaPreviewGridProps) {
  const canAddMore = media.length < GALLERY_UPLOAD_LIMITS.MAX_MEDIA_PER_POST;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {media.map((item, index) => (
          <View key={item.id} style={styles.mediaCard}>
            {item.mediaType === "image" ? (
              <Image
                source={{ uri: item.uri }}
                style={styles.media}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.videoPreview}>
                <View style={styles.videoIcon}>
                  <Play
                    size={22}
                    fill={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                    color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                  />
                </View>

                <Text style={styles.videoLabel}>Video</Text>
              </View>
            )}

            <View style={styles.orderBadge}>
              <Text style={styles.orderText}>{index + 1}</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Hapus media ${index + 1}`}
              disabled={disabled}
              onPress={() => onRemoveMedia(item.id)}
              style={({ pressed }) => [
                styles.removeButton,
                pressed ? styles.pressed : null,
                disabled ? styles.disabled : null,
              ]}
            >
              <X size={15} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
            </Pressable>

            <View style={styles.typeBadge}>
              {item.mediaType === "video" ? (
                <Play
                  size={11}
                  fill={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                  color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                />
              ) : (
                <ImageIcon
                  size={12}
                  color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                />
              )}
            </View>
          </View>
        ))}

        {canAddMore ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tambah foto atau video"
            disabled={disabled}
            onPress={onAddMedia}
            style={({ pressed }) => [
              styles.addCard,
              pressed ? styles.pressed : null,
              disabled ? styles.disabled : null,
            ]}
          >
            <View style={styles.addIcon}>
              <Plus size={22} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
            </View>

            <Text style={styles.addTitle}>Tambah Media</Text>

            <Text style={styles.addDescription}>Foto atau video</Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.counter}>
          {media.length}/{GALLERY_UPLOAD_LIMITS.MAX_MEDIA_PER_POST} media
        </Text>

        <Text style={styles.helper}>
          Urutan media mengikuti urutan pemilihan.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  mediaCard: {
    width: 132,
    height: 172,
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  media: {
    width: "100%",
    height: "100%",
  },
  videoPreview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  videoIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  videoLabel: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  orderBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    minWidth: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  orderText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  removeButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.72)",
  },
  typeBadge: {
    position: "absolute",
    right: spacing.sm,
    bottom: spacing.sm,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.72)",
  },
  addCard: {
    width: 132,
    height: 172,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  addIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  addTitle: {
    marginTop: spacing.md,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  addDescription: {
    marginTop: 3,
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  footer: {
    gap: 3,
  },
  counter: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  helper: {
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.5,
  },
});

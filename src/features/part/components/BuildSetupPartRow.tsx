import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  ChevronRight,
  ImageIcon,
  LockKeyhole,
  Star,
} from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";
import { radius, spacing } from "@/src/theme";
import { formatCurrency, formatOptionalValue } from "@/src/utils/format";

type BuildSetupPartRowProps = {
  part: Part;
  isLast?: boolean;
  showVisibility?: boolean;
  onPress?: () => void;
};

function getPartTitle(part: Part): string {
  return (
    part.product_name ||
    part.custom_product_name ||
    part.brand ||
    part.custom_brand ||
    PART_COPY.EMPTY_VALUE
  );
}

function getPartBrand(part: Part): string {
  return formatOptionalValue(part.brand || part.custom_brand);
}

function getRating(part: Part): string {
  if (part.rating === null || part.rating === undefined) {
    return PART_COPY.RATING_EMPTY;
  }

  return Number(part.rating).toFixed(1);
}

export function BuildSetupPartRow({
  part,
  isLast = false,
  showVisibility = false,
  onPress,
}: BuildSetupPartRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Buka detail ${getPartTitle(part)}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast ? styles.rowBorder : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.imageWrapper}>
        {part.main_image_url ? (
          <Image
            source={{ uri: part.main_image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <ImageIcon size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {getPartTitle(part)}
          </Text>

          {showVisibility && !part.is_public ? (
            <View style={styles.privateBadge}>
              <LockKeyhole
                size={10}
                color={MOTORCYCLE_SHOWCASE_COLORS.textMuted}
              />

              <Text style={styles.privateText}>Private</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.brand} numberOfLines={1}>
          {getPartBrand(part)}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.price} numberOfLines={1}>
            {formatCurrency(part.price)}
          </Text>

          <View style={styles.rating}>
            <Star
              size={12}
              fill={MOTORCYCLE_SHOWCASE_COLORS.accent}
              color={MOTORCYCLE_SHOWCASE_COLORS.accent}
            />

            <Text style={styles.ratingText}>{getRating(part)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.arrowButton}>
        <ChevronRight size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
  imageWrapper: {
    width: 76,
    height: 76,
    overflow: "hidden",
    borderRadius: radius.lg,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    flexShrink: 1,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 15,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  privateBadge: {
    minHeight: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  privateText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 9,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  brand: {
    marginTop: 4,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  price: {
    flexShrink: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  arrowButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  pressed: {
    opacity: 0.72,
  },
});

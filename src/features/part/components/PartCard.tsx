import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";
import { formatCurrency, formatOptionalValue } from "@/src/utils/format";

type PartCardProps = {
  part: Part;
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
  return part.brand || part.custom_brand || PART_COPY.EMPTY_VALUE;
}

export function PartCard({ part, onPress }: PartCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        {part.main_image_url ? (
          <Image
            source={{ uri: part.main_image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {part.category.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{part.category}</Text>

        <Text style={styles.title} numberOfLines={1}>
          {getPartTitle(part)}
        </Text>

        <Text style={styles.subtitle} numberOfLines={1}>
          {getPartBrand(part)}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>{formatCurrency(part.price)}</Text>

          <Text style={styles.meta}>
            {formatOptionalValue(part.install_date)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  imageWrapper: {
    width: 82,
    height: 82,
    borderRadius: radius.md,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  placeholderText: {
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 30,
    color: colors.textMuted,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "center",
  },
  category: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  title: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.headline.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  meta: {
    fontFamily: fontFamily.body.medium,
    fontSize: 12,
    color: colors.textMuted,
  },
});

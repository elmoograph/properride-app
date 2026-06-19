import { Image, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";

type PartHeroProps = {
  part: Part;
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

export function PartHero({ part }: PartHeroProps) {
  return (
    <View style={styles.container}>
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
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{part.category}</Text>
        </View>

        <Text style={styles.title}>{getPartTitle(part)}</Text>

        <Text style={styles.subtitle}>{getPartBrand(part)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  imageWrapper: {
    height: 220,
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
    fontSize: 64,
    color: colors.textMuted,
  },
  content: {
    padding: spacing.lg,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.white,
  },
  title: {
    marginTop: spacing.md,
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 15,
    color: colors.textSecondary,
  },
});

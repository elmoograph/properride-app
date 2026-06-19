import { Image, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

type MotorcycleHeroProps = {
  motorcycle: Motorcycle;
};

export function MotorcycleHero({ motorcycle }: MotorcycleHeroProps) {
  const title = [motorcycle.brand, motorcycle.model].filter(Boolean).join(" ");
  const subtitle = [
    motorcycle.nickname,
    motorcycle.year ? String(motorcycle.year) : null,
    motorcycle.color,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {motorcycle.hero_image_url ? (
          <Image
            source={{ uri: motorcycle.hero_image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>{motorcycle.brand[0]}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{motorcycle.status}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{motorcycle.visibility}</Text>
          </View>
        </View>
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
  title: {
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 26,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 15,
    color: colors.textSecondary,
  },
  badgeRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  badgeText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: "capitalize",
  },
});

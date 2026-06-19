import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

type MotorcycleCardProps = {
  motorcycle: Motorcycle;
  onPress?: () => void;
};

export function MotorcycleCard({ motorcycle, onPress }: MotorcycleCardProps) {
  const title = [motorcycle.brand, motorcycle.model].filter(Boolean).join(" ");
  const subtitle = [
    motorcycle.nickname,
    motorcycle.year ? String(motorcycle.year) : null,
    motorcycle.color,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <Pressable style={styles.card} onPress={onPress}>
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
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}

        <View style={styles.metaRow}>
          <Text style={styles.meta}>{motorcycle.status}</Text>
          <Text style={styles.meta}>{motorcycle.visibility}</Text>
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
    width: 92,
    height: 92,
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
    fontSize: 32,
    color: colors.textMuted,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "center",
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 17,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  meta: {
    fontFamily: fontFamily.body.medium,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: "capitalize",
  },
});

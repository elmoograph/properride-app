import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Bike, Gauge, Settings } from "lucide-react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import {
  formatCc,
  formatMileage,
  formatOptionalValue,
} from "@/src/utils/format";

type MotorcycleCardProps = {
  motorcycle: Motorcycle;
  onPress?: () => void;
};

function getMotorcycleTitle(motorcycle: Motorcycle): string {
  return `${motorcycle.brand} ${motorcycle.model}`;
}

function getMotorcycleSubtitle(motorcycle: Motorcycle): string {
  return (
    motorcycle.nickname || motorcycle.variant || MOTORCYCLE_COPY.EMPTY_VALUE
  );
}

export function MotorcycleCard({ motorcycle, onPress }: MotorcycleCardProps) {
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
            <Bike size={40} color={colors.textMuted} />
          </View>
        )}

        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>
            {formatOptionalValue(motorcycle.status)}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <Text style={styles.title} numberOfLines={1}>
              {getMotorcycleTitle(motorcycle)}
            </Text>

            <Text style={styles.subtitle} numberOfLines={1}>
              {getMotorcycleSubtitle(motorcycle)}
            </Text>
          </View>

          <View style={styles.yearBadge}>
            <Text style={styles.yearBadgeText}>
              {formatOptionalValue(motorcycle.year)}
            </Text>
          </View>
        </View>

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Settings size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>
              {formatCc(motorcycle.engine_cc)}
            </Text>
          </View>

          <View style={styles.metaItem}>
            <Gauge size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>
              {formatMileage(motorcycle.mileage)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {formatOptionalValue(motorcycle.visibility)}
          </Text>

          <Text style={styles.footerDot}>•</Text>

          <Text style={styles.footerText}>
            {formatOptionalValue(motorcycle.color)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  imageWrapper: {
    height: 190,
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
  statusBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.black,
  },
  statusBadgeText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.white,
    textTransform: "capitalize",
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  titleGroup: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
  yearBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  yearBadgeText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.textPrimary,
  },
  metaGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metaItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  metaText: {
    flex: 1,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  footerText: {
    fontFamily: fontFamily.body.medium,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: "capitalize",
  },
  footerDot: {
    fontFamily: fontFamily.body.bold,
    fontSize: 12,
    color: colors.textMuted,
  },
});

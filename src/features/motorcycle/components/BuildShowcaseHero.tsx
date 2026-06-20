import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Plus, ChevronDown, ArrowLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

type BuildShowcaseHeroProps = {
  motorcycle: Motorcycle;
  hasMultipleMotorcycles?: boolean;
  onPressBack?: () => void;
  onPressAddMotorcycle?: () => void;
  onPressMotorcyclePicker?: () => void;
};

function getDisplayMotorcycleType(motorcycle: Motorcycle): string {
  const model = motorcycle.model?.trim();
  const variant = motorcycle.variant?.trim();

  if (model && variant) {
    return `${model} ${variant}`;
  }

  if (model) {
    return model;
  }

  return "Unknown Type";
}

function getDisplayBrand(motorcycle: Motorcycle): string {
  return motorcycle.brand || "Unknown Brand";
}

function getDisplayYear(motorcycle: Motorcycle): string {
  if (!motorcycle.year) {
    return "-";
  }

  return String(motorcycle.year);
}

export function BuildShowcaseHero({
  motorcycle,
  hasMultipleMotorcycles = false,
  onPressBack,
  onPressAddMotorcycle,
  onPressMotorcyclePicker,
}: BuildShowcaseHeroProps) {
  return (
    <View style={styles.container}>
      {motorcycle.hero_image_url ? (
        <Image
          source={{ uri: motorcycle.hero_image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {getDisplayBrand(motorcycle)}
          </Text>
        </View>
      )}

      <LinearGradient
        colors={[
          "rgba(0,0,0,0.15)",
          "rgba(0,0,0,0.25)",
          "rgba(0,0,0,0.55)",
          "rgba(0,0,0,0.82)",
        ]}
        locations={[0, 0.35, 0.7, 1]}
        style={styles.overlay}
      />

      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={onPressBack}>
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <Pressable style={styles.addButton} onPress={onPressAddMotorcycle}>
          <Plus size={16} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
          <Text style={styles.addButtonText}>Tambah motor</Text>
        </Pressable>
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.brandText}>{getDisplayBrand(motorcycle)}</Text>

        <View style={styles.bottomRow}>
          <Pressable
            style={[
              styles.namePill,
              !hasMultipleMotorcycles && styles.namePillDisabled,
            ]}
            onPress={
              hasMultipleMotorcycles ? onPressMotorcyclePicker : undefined
            }
            disabled={!hasMultipleMotorcycles}
          >
            <Text style={styles.namePillText}>
              {getDisplayMotorcycleType(motorcycle)}
            </Text>

            {hasMultipleMotorcycles ? (
              <ChevronDown
                size={16}
                color={MOTORCYCLE_SHOWCASE_COLORS.background}
              />
            ) : null}
          </Pressable>

          <View style={styles.yearGroup}>
            <View style={styles.yearDot} />
            <Text style={styles.yearText}>{getDisplayYear(motorcycle)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 372,
    overflow: "hidden",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  placeholderText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 36,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  topBar: {
    position: "absolute",
    top: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0, 0, 0, 0.38)",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },
  addButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  bottomContent: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.xl,
    left: spacing.lg,
  },
  brandText: {
    marginBottom: spacing.sm,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  namePill: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  namePillText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  yearGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  yearDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  yearText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  namePillDisabled: {
    paddingRight: spacing.lg,
  },
});

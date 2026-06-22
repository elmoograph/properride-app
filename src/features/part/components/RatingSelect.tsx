import { Pressable, StyleSheet, Text, View } from "react-native";
import { Star } from "lucide-react-native";

import { PART_COPY } from "@/src/features/part/constants/part.constants";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { colors, fontFamily, radius, spacing } from "@/src/theme";

type RatingSelectVariant = "default" | "dark";

type RatingSelectProps = {
  label: string;
  value: string;
  error?: string;
  variant?: RatingSelectVariant;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const RATING_OPTIONS = ["", "1", "2", "3", "4", "5"] as const;

export function RatingSelect({
  label,
  value,
  error,
  variant = "default",
  disabled = false,
  onChange,
}: RatingSelectProps) {
  const isDark = variant === "dark";

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, isDark ? styles.labelDark : null]}>
        {label}
      </Text>

      <View style={styles.row}>
        {RATING_OPTIONS.map((rating) => {
          const isActive = rating === value;
          const isEmpty = rating === "";

          const activeColor = isDark
            ? MOTORCYCLE_SHOWCASE_COLORS.accent
            : colors.primary;

          const inactiveIconColor = isDark
            ? MOTORCYCLE_SHOWCASE_COLORS.textSecondary
            : colors.textSecondary;

          return (
            <Pressable
              key={rating || "empty"}
              disabled={disabled}
              onPress={() => onChange(rating)}
              style={({ pressed }) => [
                styles.chip,
                isDark ? styles.chipDark : null,
                isActive
                  ? isDark
                    ? styles.chipActiveDark
                    : styles.chipActive
                  : null,
                disabled ? styles.disabled : null,
                pressed && !disabled ? styles.pressed : null,
              ]}
            >
              {isEmpty ? (
                <Text
                  style={[
                    styles.chipText,
                    isDark ? styles.chipTextDark : null,
                    isActive
                      ? isDark
                        ? styles.chipTextActiveDark
                        : styles.chipTextActive
                      : null,
                  ]}
                >
                  {PART_COPY.RATING_EMPTY}
                </Text>
              ) : (
                <View style={styles.ratingContent}>
                  <Star
                    size={14}
                    color={
                      isActive
                        ? isDark
                          ? MOTORCYCLE_SHOWCASE_COLORS.background
                          : colors.white
                        : inactiveIconColor
                    }
                    fill={
                      isActive
                        ? isDark
                          ? MOTORCYCLE_SHOWCASE_COLORS.background
                          : colors.white
                        : "transparent"
                    }
                  />

                  <Text
                    style={[
                      styles.chipText,
                      isDark ? styles.chipTextDark : null,
                      isActive
                        ? isDark
                          ? styles.chipTextActiveDark
                          : styles.chipTextActive
                        : null,
                    ]}
                  >
                    {rating}
                  </Text>
                </View>
              )}

              {isActive ? (
                <View
                  pointerEvents="none"
                  style={[
                    styles.activeBorder,
                    {
                      borderColor: activeColor,
                    },
                  ]}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  labelDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    position: "relative",
    minHeight: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  chipDark: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chipActiveDark: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  activeBorder: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    borderRadius: radius.full,
  },
  ratingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  chipText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipTextDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  chipTextActiveDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  error: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    color: colors.danger,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.55,
  },
});

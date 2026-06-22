import { StyleSheet, Switch, Text, View } from "react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { colors, fontFamily, radius, spacing } from "@/src/theme";

type SwitchRowVariant = "default" | "dark";

type SwitchRowProps = {
  label: string;
  description?: string;
  value: boolean;
  variant?: SwitchRowVariant;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
};

export function SwitchRow({
  label,
  description,
  value,
  variant = "default",
  disabled = false,
  onValueChange,
}: SwitchRowProps) {
  const isDark = variant === "dark";

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <View style={styles.textContent}>
        <Text style={[styles.label, isDark ? styles.labelDark : null]}>
          {label}
        </Text>

        {description ? (
          <Text
            style={[styles.description, isDark ? styles.descriptionDark : null]}
          >
            {description}
          </Text>
        ) : null}
      </View>

      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        trackColor={{
          false: isDark
            ? MOTORCYCLE_SHOWCASE_COLORS.surfaceMuted
            : colors.border,
          true: isDark ? MOTORCYCLE_SHOWCASE_COLORS.accentDark : colors.primary,
        }}
        thumbColor={
          value && isDark ? MOTORCYCLE_SHOWCASE_COLORS.accent : colors.white
        }
        ios_backgroundColor={
          isDark ? MOTORCYCLE_SHOWCASE_COLORS.surfaceMuted : colors.border
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  containerDark: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  textContent: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  labelDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  description: {
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  descriptionDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  disabled: {
    opacity: 0.55,
  },
});

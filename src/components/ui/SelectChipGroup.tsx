import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type SelectChipGroupVariant = "default" | "dark";

type SelectChipOption =
  | string
  | {
      label: string;
      value: string;
    };

type SelectChipGroupProps = {
  label?: string;
  options: readonly SelectChipOption[];
  value: string;
  error?: string;
  variant?: SelectChipGroupVariant;
  onChange: (value: string) => void;
};

function getOptionLabel(option: SelectChipOption): string {
  if (typeof option === "string") {
    return option;
  }

  return option.label;
}

function getOptionValue(option: SelectChipOption): string {
  if (typeof option === "string") {
    return option;
  }

  return option.value;
}

export function SelectChipGroup({
  label,
  options,
  value,
  error,
  variant = "default",
  onChange,
}: SelectChipGroupProps) {
  const isDark = variant === "dark";

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, isDark ? styles.labelDark : null]}>
          {label}
        </Text>
      ) : null}

      <View style={styles.chipList}>
        {options.map((option) => {
          const optionLabel = getOptionLabel(option);
          const optionValue = getOptionValue(option);
          const active = optionValue === value;

          return (
            <Pressable
              key={optionValue}
              style={[
                styles.chip,
                isDark ? styles.chipDark : null,
                active
                  ? isDark
                    ? styles.chipActiveDark
                    : styles.chipActive
                  : null,
              ]}
              onPress={() => onChange(optionValue)}
            >
              <Text
                style={[
                  styles.chipText,
                  isDark ? styles.chipTextDark : null,
                  active
                    ? isDark
                      ? styles.chipTextActiveDark
                      : styles.chipTextActive
                    : null,
                ]}
              >
                {optionLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  labelDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  chipList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    minHeight: 38,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
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
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    color: colors.danger,
  },
});

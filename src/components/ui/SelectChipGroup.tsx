import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";

type SelectChipGroupProps = {
  label?: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  error?: string;
};

export function SelectChipGroup({
  label,
  value,
  options,
  onChange,
  error,
}: SelectChipGroupProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {options.map((option) => {
          const isActive = option === value;

          return (
            <Pressable
              key={option}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onChange(option)}
            >
              <Text
                style={[styles.chipText, isActive && styles.chipTextActive]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

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
  content: {
    gap: spacing.sm,
    paddingRight: spacing.xl,
  },
  chip: {
    minHeight: 40,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chipText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  error: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    color: colors.danger,
  },
});

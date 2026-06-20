import { StyleSheet, Switch, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";

type SwitchRowProps = {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SwitchRow({
  label,
  description,
  value,
  onValueChange,
}: SwitchRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <Text style={styles.label}>{label}</Text>

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border,
          true: colors.primary,
        }}
        thumbColor={colors.white}
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
  textContent: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  description: {
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
});

import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type EmptyStateVariant = "default" | "dark";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: EmptyStateVariant;
};

export function EmptyState({
  title,
  description,
  action,
  variant = "default",
}: EmptyStateProps) {
  const isDark = variant === "dark";

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isDark ? styles.titleDark : null]}>
        {title}
      </Text>

      {description ? (
        <Text
          style={[styles.description, isDark ? styles.descriptionDark : null]}
        >
          {description}
        </Text>
      ) : null}

      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: spacing["2xl"],
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: "center",
  },
  titleDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  description: {
    marginTop: spacing.sm,
    fontFamily: fontFamily.body.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
  },
  descriptionDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  action: {
    width: "100%",
    marginTop: spacing.xl,
  },
});

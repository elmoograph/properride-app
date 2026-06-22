import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type PageHeaderVariant = "default" | "dark";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  eyebrow?: string;
  variant?: PageHeaderVariant;
};

export function PageHeader({
  title,
  subtitle,
  action,
  eyebrow,
  variant = "default",
}: PageHeaderProps) {
  const isDark = variant === "dark";

  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        {eyebrow ? (
          <Text style={[styles.eyebrow, isDark ? styles.eyebrowDark : null]}>
            {eyebrow}
          </Text>
        ) : null}

        <Text style={[styles.title, isDark ? styles.titleDark : null]}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={[styles.subtitle, isDark ? styles.subtitleDark : null]}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  textContent: {
    flex: 1,
  },
  eyebrow: {
    marginBottom: spacing.xs,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  eyebrowDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  title: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 28,
    color: colors.textPrimary,
  },
  titleDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  subtitleDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  action: {
    alignItems: "flex-end",
  },
});

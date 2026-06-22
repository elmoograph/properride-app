import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type FormSectionVariant = "default" | "dark";

type FormSectionProps = {
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  variant?: FormSectionVariant;
};

export function FormSection({
  title,
  subtitle,
  description,
  children,
  variant = "default",
}: FormSectionProps) {
  const sectionDescription = subtitle || description;
  const isDark = variant === "dark";

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerDefault,
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, isDark ? styles.titleDark : null]}>
          {title}
        </Text>

        {sectionDescription ? (
          <Text style={[styles.subtitle, isDark ? styles.subtitleDark : null]}>
            {sectionDescription}
          </Text>
        ) : null}
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
  },
  containerDefault: {
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  containerDark: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: colors.textPrimary,
  },
  titleDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.body.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  subtitleDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  content: {
    gap: spacing.md,
  },
});

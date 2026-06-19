import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  textContent: {
    gap: spacing.xs,
  },
  title: {
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.body.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  action: {
    alignSelf: "flex-start",
  },
});

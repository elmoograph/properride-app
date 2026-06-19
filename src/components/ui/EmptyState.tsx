import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing["4xl"],
  },
  title: {
    textAlign: "center",
    fontFamily: fontFamily.headline.bold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.sm,
    textAlign: "center",
    fontFamily: fontFamily.body.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  action: {
    marginTop: spacing.xl,
    width: "100%",
  },
});

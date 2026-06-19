import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";

type FormSectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  description: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  content: {
    marginTop: spacing.lg,
    gap: spacing.lg,
  },
});

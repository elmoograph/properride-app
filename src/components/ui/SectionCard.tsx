import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";

type SectionCardProps = {
  title?: string;
  children: ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={title ? styles.contentWithTitle : styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  content: {
    width: "100%",
  },
  contentWithTitle: {
    marginTop: spacing.md,
    width: "100%",
  },
});

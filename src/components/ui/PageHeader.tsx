import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}

      <Text style={styles.title}>{title}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  eyebrow: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 13,
    color: colors.primary,
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontFamily: fontFamily.body.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
});

import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";

type InfoRowProps = {
  label: string;
  value: string;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  label: {
    fontFamily: fontFamily.body.medium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  value: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
});

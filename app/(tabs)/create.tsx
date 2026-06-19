import { View, Text, StyleSheet } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Feed ProperRide will be here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: "center",
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontFamily: fontFamily.body.regular,
    fontSize: 15,
    color: colors.textSecondary,
  },
});

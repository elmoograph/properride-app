import { ActivityIndicator, StyleSheet, View } from "react-native";

import { colors } from "@/src/theme";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});

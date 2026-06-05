import { Text, View } from "react-native";

import { colors } from "../../src/constants/colors";
import { typography } from "../../src/styles/typography";

export default function ExploreScreen() {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          ...typography.heading.lg,
          color: colors.textPrimary,
        }}
      >
        Comming Soon
      </Text>
    </View>
  );
}

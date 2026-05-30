import { Text, View } from "react-native";

import { colors } from "../../src/constants/colors";
import { typography } from "../../src/styles/typography";

export default function ExploreScreen() {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: colors.primarytext,
      }}
    >
      <Text
        style={{
          ...typography.heading.lg,
          color: colors.white,
        }}
      >
        Explore
      </Text>
    </View>
  );
}

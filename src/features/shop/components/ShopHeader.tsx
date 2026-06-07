import { Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/styles/typography";

export function ShopHeader() {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,
      }}
    >
      <Text
        style={{
          ...typography.heading.md,
          color: colors.textPrimary,
        }}
      >
        Shop
      </Text>

      <Text
        style={{
          ...typography.body.md,
          color: colors.textSecondary,

          marginTop: spacing.xs,
        }}
      >
        Parts & Accessories
      </Text>
    </View>
  );
}

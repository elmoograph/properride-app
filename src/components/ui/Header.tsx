import { View, Text } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { navigation } from "@/constants/navigation";
import { typography } from "@/styles/typography";

type Props = {
  title?: string;

  showLogo?: boolean;

  leftSlot?: React.ReactNode;

  rightSlot?: React.ReactNode;
};

export function Header({
  title,
  showLogo = false,
  leftSlot,
  rightSlot,
}: Props) {
  return (
    <View
      style={{
        minHeight: navigation.headerHeight,

        paddingHorizontal: spacing.screen,

        paddingVertical: spacing.screen,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          gap: spacing.md,
        }}
      >
        {leftSlot}

        {showLogo ? (
          <Text
            style={{
              ...typography.heading.sm,
            }}
          >
            <Text
              style={{
                color: colors.textPrimary,
              }}
            >
              PROPER
            </Text>

            <Text
              style={{
                color: colors.primary,
              }}
            >
              RIDE
            </Text>
          </Text>
        ) : (
          <Text
            style={{
              ...typography.heading.sm,

              color: colors.textPrimary,
            }}
          >
            {title}
          </Text>
        )}
      </View>

      {/* RIGHT */}
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          gap: 12,
        }}
      >
        {rightSlot}
      </View>
    </View>
  );
}

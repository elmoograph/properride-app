import { Text, View } from "react-native";

import { Bell, Search } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";

export function FeedTopbar() {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: spacing.xs,
      }}
    >
      {/* LOGO */}
      <Text
        style={{
          ...typography.heading.sm,
          color: colors.textPrimary,
        }}
      >
        Proper
        <Text
          style={{
            color: colors.primary,
          }}
        >
          Ride
        </Text>
      </Text>

      {/* ACTION */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          gap: spacing.lg,
        }}
      >
        <Search size={icons.md} color={colors.textPrimary} />

        <View>
          <Bell size={icons.md} color={colors.textPrimary} />

          {/* NOTIFICATION DOT */}
          <View
            style={{
              position: "absolute",

              top: -2,
              right: -2,

              width: 6,
              height: 6,

              borderRadius: 999,

              backgroundColor: colors.textPrimary,
            }}
          />
        </View>
      </View>
    </View>
  );
}

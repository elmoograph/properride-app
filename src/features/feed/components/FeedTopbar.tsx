import { Text, View } from "react-native";

import { Bell, Search } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

export function FeedTopbar() {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LOGO */}
      <Text
        style={{
          ...typography.display.title,
          color: colors.white,
        }}
      >
        Proper
        <Text
          style={{
            color: colors.lime,
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
        <Search size={22} color={colors.white} />

        <View>
          <Bell size={22} color={colors.white} />

          {/* NOTIFICATION DOT */}
          <View
            style={{
              position: "absolute",

              top: -2,
              right: -2,

              width: 6,
              height: 6,

              borderRadius: 999,

              backgroundColor: colors.lime,
            }}
          />
        </View>
      </View>
    </View>
  );
}

import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { statsData } from "../data/stats.data";

export function GarageStats() {
  return (
    <View
      style={{
        width: "100%",

        marginTop: spacing.lg,

        paddingHorizontal: spacing.screen,

        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT */}
      <View
        style={{
          gap: 3,
        }}
      >
        <Text
          style={{
            ...typography.body.md,
            color: colors.mute,
          }}
        >
          Total Build Cost
        </Text>

        <Text
          style={{
            ...typography.display.title,
            color: colors.lime,
          }}
        >
          {statsData.totalCost}
        </Text>
      </View>

      {/* RIGHT */}
      <View
        style={{
          alignItems: "flex-end",
          gap: 3,
        }}
      >
        <Text
          style={{
            ...typography.body.md,
            color: colors.mute,
          }}
        >
          {statsData.brand}
        </Text>

        <Text
          style={{
            ...typography.heading.xl,
            color: colors.white,
          }}
        >
          {statsData.totalParts}
        </Text>
      </View>
    </View>
  );
}

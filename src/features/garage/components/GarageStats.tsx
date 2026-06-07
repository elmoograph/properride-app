import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { StatsData } from "../types/garage.types";

type Props = {
  stats: StatsData;
};

export function GarageStats({ stats }: Props) {
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
            color: colors.textSecondary,
          }}
        >
          Total Build Cost
        </Text>

        <Text
          style={{
            ...typography.heading.sm,
            color: colors.primary,
          }}
        >
          {stats.totalCost}
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
            color: colors.textSecondary,
          }}
        >
          {stats.brand}
        </Text>

        <Text
          style={{
            ...typography.heading.sm,
            color: colors.textPrimary,
          }}
        >
          {stats.totalParts}
        </Text>
      </View>
    </View>
  );
}

import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { StatsData } from "../types/garage.types";

type Props = {
  totalCost: string;
  latestUpgrade: string;
};
export function GarageStats({ totalCost, latestUpgrade }: Props) {
  return (
    <View
      style={{
        width: "100%",
        marginTop: spacing.lg,
        paddingHorizontal: spacing.screen,

        flexDirection: "row",

        justifyContent: "space-between",
      }}
    >
      <View>
        <Text
          style={{
            ...typography.body.md,
            color: colors.textSecondary,
          }}
        >
          Build Cost
        </Text>

        <Text
          style={{
            ...typography.heading.sm,
            color: colors.primary,
          }}
        >
          {totalCost}
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",

          flex: 1,

          marginLeft: 24,
        }}
      >
        <Text
          style={{
            ...typography.body.md,
            color: colors.textSecondary,
          }}
        >
          Latest Upgrade
        </Text>

        <Text
          numberOfLines={2}
          style={{
            ...typography.body.md,
            color: colors.textPrimary,

            textAlign: "right",
          }}
        >
          {latestUpgrade}
        </Text>
      </View>
    </View>
  );
}

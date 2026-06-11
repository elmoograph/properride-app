import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { StatsData } from "../types/garage.types";

type Props = {
  totalCost: string;
  totalParts: number;
  brand: string;
};

export function GarageStats({ totalCost, totalParts, brand }: Props) {
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
          Total Build Cost
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
        }}
      >
        <Text
          style={{
            ...typography.body.md,
            color: colors.textSecondary,
          }}
        >
          {brand}
        </Text>

        <Text
          style={{
            ...typography.heading.sm,
            color: colors.textPrimary,
          }}
        >
          {totalParts} Parts
        </Text>
      </View>
    </View>
  );
}

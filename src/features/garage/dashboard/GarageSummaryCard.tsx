import { Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { radius } from "@/constants/radius";

import { typography } from "@/styles/typography";

import { SummaryStat } from "./SummaryStat";

type Props = {
  totalCost: number;

  totalParts: number;

  totalEvents: number;

  totalPhotos: number;
};

export function GarageSummaryCard({
  totalCost,
  totalParts,
  totalEvents,
  totalPhotos,
}: Props) {
  return (
    <View
      style={{
        marginTop: -40,

        marginHorizontal: spacing.screen,

        backgroundColor: colors.card,

        borderRadius: radius.lg,

        padding: spacing.xl,

        zIndex: 100,

        elevation: 10,
      }}
    >
      <Text
        style={{
          ...typography.caption.md,
          color: colors.textSecondary,
        }}
      >
        BUILD SUMMARY
      </Text>

      <Text
        style={{
          ...typography.heading.lg,
          color: colors.orange,

          marginTop: spacing.xs,
        }}
      >
        Rp {totalCost.toLocaleString("id-ID")}
      </Text>

      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",

          marginTop: spacing.xl,
        }}
      >
        <SummaryStat value={totalParts} label="Parts" />

        <SummaryStat value={totalEvents} label="Events" />

        <SummaryStat value={totalPhotos} label="Photos" />
      </View>
    </View>
  );
}

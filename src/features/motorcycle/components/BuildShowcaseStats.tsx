import { StyleSheet, Text, View } from "react-native";
import { Settings } from "lucide-react-native";

import { spacing } from "@/src/theme";
import {
  MOTORCYCLE_SHOWCASE_COLORS,
  MOTORCYCLE_SHOWCASE_COPY,
} from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { MotorcycleDetailSummary } from "@/src/features/motorcycle/utils/motorcycleSummary";
import { formatCurrency } from "@/src/utils/format";

type BuildShowcaseStatsProps = {
  summary: MotorcycleDetailSummary;
};

export function BuildShowcaseStats({ summary }: BuildShowcaseStatsProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>
          {MOTORCYCLE_SHOWCASE_COPY.TOTAL_BUILD_COST}
        </Text>

        <Text style={styles.cost}>
          {formatCurrency(summary.estimatedBuildCost)}
        </Text>
      </View>

      <View style={styles.partsBox}>
        <View style={styles.partsLabelRow}>
          <Settings size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />

          <Text style={styles.label}>
            {MOTORCYCLE_SHOWCASE_COPY.TOTAL_PARTS}
          </Text>
        </View>

        <Text style={styles.partsCount}>{summary.totalParts}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing["2xl"],
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  label: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  cost: {
    marginTop: spacing.xs,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 26,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  partsBox: {
    alignItems: "flex-end",
  },
  partsLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  partsCount: {
    marginTop: spacing.sm,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
});

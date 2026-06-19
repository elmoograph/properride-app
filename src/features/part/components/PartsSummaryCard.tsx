import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { PartSummary } from "@/src/features/part/utils/partSummary";
import { formatCurrency } from "@/src/utils/format";

type PartsSummaryCardProps = {
  summary: PartSummary;
};

export function PartsSummaryCard({ summary }: PartsSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{PART_COPY.SUMMARY_TITLE}</Text>

      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.value}>{summary.totalParts}</Text>
          <Text style={styles.label}>{PART_COPY.SUMMARY_TOTAL_PARTS}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.value}>{summary.totalCategories}</Text>
          <Text style={styles.label}>{PART_COPY.SUMMARY_CATEGORIES}</Text>
        </View>
      </View>

      <View style={styles.costBox}>
        <Text style={styles.costLabel}>{PART_COPY.SUMMARY_TOTAL_COST}</Text>
        <Text style={styles.costValue}>
          {formatCurrency(summary.totalCost)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  grid: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  item: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  value: {
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 22,
    color: colors.textPrimary,
  },
  label: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  costBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  costLabel: {
    fontFamily: fontFamily.body.medium,
    fontSize: 12,
    color: colors.white,
    opacity: 0.85,
  },
  costValue: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 20,
    color: colors.white,
  },
});

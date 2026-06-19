import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type { MotorcycleDetailSummary } from "@/src/features/motorcycle/utils/motorcycleSummary";
import { formatCurrency } from "@/src/utils/format";

type MotorcycleSummaryCardProps = {
  summary: MotorcycleDetailSummary;
};

export function MotorcycleSummaryCard({ summary }: MotorcycleSummaryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{MOTORCYCLE_COPY.SUMMARY_TITLE}</Text>

      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.value}>{summary.totalParts}</Text>
          <Text style={styles.label}>
            {MOTORCYCLE_COPY.SUMMARY_TOTAL_PARTS}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.value}>{summary.totalGalleryPhotos}</Text>
          <Text style={styles.label}>
            {MOTORCYCLE_COPY.SUMMARY_GALLERY_PHOTOS}
          </Text>
        </View>
      </View>

      <View style={styles.costBox}>
        <Text style={styles.costLabel}>
          {MOTORCYCLE_COPY.SUMMARY_ESTIMATED_COST}
        </Text>

        <Text style={styles.costValue}>
          {formatCurrency(summary.estimatedBuildCost)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
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
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.white,
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

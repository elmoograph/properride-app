import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";
import {
  formatCurrency,
  formatDate,
  formatOptionalValue,
} from "@/src/utils/format";
import { RatingDisplay } from "@/src/features/part/components/RatingDisplay";

type PartInfoGridProps = {
  part: Part;
};

export function PartInfoGrid({ part }: PartInfoGridProps) {
  return (
    <View style={styles.grid}>
      <View style={styles.item}>
        <Text style={styles.label}>{PART_COPY.INFO_PRICE_TITLE}</Text>
        <Text style={styles.value}>{formatCurrency(part.price)}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>{PART_COPY.INFO_INSTALL_DATE_TITLE}</Text>
        <Text style={styles.value}>{formatDate(part.install_date)}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>{PART_COPY.INFO_WORKSHOP_TITLE}</Text>
        <Text style={styles.value} numberOfLines={1}>
          {formatOptionalValue(part.workshop)}
        </Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>{PART_COPY.INFO_RATING_TITLE}</Text>
        <RatingDisplay rating={part.rating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  item: {
    width: "47.8%",
    minHeight: 88,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: "center",
  },
  label: {
    fontFamily: fontFamily.body.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  value: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.headline.bold,
    fontSize: 15,
    color: colors.textPrimary,
  },
});

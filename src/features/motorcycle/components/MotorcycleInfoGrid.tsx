import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import {
  formatCc,
  formatMileage,
  formatOptionalValue,
} from "@/src/utils/format";

type MotorcycleInfoGridProps = {
  motorcycle: Motorcycle;
};

export function MotorcycleInfoGrid({ motorcycle }: MotorcycleInfoGridProps) {
  return (
    <View style={styles.grid}>
      <View style={styles.item}>
        <Text style={styles.label}>{MOTORCYCLE_COPY.INFO_YEAR_TITLE}</Text>
        <Text style={styles.value}>{formatOptionalValue(motorcycle.year)}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>{MOTORCYCLE_COPY.INFO_ENGINE_TITLE}</Text>
        <Text style={styles.value}>{formatCc(motorcycle.engine_cc)}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>{MOTORCYCLE_COPY.INFO_MILEAGE_TITLE}</Text>
        <Text style={styles.value}>{formatMileage(motorcycle.mileage)}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>{MOTORCYCLE_COPY.INFO_STATUS_TITLE}</Text>
        <Text style={styles.value}>
          {formatOptionalValue(motorcycle.status)}
        </Text>
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

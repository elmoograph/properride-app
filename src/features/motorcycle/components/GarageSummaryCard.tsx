import { StyleSheet, Text, View } from "react-native";
import { Bike, CircleDollarSign, Wrench } from "lucide-react-native";

import { spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { formatCurrency } from "@/src/utils/format";

type GarageSummaryCardProps = {
  motorcycleCount: number;
  partCount: number;
  buildValue: number;
};

export function GarageSummaryCard({
  motorcycleCount,
  partCount,
  buildValue,
}: GarageSummaryCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.iconBox}>
          <Bike size={18} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
        </View>
        <Text style={styles.value}>{motorcycleCount}</Text>
        <Text style={styles.label}>Motorcycles</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <View style={styles.iconBox}>
          <Wrench size={18} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
        </View>
        <Text style={styles.value}>{partCount}</Text>
        <Text style={styles.label}>Parts</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.item}>
        <View style={styles.iconBox}>
          <CircleDollarSign
            size={18}
            color={MOTORCYCLE_SHOWCASE_COLORS.background}
          />
        </View>
        <Text style={styles.value} numberOfLines={1}>
          {formatCurrency(buildValue)}
        </Text>
        <Text style={styles.label}>Build Value</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 112,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  iconBox: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  value: {
    marginTop: spacing.sm,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  label: {
    marginTop: 2,
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  divider: {
    width: 1,
    height: 58,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
});

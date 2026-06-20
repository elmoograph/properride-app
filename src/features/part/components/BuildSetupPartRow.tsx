import { Pressable, StyleSheet, Text, View } from "react-native";
import { CircleCheck, Tag } from "lucide-react-native";

import { spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { Part } from "@/src/features/part/types/part.types";
import { formatCurrency } from "@/src/utils/format";

type BuildSetupPartRowProps = {
  part: Part;
  onPress?: () => void;
};

function getPartTitle(part: Part): string {
  return (
    part.product_name ||
    part.custom_product_name ||
    part.brand ||
    part.custom_brand ||
    "-"
  );
}

function getPartBrand(part: Part): string {
  return part.brand || part.custom_brand || "-";
}

export function BuildSetupPartRow({ part, onPress }: BuildSetupPartRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <CircleCheck size={14} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {getPartTitle(part)}
        </Text>

        <Text style={styles.brand} numberOfLines={1}>
          {getPartBrand(part)}
        </Text>
      </View>

      <Text style={styles.price}>{formatCurrency(part.price)}</Text>

      <View style={styles.tagCircle}>
        <Tag size={11} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  brand: {
    marginTop: 2,
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
    textTransform: "uppercase",
  },
  price: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  tagCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
});

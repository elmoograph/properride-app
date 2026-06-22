import { StyleSheet, Text, View } from "react-native";
import {
  CalendarDays,
  CircleDollarSign,
  Star,
  Wrench,
} from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";
import {
  formatCurrency,
  formatDate,
  formatOptionalValue,
} from "@/src/utils/format";
import { radius, spacing } from "@/src/theme";
import type { ReactNode } from "react";

type PartInfoGridProps = {
  part: Part;
};

type InfoItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.iconWrapper}>{icon}</View>

      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

export function PartInfoGrid({ part }: PartInfoGridProps) {
  const ratingValue =
    part.rating !== null && part.rating !== undefined
      ? `${part.rating}/5`
      : PART_COPY.EMPTY_VALUE;

  return (
    <View style={styles.grid}>
      <InfoItem
        icon={
          <CircleDollarSign
            size={19}
            color={MOTORCYCLE_SHOWCASE_COLORS.accent}
          />
        }
        label={PART_COPY.INFO_PRICE_TITLE}
        value={formatCurrency(part.price)}
      />

      <InfoItem
        icon={<Star size={19} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />}
        label={PART_COPY.INFO_RATING_TITLE}
        value={ratingValue}
      />

      <InfoItem
        icon={
          <CalendarDays size={19} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
        }
        label={PART_COPY.INFO_INSTALL_DATE_TITLE}
        value={formatDate(part.install_date)}
      />

      <InfoItem
        icon={<Wrench size={19} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />}
        label={PART_COPY.INFO_WORKSHOP_TITLE}
        value={formatOptionalValue(part.workshop)}
      />
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
    minHeight: 130,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  label: {
    marginTop: spacing.md,
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  value: {
    marginTop: spacing.xs,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
});

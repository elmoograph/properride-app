import { StyleSheet, View } from "react-native";

import { AppCard } from "@/src/shared/components";
import { colors, spacing } from "@/src/shared/theme";

import type { GarageSummaryItem as GarageSummaryItemType } from "../types/garage.types";
import { GarageSummaryItem } from "./GarageSummaryItem";

type GarageSummaryCardProps = {
  items: GarageSummaryItemType[];
};

export function GarageSummaryCard({ items }: GarageSummaryCardProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.row}>
        {items.map((item, index) => (
          <View key={item.id} style={styles.itemWrapper}>
            <GarageSummaryItem item={item} />

            {index < items.length - 1 ? <View style={styles.divider} /> : null}
          </View>
        ))}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.screenX,
    marginTop: -spacing["2xl"],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 44,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.border.default,
  },
});

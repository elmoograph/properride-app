import { StyleSheet, Text, View } from "react-native";

import { spacing } from "@/src/theme";
import {
  MOTORCYCLE_SHOWCASE_COLORS,
  MOTORCYCLE_SHOWCASE_COPY,
} from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { BuildSetupPartRow } from "@/src/features/part/components/BuildSetupPartRow";
import type { Part } from "@/src/features/part/types/part.types";

type BuildSetupGroupCardProps = {
  category: string;
  parts: Part[];
  maxVisibleItems?: number;
  onPressPart: (partId: string) => void;
};

export function BuildSetupGroupCard({
  category,
  parts,
  maxVisibleItems = 3,
  onPressPart,
}: BuildSetupGroupCardProps) {
  const visibleParts = parts.slice(0, maxVisibleItems);
  const hasMoreParts = parts.length > maxVisibleItems;

  return (
    <View style={styles.container}>
      <Text style={styles.category}>
        • {category} ({parts.length})
      </Text>

      <View style={styles.card}>
        {visibleParts.map((part) => (
          <BuildSetupPartRow
            key={part.id}
            part={part}
            onPress={() => onPressPart(part.id)}
          />
        ))}

        {hasMoreParts ? (
          <Text style={styles.showMore}>
            {MOTORCYCLE_SHOWCASE_COPY.SHOW_MORE}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  category: {
    paddingHorizontal: spacing.sm,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  card: {
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 16,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  showMore: {
    paddingVertical: spacing.md,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
});

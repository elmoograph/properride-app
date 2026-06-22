import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { BuildSetupPartRow } from "@/src/features/part/components/BuildSetupPartRow";
import type { Part } from "@/src/features/part/types/part.types";
import { radius, spacing } from "@/src/theme";

type BuildSetupGroupCardProps = {
  category: string;
  parts: Part[];
  maxVisibleItems?: number;
  showVisibility?: boolean;
  onPressPart: (partId: string) => void;
};

export function BuildSetupGroupCard({
  category,
  parts,
  maxVisibleItems = 3,
  showVisibility = false,
  onPressPart,
}: BuildSetupGroupCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasMoreParts = parts.length > maxVisibleItems;

  const visibleParts = expanded ? parts : parts.slice(0, maxVisibleItems);

  function toggleExpanded() {
    setExpanded((current) => !current);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.category}>{category}</Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>{parts.length}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.list}>
          {visibleParts.map((part, index) => {
            const isLastItem =
              index === visibleParts.length - 1 && !hasMoreParts;

            return (
              <BuildSetupPartRow
                key={part.id}
                part={part}
                isLast={isLastItem}
                showVisibility={showVisibility}
                onPress={() => onPressPart(part.id)}
              />
            );
          })}
        </View>

        {hasMoreParts ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              expanded
                ? `Sembunyikan sebagian part kategori ${category}`
                : `Tampilkan semua part kategori ${category}`
            }
            onPress={toggleExpanded}
            style={({ pressed }) => [
              styles.showMoreButton,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.showMoreText}>
              {expanded
                ? "Tampilkan Lebih Sedikit"
                : `Tampilkan Semua (${parts.length})`}
            </Text>

            {expanded ? (
              <ChevronUp size={17} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
            ) : (
              <ChevronDown
                size={17}
                color={MOTORCYCLE_SHOWCASE_COLORS.accent}
              />
            )}
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  category: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  countText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  card: {
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  list: {
    paddingHorizontal: spacing.md,
  },
  showMoreButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  showMoreText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  pressed: {
    opacity: 0.72,
  },
});

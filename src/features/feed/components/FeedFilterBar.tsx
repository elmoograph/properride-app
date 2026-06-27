import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  FEED_FILTERS,
  type FeedFilterOption,
} from "@/src/features/feed/constants/feed.constants";
import type { FeedFilterKey } from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type FeedFilterBarProps = {
  activeFilter: FeedFilterKey;
  disabled?: boolean;
  onChangeFilter: (filter: FeedFilterKey) => void;
};

export function FeedFilterBar({
  activeFilter,
  disabled = false,
  onChangeFilter,
}: FeedFilterBarProps) {
  function renderFilter(option: FeedFilterOption) {
    const isActive = option.key === activeFilter;

    return (
      <Pressable
        key={option.key}
        disabled={disabled}
        style={({ pressed }) => [
          styles.chip,
          isActive ? styles.chipActive : null,
          pressed && !disabled ? styles.chipPressed : null,
          disabled ? styles.chipDisabled : null,
        ]}
        onPress={() => {
          onChangeFilter(option.key);
        }}
      >
        <Text style={[styles.label, isActive ? styles.labelActive : null]}>
          {option.label}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {FEED_FILTERS.map(renderFilter)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },
  content: {
    gap: spacing.sm,
    paddingRight: spacing.xl,
  },
  chip: {
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  chipActive: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  chipPressed: {
    opacity: 0.75,
  },
  chipDisabled: {
    opacity: 0.6,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  labelActive: {
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
});

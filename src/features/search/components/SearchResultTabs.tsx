import { Pressable, StyleSheet, Text, View } from "react-native";

import { SEARCH_COPY } from "@/src/features/search/constants/search.constants";
import type { SearchTabKey } from "@/src/features/search/types/search.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type SearchResultTabsProps = {
  activeTab: SearchTabKey;
  buildCount: number;
  riderCount: number;
  disabled?: boolean;
  onChangeTab: (tab: SearchTabKey) => void;
};

export function SearchResultTabs({
  activeTab,
  buildCount,
  riderCount,
  disabled = false,
  onChangeTab,
}: SearchResultTabsProps) {
  return (
    <View style={styles.container}>
      <SearchTabButton
        active={activeTab === "builds"}
        label={`${SEARCH_COPY.BUILDS_TAB} (${buildCount})`}
        disabled={disabled}
        onPress={() => onChangeTab("builds")}
      />

      <SearchTabButton
        active={activeTab === "riders"}
        label={`${SEARCH_COPY.RIDERS_TAB} (${riderCount})`}
        disabled={disabled}
        onPress={() => onChangeTab("riders")}
      />
    </View>
  );
}

type SearchTabButtonProps = {
  active: boolean;
  label: string;
  disabled: boolean;
  onPress: () => void;
};

function SearchTabButton({
  active,
  label,
  disabled,
  onPress,
}: SearchTabButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        selected: active,
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tab,
        active ? styles.tabActive : null,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <Text style={[styles.label, active ? styles.labelActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  tabActive: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  labelActive: {
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.5,
  },
});

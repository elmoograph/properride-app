import { Pressable, StyleSheet, Text, View } from "react-native";

import { spacing } from "@/src/theme";
import {
  MOTORCYCLE_SHOWCASE_COLORS,
  MOTORCYCLE_SHOWCASE_COPY,
  MOTORCYCLE_SHOWCASE_TABS,
} from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { MotorcycleShowcaseTab } from "@/src/features/motorcycle/types/motorcycle.types";

type BuildShowcaseTabsProps = {
  activeTab: MotorcycleShowcaseTab;
  onChangeTab: (tab: MotorcycleShowcaseTab) => void;
};

const TAB_ITEMS: {
  label: string;
  value: MotorcycleShowcaseTab;
}[] = [
  {
    label: MOTORCYCLE_SHOWCASE_COPY.TAB_SETUP,
    value: MOTORCYCLE_SHOWCASE_TABS.SETUP,
  },
  {
    label: MOTORCYCLE_SHOWCASE_COPY.TAB_TIMELINE,
    value: MOTORCYCLE_SHOWCASE_TABS.TIMELINE,
  },
  {
    label: MOTORCYCLE_SHOWCASE_COPY.TAB_GALLERY,
    value: MOTORCYCLE_SHOWCASE_TABS.GALLERY,
  },
];

export function BuildShowcaseTabs({
  activeTab,
  onChangeTab,
}: BuildShowcaseTabsProps) {
  return (
    <View style={styles.container}>
      {TAB_ITEMS.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Pressable
            key={tab.value}
            style={styles.tab}
            onPress={() => onChangeTab(tab.value)}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>

            {isActive ? <View style={styles.activeDot} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  tab: {
    flex: 1,
    paddingBottom: spacing.md,
    alignItems: "center",
  },
  tabText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  tabTextActive: {
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  activeDot: {
    position: "absolute",
    left: spacing.sm,
    top: 9,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
});

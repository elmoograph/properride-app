import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/src/shared/components";
import { colors, spacing } from "@/src/shared/theme";

import { GARAGE_TABS } from "../constants/garage.constants";
import type { GarageTabKey } from "../types/garage.types";

type GarageSegmentTabsProps = {
  activeTab: GarageTabKey;
  onChange: (tab: GarageTabKey) => void;
};

export function GarageSegmentTabs({
  activeTab,
  onChange,
}: GarageSegmentTabsProps) {
  return (
    <View style={styles.container}>
      {GARAGE_TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={styles.tab}
          >
            <AppText
              variant="bodyMedium"
              color={isActive ? "brand" : "secondary"}
            >
              {tab.label}
            </AppText>

            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: isActive
                    ? colors.brand.lime
                    : colors.transparent,
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.screenX,
    marginTop: spacing["2xl"],
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  indicator: {
    width: 28,
    height: 3,
    borderRadius: 999,
  },
});

import { ScrollView, StyleSheet, View } from "react-native";

import { colors, spacing } from "@/src/shared/theme";

import { GarageHero } from "../components/GarageHero";
import { GarageSegmentTabs } from "../components/GarageSegmentTabs";
import { GarageSetupTab } from "../components/GarageSetupTab";
import { GarageSummaryCard } from "../components/GarageSummaryCard";
import { useGarageScreen } from "../hooks/useGarageScreen";

export function GarageScreen() {
  const { motorcycle, summaryItems, activeTab, setActiveTab, partSections } =
    useGarageScreen();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <GarageHero motorcycle={motorcycle} />

        <GarageSummaryCard items={summaryItems} />

        <GarageSegmentTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "setup" ? (
          <GarageSetupTab sections={partSections} />
        ) : null}

        {activeTab === "timeline" ? <View style={styles.placeholder} /> : null}

        {activeTab === "gallery" ? <View style={styles.placeholder} /> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.app,
  },
  content: {
    paddingBottom: spacing["5xl"],
  },
  placeholder: {
    height: 320,
  },
});

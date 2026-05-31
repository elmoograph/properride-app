import { useState } from "react";

import { ScrollView, View, Text } from "react-native";

import { colors } from "../../src/constants/colors";

import { GarageHero } from "../../src/features/garage/components/GarageHero";
import { GarageProfile } from "../../src/features/garage/components/GarageProfile";
import { GarageIdentity } from "../../src/features/garage/components/GarageIdentity";
import { GarageLevelCard } from "../../src/features/garage/components/GarageLevelCard";
import { GarageStats } from "../../src/features/garage/components/GarageStats";
import { GarageTabs } from "../../src/features/garage/components/GarageTabs";
import { GarageSetupList } from "../../src/features/garage/components/GarageSetupList";

import { GarageTimelineList } from "../../src/features/garage/components/GarageTimelineList";
import { GarageGalleryGrid } from "../../src/features/garage/components/GarageGalleryGrid";

function TimelineSection() {
  return <GarageTimelineList />;
}

function GallerySection() {
  return <GarageGalleryGrid />;
}

export default function GarageScreen() {
  const [activeTab, setActiveTab] = useState("Setup");

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.primarytext,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <GarageHero />
        <GarageProfile />
        <GarageIdentity />
        <GarageLevelCard />
        <GarageStats />
        <GarageTabs activeTab={activeTab} onChangeTab={setActiveTab} /> ```tsx
        {activeTab === "Setup" && <GarageSetupList />}
        {activeTab === "Timeline" && <TimelineSection />}
        {activeTab === "Gallery" && <GallerySection />}
      </View>
    </ScrollView>
  );
}

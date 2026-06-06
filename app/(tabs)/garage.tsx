import { useState } from "react";

import { ScrollView, View, Text } from "react-native";

import { colors } from "@/constants/colors";

import { GarageHero } from "@/features/garage/components/GarageHero";
import { GarageProfile } from "@/features/garage/components/GarageProfile";
import { GarageIdentity } from "@/features/garage/components/GarageIdentity";
import { GarageStats } from "@/features/garage/components/GarageStats";
import { GarageTabs } from "@/features/garage/components/GarageTabs";
import { GarageSetupList } from "@/features/garage/components/GarageSetupList";

import { GarageTimelineList } from "@/features/garage/components/GarageTimelineList";

import { GarageGalleryGrid } from "@/features/garage/components/GarageGalleryGrid";

import { userData } from "@/features/garage/data/user.data";

import { statsData } from "@/features/garage/data/stats.data";

export default function GarageScreen() {
  const user = userData;
  const stats = statsData;
  const [activeTab, setActiveTab] = useState("Setup");

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <GarageHero />
        <GarageProfile user={user} />
        <GarageIdentity user={user} />
        <GarageStats stats={stats} />
        <GarageTabs activeTab={activeTab} onChangeTab={setActiveTab} />
        {activeTab === "Setup" && <GarageSetupList />}
        {activeTab === "Timeline" && <GarageTimelineList />}

        {activeTab === "Gallery" && <GarageGalleryGrid />}
      </View>
    </ScrollView>
  );
}

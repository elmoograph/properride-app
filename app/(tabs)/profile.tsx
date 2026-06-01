import { ScrollView, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { colors } from "../../src/constants/colors";

import { ProfileHeader } from "../../src/features/profile/components/ProfileHeader";

import { useState } from "react";

import { ProfileTabs } from "../../src/features/profile/components/ProfileTabs";

import { ProfileBuildGrid } from "../../src/features/profile/components/ProfileBuildGrid";

import { ProfileHero } from "../../src/features/profile/components/ProfileHero";

import { XPSection } from "../../src/features/profile/components/XPSection";
import { BadgeSection } from "../../src/features/profile/components/BadgeSection";
import { ActivitySection } from "../../src/features/profile/components/ActivitySection";
import { ProfileMenuItem } from "../../src/features/profile/components/ProfileMenuItem";
import { ProfileMenuSection } from "../../src/features/profile/components/ProfileMenuSection";
import { RidingAreaCard } from "../../src/features/profile/components/RidingAreaCard";
import { LogoutButton } from "../../src/features/profile/components/LogoutButton";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("Builds");

  return (
    <>
      <StatusBar hidden />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.primarytext,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingBottom: 140,
          }}
        >
          <ProfileHeader />
          <ProfileHero />
          <XPSection />
          <BadgeSection />
          <ActivitySection />
          <ProfileMenuSection />
          <RidingAreaCard />
          <LogoutButton />
        </View>
      </ScrollView>
    </>
  );
}

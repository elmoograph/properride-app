import { ScrollView, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { colors } from "../../src/constants/colors";

import { ProfileHeader } from "../../src/features/profile/components/ProfileHeader";

import { ProfileHero } from "../../src/features/profile/components/ProfileHero";

import { ActivitySection } from "../../src/features/profile/components/ActivitySection";
import { ProfileMenuSection } from "../../src/features/profile/components/ProfileMenuSection";
import { RidingAreaCard } from "../../src/features/profile/components/RidingAreaCard";
import { LogoutButton } from "../../src/features/profile/components/LogoutButton";

export default function ProfileScreen() {
  return (
    <>
      <StatusBar hidden />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background,
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
          <ActivitySection />
          <ProfileMenuSection />
          <RidingAreaCard />
          <LogoutButton />
        </View>
      </ScrollView>
    </>
  );
}

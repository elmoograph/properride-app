import { ScrollView, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { colors } from "@/constants/colors";

import { ProfileHeader } from "@/features/profile/components/ProfileHeader";

import { ProfileHero } from "@/features/profile/components/ProfileHero";
// import { getProfile } from "@/features/profile/repositories/profile.repository";

import { ActivitySection } from "@/features/profile/components/ActivitySection";
import { ProfileMenuSection } from "@/features/profile/components/ProfileMenuSection";
import { RidingAreaCard } from "@/features/profile/components/RidingAreaCard";
import { LogoutButton } from "@/features/profile/components/LogoutButton";
import { spacing } from "@/constants/spacing";

export default function profileScreen() {
  const profile = {
    id: "",
    name: "Loading...",
    username: "@loading",
    location: "",
    avatar: "PR",
    followers: 0,
    following: 0,
    posts: 0,
  };
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
            paddingBottom: spacing["3xl"],
          }}
        >
          <ProfileHeader />
          <ProfileHero profile={profile} />
          {/* <ActivitySection /> */}
          <ProfileMenuSection />
          <RidingAreaCard />
          <LogoutButton />
        </View>
      </ScrollView>
    </>
  );
}

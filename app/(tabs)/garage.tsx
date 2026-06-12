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
import { useGarage } from "@/features/garage/hooks/useGarage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";
import { useParts } from "@/features/parts/hooks/useParts";
import { useGarageAnalytics } from "@/features/garage/hooks/useGarageAnalytics";

import { GarageSummaryCard } from "@/features/garage/dashboard/GarageSummaryCard";
import { GarageHeroV2 } from "@/features/garage/dashboard/GarageHeroV2";

export default function GarageScreen() {
  const [activeTab, setActiveTab] = useState("Setup");
  const { garage, loading } = useGarage();
  const {
    motorcycles,
    featuredMotorcycle,
    loading: motorcycleLoading,
  } = useMotorcycles();

  const { parts, totalParts, totalCost, loading: partsLoading } = useParts();
  const analytics = useGarageAnalytics();

  if (loading || motorcycleLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!featuredMotorcycle) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No Motorcycle Yet</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar hidden />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <GarageHero
            motorcycleName={featuredMotorcycle?.name}
            motorcycles={motorcycles}
            featuredMotorcycle={featuredMotorcycle}
          />

          {/* <GarageHeroV2
            imageUrl={featuredMotorcycle?.image_url}
            name={featuredMotorcycle?.name ?? "No Motorcycle"}
            nickname={featuredMotorcycle?.nickname}
          />

          <GarageSummaryCard
            totalCost={0}
            totalParts={0}
            totalEvents={0}
            totalPhotos={0}
          /> */}
          <GarageIdentity
            garageName={garage?.name ?? "Garage"}
            location={garage?.location ?? "-"}
            motorcycleBrand={featuredMotorcycle?.brand}
            motorcycleModel={featuredMotorcycle?.model}
          />
          <GarageProfile
            totalParts={analytics.totalParts}
            totalEvents={analytics.totalEvents}
            totalPhotos={analytics.totalPhotos}
          />
          <GarageStats
            totalCost={`Rp ${analytics.totalCost.toLocaleString("id-ID")}`}
            latestUpgrade={analytics.latestUpgrade}
          />

          <GarageTabs activeTab={activeTab} onChangeTab={setActiveTab} />
          {activeTab === "Setup" && (
            <GarageSetupList parts={parts} loading={partsLoading} />
          )}
          {activeTab === "Timeline" && <GarageTimelineList />}

          {activeTab === "Gallery" && <GarageGalleryGrid />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

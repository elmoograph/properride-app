import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { useProfile } from "@/features/profile/hooks/useProfile";
import { useGarage } from "@/features/garage/hooks/useGarage";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";

export function AuthGate() {
  const router = useRouter();
  const segments = useSegments();

  const { user, loading } = useAuth();

  const { profile, loading: profileLoading } = useProfile();
  const { garage, loading: garageLoading } = useGarage();

  const { hasMotorcycles, loading: motorcyclesLoading } = useMotorcycles();

  useEffect(() => {
    if (loading || profileLoading || garageLoading) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";
    const inMotorcycleOnboarding =
      segments[0] === "onboarding" && segments.includes("motorcycle");

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
      return;
    }

    if (user && !profile && !profileLoading && !inOnboarding) {
      router.replace("/onboarding/profile");
      return;
    }
    if (user && profile && !garage && !inOnboarding) {
      return;
    }
    if (
      user &&
      profile &&
      garage &&
      !hasMotorcycles &&
      !inMotorcycleOnboarding &&
      !inAuthGroup
    ) {
      router.replace("/onboarding/motorcycle");
      return;
    }
    if (
      user &&
      profile &&
      garage &&
      hasMotorcycles &&
      (inAuthGroup || inOnboarding)
    ) {
      router.replace("/(tabs)");
    }
  }, [
    user,
    profile,
    garage,
    hasMotorcycles,
    loading,
    profileLoading,
    garageLoading,
    motorcyclesLoading,
    segments,
  ]);

  return null;
}

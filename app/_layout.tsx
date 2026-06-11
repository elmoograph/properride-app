import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/providers/AuthProvider";

import { AuthGate } from "@/components/AuthGate";
import { ProfileProvider } from "@/providers/ProfileProvider";

export default function RootLayout() {
  const [loaded] = useFonts({
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),

    "Inter-Regular": require("../assets/fonts/interRegular.ttf"),
    "Inter-Medium": require("../assets/fonts/interMedium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/interSemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/interBold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/interExtraBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProfileProvider>
          <AuthGate />

          <StatusBar hidden />

          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ProfileProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

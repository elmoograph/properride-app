import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  router,
  usePathname,
  useRootNavigationState,
  useSegments,
} from "expo-router";

import { colors } from "@/src/theme";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { getProfile } from "@/src/features/profile/repositories/profile.repository";

export function AuthGate() {
  const pathname = usePathname();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  const { user, loading } = useAuth();

  const [checkingProfile, setCheckingProfile] = useState(false);

  const currentSegment = segments[0];

  const inAuthGroup = currentSegment === "(auth)";
  const inProfileSetup = pathname === ROUTES.PROFILE_SETUP;

  const shouldShowLoading = useMemo(() => {
    return loading || checkingProfile || !rootNavigationState?.key;
  }, [loading, checkingProfile, rootNavigationState?.key]);

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    if (loading) return;

    let isActive = true;

    async function resolveRoute() {
      try {
        if (!user) {
          if (!inAuthGroup) {
            router.replace(ROUTES.AUTH.LOGIN);
          }

          return;
        }

        setCheckingProfile(true);

        const profile = await getProfile(user.id);

        if (!isActive) return;

        if (!profile || !profile.is_completed) {
          if (!inProfileSetup) {
            router.replace(ROUTES.PROFILE_SETUP);
          }

          return;
        }

        if (inAuthGroup || inProfileSetup || pathname === "/") {
          router.replace(ROUTES.TABS.HOME);
        }
      } catch (error) {
        console.error("AuthGate route resolve failed:", error);

        if (!user && !inAuthGroup) {
          router.replace(ROUTES.AUTH.LOGIN);
        }
      } finally {
        if (isActive) {
          setCheckingProfile(false);
        }
      }
    }

    resolveRoute();

    return () => {
      isActive = false;
    };
  }, [
    rootNavigationState?.key,
    loading,
    user?.id,
    inAuthGroup,
    inProfileSetup,
    pathname,
  ]);

  if (shouldShowLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
});

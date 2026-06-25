import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Mail, Settings } from "lucide-react-native";
import { ROUTES } from "@/src/constants/routes";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { getMyMotorcycles } from "@/src/features/motorcycle/repositories/motorcycle.repository";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { ProfileHero } from "@/src/features/profile/components/ProfileHero";
import { ProfileStats } from "@/src/features/profile/components/ProfileStats";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { getProfile } from "@/src/features/profile/repositories/profile.repository";
import type { Profile } from "@/src/features/profile/types/profile.types";
import { radius, spacing } from "@/src/theme";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const userId = user?.id;

  const [profile, setProfile] = useState<Profile | null>(null);

  const [buildCount, setBuildCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [loadFailed, setLoadFailed] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setBuildCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadFailed(false);

    try {
      const [profileData, motorcycleData] = await Promise.all([
        getProfile(userId),
        getMyMotorcycles(userId),
      ]);

      setProfile(profileData);
      setBuildCount(motorcycleData.length);
    } catch (error) {
      console.error("Gagal memuat Profile:", error);

      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      void loadProfile();
    }, [loadProfile]),
  );

  function handleEditProfile() {
    router.push(ROUTES.PROFILE.EDIT);
  }

  function handleOpenSettings() {
    Alert.alert(
      PROFILE_COPY.SETTINGS_BUTTON,
      "Settings akan dibuat pada phase berikutnya.",
    );
  }

  function confirmLogout() {
    if (loggingOut) {
      return;
    }

    Alert.alert(
      PROFILE_COPY.LOGOUT_CONFIRM_TITLE,
      PROFILE_COPY.LOGOUT_CONFIRM_MESSAGE,
      [
        {
          text: PROFILE_COPY.LOGOUT_CANCEL,
          style: "cancel",
        },
        {
          text: PROFILE_COPY.LOGOUT_CONFIRM,
          style: "destructive",
          onPress: () => {
            void handleLogout();
          },
        },
      ],
    );
  }

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        PROFILE_COPY.LOGOUT_FAILED_TITLE,
        PROFILE_COPY.LOGOUT_FAILED_MESSAGE,
      );
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
      </Screen>
    );
  }

  if (loadFailed) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={PROFILE_COPY.LOAD_FAILED_TITLE}
          description={PROFILE_COPY.LOAD_FAILED_MESSAGE}
          action={
            <AppButton
              theme="dark"
              title={PROFILE_COPY.RETRY_BUTTON}
              onPress={() => {
                void loadProfile();
              }}
            />
          }
        />
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
      contentContainerStyle={styles.container}
    >
      <PageHeader
        title={PROFILE_COPY.SCREEN_TITLE}
        subtitle={PROFILE_COPY.SCREEN_SUBTITLE}
      />

      <ProfileHero profile={profile} />

      <ProfileStats
        buildCount={buildCount}
        followerCount={0}
        followingCount={0}
      />

      <View style={styles.primaryActions}>
        <AppButton
          theme="dark"
          title={PROFILE_COPY.EDIT_PROFILE_BUTTON}
          onPress={handleEditProfile}
        />

        <AppButton
          theme="dark"
          title={PROFILE_COPY.SETTINGS_BUTTON}
          variant="secondary"
          onPress={handleOpenSettings}
        />
      </View>

      <View style={styles.accountCard}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.accountRow}>
          <View style={styles.accountIcon}>
            <Mail size={18} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
          </View>

          <View style={styles.accountContent}>
            <Text style={styles.accountLabel}>{PROFILE_COPY.EMAIL_LABEL}</Text>

            <Text style={styles.accountValue} numberOfLines={1}>
              {user?.email ?? PROFILE_COPY.EMAIL_EMPTY}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.previewRow}>
          <Settings
            size={18}
            color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary}
          />

          <Text style={styles.previewText}>Pengaturan akun dan privasi</Text>
        </View>
      </View>

      <AppButton
        title={PROFILE_COPY.LOGOUT_BUTTON}
        variant="danger"
        loading={loggingOut}
        disabled={loggingOut}
        onPress={confirmLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["2xl"],
    paddingBottom: spacing["5xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  primaryActions: {
    gap: spacing.md,
  },
  accountCard: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  sectionTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  accountIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  accountContent: {
    flex: 1,
  },
  accountLabel: {
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  accountValue: {
    marginTop: spacing.xs,
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  divider: {
    height: 1,
    marginVertical: spacing.lg,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  previewText: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
});

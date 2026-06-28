import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { ProfileHero } from "@/src/features/profile/components/ProfileHero";
import { ProfileStats } from "@/src/features/profile/components/ProfileStats";
import { PublicProfileActions } from "@/src/features/profile/components/PublicProfileActions";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import {
  followUser,
  getFollowErrorMessage,
  getFollowStats,
  getIsFollowing,
  unfollowUser,
} from "@/src/features/profile/repositories/follow.repository";
import { getProfile } from "@/src/features/profile/repositories/profile.repository";
import type { FollowStats } from "@/src/features/profile/types/follow.types";
import type { Profile } from "@/src/features/profile/types/profile.types";
import { radius, spacing } from "@/src/theme";
import { ProfileBuildCard } from "@/src/features/profile/components/ProfileBuildCard";
import { getPublicMotorcyclesByUserId } from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

import { ReportContentModal } from "@/src/features/safety/components/ReportContentModal";
import { SAFETY_COPY } from "@/src/features/safety/constants/safety.constants";
import {
  blockUser,
  createContentReport,
  isUserBlocked,
} from "@/src/features/safety/repositories/safety.repository";
import type { ReportReason } from "@/src/features/safety/types/safety.types";

const INITIAL_FOLLOW_STATS: FollowStats = {
  followerCount: 0,
  followingCount: 0,
};

export default function PublicProfileScreen() {
  const { user } = useAuth();

  const params = useLocalSearchParams<{
    userId?: string | string[];
  }>();

  const profileUserId = useMemo(() => {
    const value = params.userId;

    return Array.isArray(value) ? value[0] : value;
  }, [params.userId]);

  const viewerUserId = user?.id;
  const isOwner = Boolean(viewerUserId) && viewerUserId === profileUserId;
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [followStats, setFollowStats] =
    useState<FollowStats>(INITIAL_FOLLOW_STATS);
  const buildCount = motorcycles.length;
  const [isFollowing, setIsFollowing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const [isBlocked, setIsBlocked] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);

  const loadPublicProfile = useCallback(async () => {
    if (!profileUserId) {
      setProfile(null);
      setMotorcycles([]);
      setFollowStats(INITIAL_FOLLOW_STATS);
      setIsFollowing(false);
      setIsBlocked(false);
      setLoading(false);
      setLoadFailed(false);
      return;
    }

    setLoading(true);
    setLoadFailed(false);

    try {
      const profileRequest = getProfile(profileUserId);
      const followStatsRequest = getFollowStats(profileUserId);
      const motorcyclesRequest = getPublicMotorcyclesByUserId(profileUserId);

      const followingRequest =
        viewerUserId && viewerUserId !== profileUserId
          ? getIsFollowing({
              followerId: viewerUserId,
              followingId: profileUserId,
            })
          : Promise.resolve(false);

      const blockedRequest =
        viewerUserId && viewerUserId !== profileUserId
          ? isUserBlocked({
              blockerId: viewerUserId,
              blockedId: profileUserId,
            })
          : Promise.resolve(false);

      const [
        profileData,
        statsData,
        motorcyclesData,
        followingData,
        blockedData,
      ] = await Promise.all([
        profileRequest,
        followStatsRequest,
        motorcyclesRequest,
        followingRequest,
        blockedRequest,
      ]);

      setProfile(profileData);
      setFollowStats(statsData);
      setMotorcycles(motorcyclesData);
      setIsFollowing(followingData);
      setIsBlocked(blockedData);
    } catch (error) {
      console.error("Gagal memuat Public Profile:", error);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [profileUserId, viewerUserId]);

  useFocusEffect(
    useCallback(() => {
      void loadPublicProfile();
    }, [loadPublicProfile]),
  );

  async function handleFollow() {
    if (!viewerUserId || !profileUserId || isOwner || followLoading) {
      return;
    }

    setFollowLoading(true);

    try {
      await followUser({
        followerId: viewerUserId,
        followingId: profileUserId,
      });

      setIsFollowing(true);

      setFollowStats((currentStats) => ({
        ...currentStats,
        followerCount: currentStats.followerCount + 1,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : "";

      const alreadyFollowing =
        message.includes("duplicate key") || message.includes("follows_pkey");

      if (alreadyFollowing) {
        setIsFollowing(true);
        return;
      }

      Alert.alert(
        PROFILE_COPY.PUBLIC.FOLLOW_FAILED_TITLE,
        getFollowErrorMessage(error),
      );
    } finally {
      setFollowLoading(false);
    }
  }

  function confirmUnfollow() {
    if (!viewerUserId || !profileUserId || isOwner || followLoading) {
      return;
    }

    Alert.alert(
      PROFILE_COPY.PUBLIC.UNFOLLOW_TITLE,
      PROFILE_COPY.PUBLIC.UNFOLLOW_MESSAGE,
      [
        {
          text: PROFILE_COPY.PUBLIC.UNFOLLOW_CANCEL,
          style: "cancel",
        },
        {
          text: PROFILE_COPY.PUBLIC.UNFOLLOW_CONFIRM,
          style: "destructive",
          onPress: () => {
            void handleUnfollow();
          },
        },
      ],
    );
  }

  async function handleUnfollow() {
    if (!viewerUserId || !profileUserId || isOwner || followLoading) {
      return;
    }

    setFollowLoading(true);

    try {
      await unfollowUser({
        followerId: viewerUserId,
        followingId: profileUserId,
      });

      setIsFollowing(false);

      setFollowStats((currentStats) => ({
        ...currentStats,
        followerCount: Math.max(0, currentStats.followerCount - 1),
      }));
    } catch (error) {
      Alert.alert(
        PROFILE_COPY.PUBLIC.FOLLOW_FAILED_TITLE,
        getFollowErrorMessage(error),
      );
    } finally {
      setFollowLoading(false);
    }
  }

  function confirmBlockUser() {
    if (!viewerUserId || !profileUserId || isOwner || blockLoading) {
      return;
    }

    Alert.alert(SAFETY_COPY.BLOCK_USER_TITLE, SAFETY_COPY.BLOCK_USER_MESSAGE, [
      {
        text: SAFETY_COPY.BLOCK_USER_CANCEL,
        style: "cancel",
      },
      {
        text: SAFETY_COPY.BLOCK_USER_CONFIRM,
        style: "destructive",
        onPress: () => {
          void handleBlockUser();
        },
      },
    ]);
  }

  async function handleBlockUser() {
    if (!viewerUserId || !profileUserId || isOwner || blockLoading) {
      return;
    }

    try {
      setBlockLoading(true);

      await blockUser({
        blockerId: viewerUserId,
        blockedId: profileUserId,
      });

      setIsBlocked(true);
      setIsFollowing(false);
      setMotorcycles([]);

      Alert.alert(
        SAFETY_COPY.BLOCK_SUCCESS_TITLE,
        SAFETY_COPY.BLOCK_SUCCESS_MESSAGE,
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        SAFETY_COPY.BLOCK_FAILED_TITLE,
        SAFETY_COPY.BLOCK_FAILED_MESSAGE,
      );
    } finally {
      setBlockLoading(false);
    }
  }

  function handleOpenReportProfile() {
    if (!viewerUserId || !profileUserId || isOwner || reportSubmitting) {
      return;
    }

    setReportModalVisible(true);
  }

  function handleCloseReportProfile() {
    if (reportSubmitting) {
      return;
    }

    setReportModalVisible(false);
  }

  async function handleSubmitReportProfile(params: {
    reason: ReportReason;
    details: string;
  }) {
    if (!viewerUserId || !profileUserId || isOwner || reportSubmitting) {
      return;
    }

    try {
      setReportSubmitting(true);

      await createContentReport({
        reporterId: viewerUserId,
        reportedUserId: profileUserId,
        reason: params.reason,
        details: params.details,
      });

      setReportModalVisible(false);

      Alert.alert(
        SAFETY_COPY.REPORT_SUCCESS_TITLE,
        SAFETY_COPY.REPORT_SUCCESS_MESSAGE,
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        SAFETY_COPY.REPORT_FAILED_TITLE,
        SAFETY_COPY.REPORT_FAILED_MESSAGE,
      );
    } finally {
      setReportSubmitting(false);
    }
  }

  function handleOpenBuild(motorcycleId: string) {
    router.push(ROUTES.MOTORCYCLE.DETAIL(motorcycleId));
  }

  function handleEditProfile() {
    router.push(ROUTES.PROFILE.EDIT);
  }

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.TABS.PROFILE);
  }
  function handleOpenFollowers() {
    if (!profileUserId) {
      return;
    }

    router.push(ROUTES.PROFILE.FOLLOWERS(profileUserId));
  }

  function handleOpenFollowing() {
    if (!profileUserId) {
      return;
    }

    router.push(ROUTES.PROFILE.FOLLOWING(profileUserId));
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
          title={PROFILE_COPY.PUBLIC.LOAD_FAILED_TITLE}
          description={PROFILE_COPY.PUBLIC.LOAD_FAILED_MESSAGE}
          action={
            <AppButton
              theme="dark"
              title={PROFILE_COPY.PUBLIC.RETRY_BUTTON}
              onPress={() => {
                void loadPublicProfile();
              }}
            />
          }
        />
      </Screen>
    );
  }

  if (!profile) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={PROFILE_COPY.PUBLIC.NOT_FOUND_TITLE}
          description={PROFILE_COPY.PUBLIC.NOT_FOUND_MESSAGE}
          action={
            <AppButton
              theme="dark"
              variant="secondary"
              title={COMMON_COPY.BACK}
              onPress={handleBack}
            />
          }
        />
      </Screen>
    );
  }
  if (isBlocked && !isOwner) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={SAFETY_COPY.BLOCKED_PROFILE_TITLE}
          description={SAFETY_COPY.BLOCKED_PROFILE_DESCRIPTION}
          action={
            <AppButton
              theme="dark"
              variant="secondary"
              title={COMMON_COPY.BACK}
              onPress={handleBack}
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
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed ? styles.backButtonPressed : null,
          ]}
          onPress={handleBack}
        >
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <PageHeader
          variant="dark"
          eyebrow={PROFILE_COPY.PUBLIC.SCREEN_EYEBROW}
          title={profile.full_name?.trim() || "Rider ProperRide"}
          subtitle={PROFILE_COPY.PUBLIC.SCREEN_SUBTITLE}
        />
      </View>

      <ProfileHero profile={profile} />

      <ProfileStats
        buildCount={buildCount}
        followerCount={followStats.followerCount}
        followingCount={followStats.followingCount}
        onPressFollowers={handleOpenFollowers}
        onPressFollowing={handleOpenFollowing}
      />

      {!isBlocked ? (
        <PublicProfileActions
          isOwner={isOwner}
          isFollowing={isFollowing}
          loading={followLoading}
          onEditProfile={handleEditProfile}
          onFollow={handleFollow}
          onUnfollow={confirmUnfollow}
        />
      ) : null}

      {!isOwner ? (
        <View style={styles.safetyActions}>
          <Pressable
            accessibilityRole="button"
            disabled={reportSubmitting || blockLoading}
            onPress={handleOpenReportProfile}
            style={({ pressed }) => [
              styles.safetyButton,
              pressed ? styles.safetyButtonPressed : null,
              reportSubmitting || blockLoading
                ? styles.safetyButtonDisabled
                : null,
            ]}
          >
            <Text style={styles.safetyButtonText}>
              {SAFETY_COPY.REPORT_PROFILE_TITLE}
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            disabled={reportSubmitting || blockLoading}
            onPress={confirmBlockUser}
            style={({ pressed }) => [
              styles.safetyButton,
              styles.blockButton,
              pressed ? styles.safetyButtonPressed : null,
              reportSubmitting || blockLoading
                ? styles.safetyButtonDisabled
                : null,
            ]}
          >
            <Text style={[styles.safetyButtonText, styles.blockButtonText]}>
              {blockLoading
                ? SAFETY_COPY.BLOCK_USER_LOADING
                : SAFETY_COPY.BLOCK_USER_TITLE}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {!isBlocked ? (
        <View style={styles.buildSection}>
          <Text style={styles.sectionTitle}>
            {PROFILE_COPY.PUBLIC.BUILDS_SECTION_TITLE}
          </Text>

          <Text style={styles.sectionSubtitle}>
            {PROFILE_COPY.PUBLIC.BUILDS_SECTION_SUBTITLE}
          </Text>

          {motorcycles.length === 0 ? (
            <View style={styles.emptyBuildCard}>
              <Text style={styles.emptyBuildTitle}>
                {PROFILE_COPY.PUBLIC.BUILDS_EMPTY_TITLE}
              </Text>

              <Text style={styles.emptyBuildDescription}>
                {PROFILE_COPY.PUBLIC.BUILDS_EMPTY_MESSAGE}
              </Text>
            </View>
          ) : (
            <View style={styles.buildList}>
              {motorcycles.map((motorcycle) => (
                <ProfileBuildCard
                  key={motorcycle.id}
                  motorcycle={motorcycle}
                  onPress={() => {
                    handleOpenBuild(motorcycle.id);
                  }}
                />
              ))}
            </View>
          )}
        </View>
      ) : null}

      <ReportContentModal
        visible={reportModalVisible}
        title={SAFETY_COPY.REPORT_PROFILE_TITLE}
        submitting={reportSubmitting}
        onClose={handleCloseReportProfile}
        onSubmit={handleSubmitReportProfile}
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
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  backButtonPressed: {
    opacity: 0.76,
  },
  buildSection: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  emptyBuildCard: {
    marginTop: spacing.sm,
    padding: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  emptyBuildTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 15,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  emptyBuildDescription: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  buildList: {
    gap: spacing.lg,
    marginTop: spacing.sm,
  },

  safetyActions: {
    flexDirection: "row",
    gap: spacing.md,
  },
  safetyButton: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  blockButton: {
    borderColor: "rgba(255,99,99,0.45)",
    backgroundColor: "rgba(255,99,99,0.1)",
  },
  safetyButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  blockButtonText: {
    color: "#FF8A8A",
  },
  safetyButtonPressed: {
    opacity: 0.72,
  },
  safetyButtonDisabled: {
    opacity: 0.5,
  },
});

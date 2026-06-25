import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { RiderListItem } from "@/src/features/profile/components/RiderListItem";
import {
  followUser,
  getFollowErrorMessage,
  getFollowerProfiles,
  getFollowingProfiles,
  getFollowingUserIds,
  unfollowUser,
} from "@/src/features/profile/repositories/follow.repository";
import type { FollowProfile } from "@/src/features/profile/types/follow.types";
import { radius, spacing } from "@/src/theme";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { ArrowLeft } from "lucide-react-native";

type FollowListMode = "followers" | "following";

type FollowProfileListScreenProps = {
  userId: string;
  mode: FollowListMode;
};

export function FollowProfileListScreen({
  userId,
  mode,
}: FollowProfileListScreenProps) {
  const { user } = useAuth();
  const viewerUserId = user?.id;

  const [profiles, setProfiles] = useState<FollowProfile[]>([]);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadProfiles = useCallback(async () => {
    if (!userId) {
      setProfiles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadFailed(false);

    try {
      const profileData =
        mode === "followers"
          ? await getFollowerProfiles(userId)
          : await getFollowingProfiles(userId);

      let viewerFollowingIds = new Set<string>();

      if (viewerUserId) {
        viewerFollowingIds = await getFollowingUserIds(
          viewerUserId,
          profileData.map((profile) => profile.id),
        );
      }

      setProfiles(profileData);
      setFollowingIds(viewerFollowingIds);
    } catch (error) {
      console.error("Gagal memuat daftar rider:", error);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [mode, userId, viewerUserId]);

  useFocusEffect(
    useCallback(() => {
      void loadProfiles();
    }, [loadProfiles]),
  );

  function setItemLoading(profileId: string, isLoading: boolean) {
    setLoadingIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (isLoading) {
        nextIds.add(profileId);
      } else {
        nextIds.delete(profileId);
      }

      return nextIds;
    });
  }

  async function handleFollow(profileId: string) {
    if (!viewerUserId || loadingIds.has(profileId)) {
      return;
    }

    setItemLoading(profileId, true);

    try {
      await unfollowUser({
        followerId: viewerUserId,
        followingId: profileId,
      });

      setFollowingIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(profileId);
        return nextIds;
      });

      if (mode === "following" && userId === viewerUserId) {
        setProfiles((currentProfiles) =>
          currentProfiles.filter((profile) => profile.id !== profileId),
        );
      }
    } catch (error) {
      Alert.alert(
        PROFILE_COPY.PUBLIC.FOLLOW_FAILED_TITLE,
        getFollowErrorMessage(error),
      );
    }
  }

  function confirmUnfollow(profileId: string) {
    Alert.alert(
      PROFILE_COPY.FOLLOW_LIST.UNFOLLOW_TITLE,
      PROFILE_COPY.FOLLOW_LIST.UNFOLLOW_MESSAGE,
      [
        {
          text: PROFILE_COPY.FOLLOW_LIST.UNFOLLOW_CANCEL,
          style: "cancel",
        },
        {
          text: PROFILE_COPY.FOLLOW_LIST.UNFOLLOW_CONFIRM,
          style: "destructive",
          onPress: () => {
            void handleUnfollow(profileId);
          },
        },
      ],
    );
  }

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.PROFILE.PUBLIC(userId));
  }

  async function handleUnfollow(profileId: string) {
    if (!viewerUserId || loadingIds.has(profileId)) {
      return;
    }

    setItemLoading(profileId, true);

    try {
      await unfollowUser({
        followerId: viewerUserId,
        followingId: profileId,
      });

      setFollowingIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(profileId);
        return nextIds;
      });
    } catch (error) {
      Alert.alert(
        PROFILE_COPY.PUBLIC.FOLLOW_FAILED_TITLE,
        getFollowErrorMessage(error),
      );
    } finally {
      setItemLoading(profileId, false);
    }
  }

  function handleOpenProfile(profileId: string) {
    router.push(ROUTES.PROFILE.PUBLIC(profileId));
  }

  if (loading) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.center}
      >
        <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
      </Screen>
    );
  }

  if (loadFailed) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.center}
      >
        <EmptyState
          variant="dark"
          title={PROFILE_COPY.FOLLOW_LIST.LOAD_FAILED_TITLE}
          description={PROFILE_COPY.FOLLOW_LIST.LOAD_FAILED_MESSAGE}
          action={
            <AppButton
              theme="dark"
              title={PROFILE_COPY.FOLLOW_LIST.RETRY_BUTTON}
              onPress={() => {
                void loadProfiles();
              }}
            />
          }
        />
      </Screen>
    );
  }

  const isFollowers = mode === "followers";

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
          eyebrow="Rider Network"
          title={
            isFollowers
              ? PROFILE_COPY.FOLLOW_LIST.FOLLOWERS_TITLE
              : PROFILE_COPY.FOLLOW_LIST.FOLLOWING_TITLE
          }
          subtitle={
            isFollowers
              ? PROFILE_COPY.FOLLOW_LIST.FOLLOWERS_SUBTITLE
              : PROFILE_COPY.FOLLOW_LIST.FOLLOWING_SUBTITLE
          }
        />
      </View>

      {profiles.length === 0 ? (
        <EmptyState
          variant="dark"
          title={
            isFollowers
              ? PROFILE_COPY.FOLLOW_LIST.EMPTY_FOLLOWERS_TITLE
              : PROFILE_COPY.FOLLOW_LIST.EMPTY_FOLLOWING_TITLE
          }
          description={
            isFollowers
              ? PROFILE_COPY.FOLLOW_LIST.EMPTY_FOLLOWERS_MESSAGE
              : PROFILE_COPY.FOLLOW_LIST.EMPTY_FOLLOWING_MESSAGE
          }
        />
      ) : (
        <View style={styles.list}>
          {profiles.map((profile) => (
            <RiderListItem
              key={profile.id}
              profile={profile}
              isOwner={profile.id === viewerUserId}
              isFollowing={followingIds.has(profile.id)}
              loading={loadingIds.has(profile.id)}
              onPress={() => {
                handleOpenProfile(profile.id);
              }}
              onFollow={() => {
                void handleFollow(profile.id);
              }}
              onUnfollow={() => {
                confirmUnfollow(profile.id);
              }}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["2xl"],
    paddingBottom: spacing["5xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  list: {
    gap: spacing.md,
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
});

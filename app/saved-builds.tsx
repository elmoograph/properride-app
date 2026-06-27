import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { FeedBuildCard } from "@/src/features/feed/components/FeedBuildCard";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { SAVED_BUILD_COPY } from "@/src/features/savedBuild/constants/savedBuild.constants";
import {
  getSavedBuildErrorMessage,
  getSavedBuilds,
  unsaveBuild,
} from "@/src/features/savedBuild/repositories/savedBuild.repository";
import { BUILD_LIKE_COPY } from "@/src/features/buildLike/constants/buildLike.constants";
import {
  getBuildLikeErrorMessage,
  getLikedBuildIds,
  likeBuild,
  unlikeBuild,
} from "@/src/features/buildLike/repositories/buildLike.repository";
import { radius, spacing } from "@/src/theme";

function buildLikeCountMap(buildItems: FeedBuild[]) {
  return buildItems.reduce<Record<string, number>>((counts, build) => {
    counts[build.id] = build.like_count;
    return counts;
  }, {});
}

export default function SavedBuildsScreen() {
  const { user } = useAuth();

  const [builds, setBuilds] = useState<FeedBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [savingBuildIds, setSavingBuildIds] = useState<Set<string>>(new Set());
  const [likedBuildIds, setLikedBuildIds] = useState<Set<string>>(new Set());

  const [likingBuildIds, setLikingBuildIds] = useState<Set<string>>(new Set());

  const [likeCountByBuildId, setLikeCountByBuildId] = useState<
    Record<string, number>
  >({});

  const loadSavedBuilds = useCallback(async () => {
    if (!user?.id) {
      setBuilds([]);
      setSavingBuildIds(new Set());
      setLikedBuildIds(new Set());
      setLikingBuildIds(new Set());
      setLikeCountByBuildId({});
      setLoading(false);
      return;
    }

    setLoadFailed(false);
    setSavingBuildIds(new Set());
    setLikingBuildIds(new Set());

    try {
      const savedBuilds = await getSavedBuilds(user.id);
      const buildIds = savedBuilds.map((build) => build.id);

      const likedIds = await getLikedBuildIds(user.id, buildIds);

      setBuilds(savedBuilds);
      setLikedBuildIds(likedIds);
      setLikeCountByBuildId(buildLikeCountMap(savedBuilds));
    } catch (error) {
      console.error(getSavedBuildErrorMessage(error));
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadSavedBuilds();
    }, [loadSavedBuilds]),
  );

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.TABS.PROFILE);
  }

  function handleOpenBuild(buildId: string) {
    router.push(ROUTES.MOTORCYCLE.DETAIL(buildId));
  }

  function handleOpenOwner(userId: string) {
    if (userId === user?.id) {
      router.push(ROUTES.TABS.PROFILE);
      return;
    }

    router.push(ROUTES.PROFILE.PUBLIC(userId));
  }

  function setBuildSaving(buildId: string, isSaving: boolean) {
    setSavingBuildIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (isSaving) {
        nextIds.add(buildId);
      } else {
        nextIds.delete(buildId);
      }

      return nextIds;
    });
  }

  function setBuildLiking(buildId: string, isLiking: boolean) {
    setLikingBuildIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (isLiking) {
        nextIds.add(buildId);
      } else {
        nextIds.delete(buildId);
      }

      return nextIds;
    });
  }

  function updateLikeCount(buildId: string, delta: number) {
    setLikeCountByBuildId((currentCounts) => {
      const currentCount = currentCounts[buildId] ?? 0;

      return {
        ...currentCounts,
        [buildId]: Math.max(0, currentCount + delta),
      };
    });
  }

  async function handleUnsaveBuild(buildId: string) {
    if (
      !user?.id ||
      savingBuildIds.has(buildId) ||
      likingBuildIds.has(buildId)
    ) {
      return;
    }

    setBuildSaving(buildId, true);

    const previousBuilds = builds;

    setBuilds((currentBuilds) =>
      currentBuilds.filter((build) => build.id !== buildId),
    );

    try {
      await unsaveBuild({
        userId: user.id,
        motorcycleId: buildId,
      });
    } catch (error) {
      console.error(getSavedBuildErrorMessage(error));

      setBuilds(previousBuilds);

      Alert.alert(
        SAVED_BUILD_COPY.UNSAVE_FAILED_TITLE,
        SAVED_BUILD_COPY.UNSAVE_FAILED_MESSAGE,
      );
    } finally {
      setBuildSaving(buildId, false);
    }
  }

  async function handleToggleLike(buildId: string) {
    if (
      !user?.id ||
      likingBuildIds.has(buildId) ||
      savingBuildIds.has(buildId)
    ) {
      return;
    }

    const currentlyLiked = likedBuildIds.has(buildId);

    setBuildLiking(buildId, true);

    setLikedBuildIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (currentlyLiked) {
        nextIds.delete(buildId);
      } else {
        nextIds.add(buildId);
      }

      return nextIds;
    });

    updateLikeCount(buildId, currentlyLiked ? -1 : 1);

    try {
      if (currentlyLiked) {
        await unlikeBuild({
          userId: user.id,
          motorcycleId: buildId,
        });
      } else {
        await likeBuild({
          userId: user.id,
          motorcycleId: buildId,
        });
      }
    } catch (error) {
      console.error(getBuildLikeErrorMessage(error));

      const message = error instanceof Error ? error.message.toLowerCase() : "";

      const alreadyLiked =
        !currentlyLiked &&
        (message.includes("duplicate key") ||
          message.includes("build_likes_unique_user_motorcycle"));

      if (alreadyLiked) {
        setLikedBuildIds((currentIds) => {
          const nextIds = new Set(currentIds);
          nextIds.add(buildId);
          return nextIds;
        });

        return;
      }

      setLikedBuildIds((currentIds) => {
        const nextIds = new Set(currentIds);

        if (currentlyLiked) {
          nextIds.add(buildId);
        } else {
          nextIds.delete(buildId);
        }

        return nextIds;
      });

      updateLikeCount(buildId, currentlyLiked ? 1 : -1);

      Alert.alert(
        currentlyLiked
          ? BUILD_LIKE_COPY.UNLIKE_FAILED_TITLE
          : BUILD_LIKE_COPY.LIKE_FAILED_TITLE,
        currentlyLiked
          ? BUILD_LIKE_COPY.UNLIKE_FAILED_MESSAGE
          : BUILD_LIKE_COPY.LIKE_FAILED_MESSAGE,
      );
    } finally {
      setBuildLiking(buildId, false);
    }
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed ? styles.pressed : null,
          ]}
        >
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.headerContent}>
          <PageHeader
            variant="dark"
            eyebrow={SAVED_BUILD_COPY.SCREEN_EYEBROW}
            title={SAVED_BUILD_COPY.SCREEN_TITLE}
            subtitle={SAVED_BUILD_COPY.SCREEN_SUBTITLE}
          />
        </View>
      </View>
    );
  }

  function renderBuild({ item }: { item: FeedBuild }) {
    return (
      <FeedBuildCard
        build={item}
        saved
        liked={likedBuildIds.has(item.id)}
        saving={savingBuildIds.has(item.id)}
        liking={likingBuildIds.has(item.id)}
        likeCount={likeCountByBuildId[item.id] ?? item.like_count}
        onPressBuild={() => {
          handleOpenBuild(item.id);
        }}
        onPressOwner={() => {
          handleOpenOwner(item.user_id);
        }}
        onPressSave={() => {
          void handleUnsaveBuild(item.id);
        }}
        onPressLike={() => {
          void handleToggleLike(item.id);
        }}
      />
    );
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
          title={SAVED_BUILD_COPY.LOAD_FAILED_TITLE}
          description={SAVED_BUILD_COPY.LOAD_FAILED_DESCRIPTION}
          action={
            <AppButton
              theme="dark"
              title={SAVED_BUILD_COPY.RETRY_BUTTON}
              onPress={() => {
                setLoading(true);
                void loadSavedBuilds();
              }}
            />
          }
        />
      </Screen>
    );
  }

  return (
    <Screen
      padded={false}
      backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
    >
      <FlatList
        data={builds}
        keyExtractor={(item) => item.id}
        renderItem={renderBuild}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            variant="dark"
            title={SAVED_BUILD_COPY.EMPTY_TITLE}
            description={SAVED_BUILD_COPY.EMPTY_DESCRIPTION}
          />
        }
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing["5xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing["2xl"],
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
  headerContent: {
    flex: 1,
  },
  separator: {
    height: spacing.xl,
  },
  pressed: {
    opacity: 0.72,
  },
});

import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { FeedBuildCard } from "@/src/features/feed/components/FeedBuildCard";
import {
  FEED_COPY,
  FEED_PAGE_SIZE,
} from "@/src/features/feed/constants/feed.constants";
import {
  getFeedBuilds,
  getFeedErrorMessage,
} from "@/src/features/feed/repositories/feed.repository";
import type {
  FeedBuild,
  FeedFilterKey,
} from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { spacing } from "@/src/theme";
import { FeedFilterBar } from "@/src/features/feed/components/FeedFilterBar";
import { SAVED_BUILD_COPY } from "@/src/features/savedBuild/constants/savedBuild.constants";
import {
  getSavedBuildErrorMessage,
  getSavedBuildIds,
  saveBuild,
  unsaveBuild,
} from "@/src/features/savedBuild/repositories/savedBuild.repository";
import { BUILD_LIKE_COPY } from "@/src/features/buildLike/constants/buildLike.constants";
import {
  getBuildLikeErrorMessage,
  getLikedBuildIds,
  likeBuild,
  unlikeBuild,
} from "@/src/features/buildLike/repositories/buildLike.repository";

export default function HomeScreen() {
  const { user } = useAuth();

  const [builds, setBuilds] = useState<FeedBuild[]>([]);

  const [activeFilter, setActiveFilter] = useState<FeedFilterKey>("all");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  const [filterLoading, setFilterLoading] = useState(false);

  const [loadFailed, setLoadFailed] = useState(false);

  const [nextPage, setNextPage] = useState<number | null>(0);

  const [hasMore, setHasMore] = useState(true);

  const isFiltered = activeFilter !== "all";

  const [savedBuildIds, setSavedBuildIds] = useState<Set<string>>(new Set());

  const [savingBuildIds, setSavingBuildIds] = useState<Set<string>>(new Set());

  const [likedBuildIds, setLikedBuildIds] = useState<Set<string>>(new Set());

  const [likingBuildIds, setLikingBuildIds] = useState<Set<string>>(new Set());

  const [likeCountByBuildId, setLikeCountByBuildId] = useState<
    Record<string, number>
  >({});

  const activeRequestIdRef = useRef(0);
  const loadingMoreRef = useRef(false);

  const activeFilterRef = useRef<FeedFilterKey>("all");

  function buildLikeCountMap(buildItems: FeedBuild[]) {
    return buildItems.reduce<Record<string, number>>((counts, build) => {
      counts[build.id] = build.like_count;
      return counts;
    }, {});
  }

  const loadInitialFeed = useCallback(
    async (filter: FeedFilterKey) => {
      const requestId = activeRequestIdRef.current + 1;

      activeRequestIdRef.current = requestId;
      setLoadFailed(false);

      try {
        const result = await getFeedBuilds({
          page: 0,
          pageSize: FEED_PAGE_SIZE,
          filter,
        });
        let nextSavedBuildIds = new Set<string>();
        let nextLikedBuildIds = new Set<string>();

        const buildIds = result.items.map((build) => build.id);

        if (user?.id) {
          const [savedIds, likedIds] = await Promise.all([
            getSavedBuildIds(user.id, buildIds),
            getLikedBuildIds(user.id, buildIds),
          ]);

          nextSavedBuildIds = savedIds;
          nextLikedBuildIds = likedIds;
        }

        if (requestId !== activeRequestIdRef.current) {
          return;
        }

        setBuilds(result.items);
        setSavedBuildIds(nextSavedBuildIds);
        setHasMore(result.hasMore);
        setNextPage(result.nextPage);
        setLikedBuildIds(nextLikedBuildIds);
        setLikeCountByBuildId(buildLikeCountMap(result.items));
      } catch (error) {
        if (requestId !== activeRequestIdRef.current) {
          return;
        }

        console.error(getFeedErrorMessage(error));
        setLoadFailed(true);
      } finally {
        if (requestId === activeRequestIdRef.current) {
          setLoading(false);
          setRefreshing(false);
          setFilterLoading(false);
        }
      }
    },
    [user?.id],
  );

  const loadMoreFeed = useCallback(async () => {
    if (
      loadingMoreRef.current ||
      loading ||
      refreshing ||
      !hasMore ||
      nextPage === null
    ) {
      return;
    }

    const pageToLoad = nextPage;
    const filterToLoad = activeFilterRef.current;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      const result = await getFeedBuilds({
        page: pageToLoad,
        pageSize: FEED_PAGE_SIZE,
        filter: filterToLoad,
      });
      let nextSavedBuildIds = new Set<string>();
      let nextLikedBuildIds = new Set<string>();

      const buildIds = result.items.map((build) => build.id);

      if (user?.id) {
        const [savedIds, likedIds] = await Promise.all([
          getSavedBuildIds(user.id, buildIds),
          getLikedBuildIds(user.id, buildIds),
        ]);

        nextSavedBuildIds = savedIds;
        nextLikedBuildIds = likedIds;
      }
      /*
       * Abaikan hasil pagination jika filter sudah berubah
       * selama request berjalan.
       */
      if (filterToLoad !== activeFilterRef.current) {
        return;
      }

      setBuilds((currentBuilds) => {
        const existingIds = new Set(currentBuilds.map((build) => build.id));

        const uniqueNewBuilds = result.items.filter(
          (build) => !existingIds.has(build.id),
        );

        return [...currentBuilds, ...uniqueNewBuilds];
      });
      setSavedBuildIds((currentIds) => {
        const nextIds = new Set(currentIds);

        nextSavedBuildIds.forEach((id) => {
          nextIds.add(id);
        });

        return nextIds;
      });

      setLikedBuildIds((currentIds) => {
        const nextIds = new Set(currentIds);

        nextLikedBuildIds.forEach((id) => {
          nextIds.add(id);
        });

        return nextIds;
      });

      setLikeCountByBuildId((currentCounts) => ({
        ...currentCounts,
        ...buildLikeCountMap(result.items),
      }));

      setHasMore(result.hasMore);
      setNextPage(result.nextPage);
    } catch (error) {
      console.error(getFeedErrorMessage(error));

      Alert.alert(FEED_COPY.ERROR_TITLE, FEED_COPY.LOAD_MORE_FAILED);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [hasMore, loading, nextPage, refreshing, user?.id]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      void loadInitialFeed(activeFilterRef.current);
    }, [loadInitialFeed]),
  );

  function handleRefresh() {
    if (refreshing) {
      return;
    }

    setRefreshing(true);
    setHasMore(true);
    setNextPage(0);

    void loadInitialFeed(activeFilterRef.current);
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
  function handleChangeFilter(filter: FeedFilterKey) {
    if (
      filter === activeFilterRef.current ||
      filterLoading ||
      refreshing ||
      loadingMore
    ) {
      return;
    }

    activeFilterRef.current = filter;

    setActiveFilter(filter);
    setBuilds([]);
    setHasMore(true);
    setNextPage(0);
    setLoadFailed(false);
    setFilterLoading(true);

    void loadInitialFeed(filter);
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

  async function handleToggleSave(buildId: string) {
    if (!user?.id || savingBuildIds.has(buildId)) {
      return;
    }

    const currentlySaved = savedBuildIds.has(buildId);

    setBuildSaving(buildId, true);

    setSavedBuildIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (currentlySaved) {
        nextIds.delete(buildId);
      } else {
        nextIds.add(buildId);
      }

      return nextIds;
    });

    try {
      if (currentlySaved) {
        await unsaveBuild({
          userId: user.id,
          motorcycleId: buildId,
        });
      } else {
        await saveBuild({
          userId: user.id,
          motorcycleId: buildId,
        });
      }
    } catch (error) {
      console.error(getSavedBuildErrorMessage(error));

      const message = error instanceof Error ? error.message.toLowerCase() : "";

      const alreadySaved =
        !currentlySaved &&
        (message.includes("duplicate key") ||
          message.includes("saved_builds_unique_user_motorcycle"));

      if (alreadySaved) {
        setSavedBuildIds((currentIds) => {
          const nextIds = new Set(currentIds);
          nextIds.add(buildId);
          return nextIds;
        });

        return;
      }

      setSavedBuildIds((currentIds) => {
        const nextIds = new Set(currentIds);

        if (currentlySaved) {
          nextIds.add(buildId);
        } else {
          nextIds.delete(buildId);
        }

        return nextIds;
      });

      Alert.alert(
        currentlySaved
          ? SAVED_BUILD_COPY.UNSAVE_FAILED_TITLE
          : SAVED_BUILD_COPY.SAVE_FAILED_TITLE,
        currentlySaved
          ? SAVED_BUILD_COPY.UNSAVE_FAILED_MESSAGE
          : SAVED_BUILD_COPY.SAVE_FAILED_MESSAGE,
      );
    } finally {
      setBuildSaving(buildId, false);
    }
  }

  async function handleToggleLike(buildId: string) {
    if (!user?.id || likingBuildIds.has(buildId)) {
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

  function renderBuild({ item }: { item: FeedBuild }) {
    return (
      <FeedBuildCard
        build={item}
        saved={savedBuildIds.has(item.id)}
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
          void handleToggleSave(item.id);
        }}
        onPressLike={() => {
          void handleToggleLike(item.id);
        }}
      />
    );
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <PageHeader
          variant="dark"
          eyebrow={FEED_COPY.EYEBROW}
          title={FEED_COPY.TITLE}
          subtitle={FEED_COPY.SUBTITLE}
        />

        <FeedFilterBar
          activeFilter={activeFilter}
          disabled={
            filterLoading ||
            refreshing ||
            loadingMore ||
            savingBuildIds.size > 0 ||
            likingBuildIds.size > 0
          }
          onChangeFilter={handleChangeFilter}
        />
      </View>
    );
  }

  function renderFooter() {
    if (filterLoading) {
      return null;
    }

    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
        </View>
      );
    }

    if (!hasMore && builds.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.endText}>{FEED_COPY.END_OF_FEED}</Text>
        </View>
      );
    }

    return <View style={styles.footerSpacer} />;
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

  if (loadFailed && builds.length === 0) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.center}
      >
        <EmptyState
          variant="dark"
          title={FEED_COPY.ERROR_TITLE}
          description={FEED_COPY.ERROR_DESCRIPTION}
          action={
            <AppButton
              theme="dark"
              title={FEED_COPY.RETRY}
              onPress={() => {
                setLoading(true);
                void loadInitialFeed(activeFilterRef.current);
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
          filterLoading ? (
            <View style={styles.filterLoading}>
              <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
            </View>
          ) : (
            <EmptyState
              variant="dark"
              title={
                isFiltered
                  ? FEED_COPY.FILTER_EMPTY_TITLE
                  : FEED_COPY.EMPTY_TITLE
              }
              description={
                isFiltered
                  ? FEED_COPY.FILTER_EMPTY_DESCRIPTION
                  : FEED_COPY.EMPTY_DESCRIPTION
              }
            />
          )
        }
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          void loadMoreFeed();
        }}
        onEndReachedThreshold={0.35}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={MOTORCYCLE_SHOWCASE_COLORS.accent}
            colors={[MOTORCYCLE_SHOWCASE_COLORS.accent]}
            progressBackgroundColor={MOTORCYCLE_SHOWCASE_COLORS.surface}
          />
        }
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews
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
  separator: {
    height: spacing.xl,
  },
  footer: {
    minHeight: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  footerSpacer: {
    height: spacing.xl,
  },
  endText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
    textAlign: "center",
  },
  header: {
    marginBottom: spacing["2xl"],
  },
  filterLoading: {
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
  },
});

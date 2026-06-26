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
import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { spacing } from "@/src/theme";

export default function HomeScreen() {
  const { user } = useAuth();

  const [builds, setBuilds] = useState<FeedBuild[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const [nextPage, setNextPage] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);

  /*
   * FlatList kadang memanggil onEndReached lebih dari sekali.
   * Ref ini mencegah request pagination ganda sebelum state selesai update.
   */
  const loadingMoreRef = useRef(false);

  const loadInitialFeed = useCallback(async () => {
    setLoadFailed(false);

    try {
      const result = await getFeedBuilds({
        page: 0,
        pageSize: FEED_PAGE_SIZE,
      });

      setBuilds(result.items);
      setHasMore(result.hasMore);
      setNextPage(result.nextPage);
    } catch (error) {
      console.error(getFeedErrorMessage(error));
      setLoadFailed(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

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

    loadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      const result = await getFeedBuilds({
        page: nextPage,
        pageSize: FEED_PAGE_SIZE,
      });

      setBuilds((currentBuilds) => {
        const existingIds = new Set(currentBuilds.map((build) => build.id));

        const uniqueNewBuilds = result.items.filter(
          (build) => !existingIds.has(build.id),
        );

        return [...currentBuilds, ...uniqueNewBuilds];
      });

      setHasMore(result.hasMore);
      setNextPage(result.nextPage);
    } catch (error) {
      console.error(getFeedErrorMessage(error));

      Alert.alert(FEED_COPY.ERROR_TITLE, FEED_COPY.LOAD_MORE_FAILED);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [hasMore, loading, nextPage, refreshing]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadInitialFeed();
    }, [loadInitialFeed]),
  );

  function handleRefresh() {
    if (refreshing) {
      return;
    }

    /*
     * Pagination di-reset agar refresh selalu mengambil
     * data terbaru mulai dari halaman pertama.
     */
    setRefreshing(true);
    setHasMore(true);
    setNextPage(0);

    void loadInitialFeed();
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

  function renderBuild({ item }: { item: FeedBuild }) {
    return (
      <FeedBuildCard
        build={item}
        onPressBuild={() => {
          handleOpenBuild(item.id);
        }}
        onPressOwner={() => {
          handleOpenOwner(item.user_id);
        }}
      />
    );
  }

  function renderHeader() {
    return (
      <PageHeader
        variant="dark"
        eyebrow={FEED_COPY.EYEBROW}
        title={FEED_COPY.TITLE}
        subtitle={FEED_COPY.SUBTITLE}
      />
    );
  }

  function renderFooter() {
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
                void loadInitialFeed();
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
            title={FEED_COPY.EMPTY_TITLE}
            description={FEED_COPY.EMPTY_DESCRIPTION}
          />
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
});

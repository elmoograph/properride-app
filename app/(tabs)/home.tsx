import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import { FeedBuildCard } from "@/src/features/feed/components/FeedBuildCard";
import { FEED_COPY } from "@/src/features/feed/constants/feed.constants";
import {
  getFeedBuilds,
  getFeedErrorMessage,
} from "@/src/features/feed/repositories/feed.repository";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

export default function HomeScreen() {
  const { user } = useAuth();
  const [builds, setBuilds] = useState<FeedBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadFeed = useCallback(async () => {
    setLoadFailed(false);

    try {
      const feedBuilds = await getFeedBuilds();

      setBuilds(feedBuilds);
    } catch (error) {
      console.error(getFeedErrorMessage(error));
      setLoadFailed(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadFeed();
    }, [loadFeed]),
  );

  function handleRefresh() {
    if (refreshing) {
      return;
    }

    setRefreshing(true);
    void loadFeed();
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
                void loadFeed();
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={MOTORCYCLE_SHOWCASE_COLORS.accent}
          colors={[MOTORCYCLE_SHOWCASE_COLORS.accent]}
          progressBackgroundColor={MOTORCYCLE_SHOWCASE_COLORS.surface}
        />
      }
    >
      <PageHeader
        variant="dark"
        eyebrow={FEED_COPY.EYEBROW}
        title={FEED_COPY.TITLE}
        subtitle={FEED_COPY.SUBTITLE}
      />

      {builds.length === 0 ? (
        <EmptyState
          variant="dark"
          title={FEED_COPY.EMPTY_TITLE}
          description={FEED_COPY.EMPTY_DESCRIPTION}
        />
      ) : (
        <View style={styles.list}>
          {builds.map((build) => (
            <FeedBuildCard
              key={build.id}
              build={build}
              onPressBuild={() => {
                handleOpenBuild(build.id);
              }}
              onPressOwner={() => {
                handleOpenOwner(build.user_id);
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
    gap: spacing.xl,
  },
});

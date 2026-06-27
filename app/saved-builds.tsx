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
import { radius, spacing } from "@/src/theme";

export default function SavedBuildsScreen() {
  const { user } = useAuth();

  const [builds, setBuilds] = useState<FeedBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [savingBuildIds, setSavingBuildIds] = useState<Set<string>>(new Set());

  const loadSavedBuilds = useCallback(async () => {
    if (!user?.id) {
      setBuilds([]);
      setLoading(false);
      return;
    }

    setLoadFailed(false);

    try {
      const savedBuilds = await getSavedBuilds(user.id);

      setBuilds(savedBuilds);
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

  async function handleUnsaveBuild(buildId: string) {
    if (!user?.id || savingBuildIds.has(buildId)) {
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
        liked={false}
        saving={savingBuildIds.has(item.id)}
        liking={false}
        likeCount={item.like_count}
        onPressBuild={() => {
          handleOpenBuild(item.id);
        }}
        onPressOwner={() => {
          handleOpenOwner(item.user_id);
        }}
        onPressSave={() => {
          void handleUnsaveBuild(item.id);
        }}
        onPressLike={() => {}}
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
          description="Gagal memuat halaman"
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

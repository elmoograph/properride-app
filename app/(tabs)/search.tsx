import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Search, X } from "lucide-react-native";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { SEARCH_COPY } from "@/src/features/search/constants/search.constants";
import { SearchBuildResultCard } from "@/src/features/search/components/SearchBuildResultCard";
import { SearchProfileResultCard } from "@/src/features/search/components/SearchProfileResultCard";
import { SearchResultTabs } from "@/src/features/search/components/SearchResultTabs";
import {
  getSearchErrorMessage,
  searchProperRide,
} from "@/src/features/search/repositories/search.repository";
import type {
  SearchProfileResult,
  SearchTabKey,
} from "@/src/features/search/types/search.types";
import { radius, spacing } from "@/src/theme";

const SEARCH_DEBOUNCE_MS = 450;
const MIN_SEARCH_LENGTH = 2;

type SearchListItem =
  | {
      type: "build";
      id: string;
      build: FeedBuild;
    }
  | {
      type: "profile";
      id: string;
      profile: SearchProfileResult;
    };

function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTabKey>("builds");

  const [buildResults, setBuildResults] = useState<FeedBuild[]>([]);
  const [profileResults, setProfileResults] = useState<SearchProfileResult[]>(
    [],
  );

  const [searching, setSearching] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const activeRequestIdRef = useRef(0);

  const normalizedQuery = normalizeQuery(query);
  const canSearch = normalizedQuery.length >= MIN_SEARCH_LENGTH;

  const runSearch = useCallback(async (nextQuery: string) => {
    const normalizedNextQuery = normalizeQuery(nextQuery);
    const requestId = activeRequestIdRef.current + 1;

    activeRequestIdRef.current = requestId;

    if (normalizedNextQuery.length < MIN_SEARCH_LENGTH) {
      setBuildResults([]);
      setProfileResults([]);
      setSearching(false);
      setSearchFailed(false);
      setHasSearched(false);
      return;
    }

    setSearching(true);
    setSearchFailed(false);
    setHasSearched(true);

    try {
      const results = await searchProperRide(normalizedNextQuery);

      if (requestId !== activeRequestIdRef.current) {
        return;
      }

      setBuildResults(results.builds);
      setProfileResults(results.profiles);

      if (results.builds.length === 0 && results.profiles.length > 0) {
        setActiveTab("riders");
      } else {
        setActiveTab("builds");
      }
    } catch (error) {
      if (requestId !== activeRequestIdRef.current) {
        return;
      }

      console.error(getSearchErrorMessage(error));
      setBuildResults([]);
      setProfileResults([]);
      setSearchFailed(true);
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setSearching(false);
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void runSearch(query);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, runSearch]);

  function handleClearSearch() {
    setQuery("");
    setBuildResults([]);
    setProfileResults([]);
    setSearching(false);
    setSearchFailed(false);
    setHasSearched(false);
    setActiveTab("builds");
  }

  function handleRetrySearch() {
    void runSearch(query);
  }

  function handleOpenBuild(buildId: string) {
    router.push(ROUTES.MOTORCYCLE.DETAIL(buildId));
  }

  function handleOpenOwner(userId: string) {
    router.push(ROUTES.PROFILE.PUBLIC(userId));
  }

  function handleOpenProfile(userId: string) {
    router.push(ROUTES.PROFILE.PUBLIC(userId));
  }

  const listData: SearchListItem[] =
    activeTab === "builds"
      ? buildResults.map((build) => ({
          type: "build",
          id: build.id,
          build,
        }))
      : profileResults.map((profile) => ({
          type: "profile",
          id: profile.id,
          profile,
        }));

  function renderSearchItem({ item }: { item: SearchListItem }) {
    if (item.type === "build") {
      return (
        <SearchBuildResultCard
          build={item.build}
          onPressBuild={() => {
            handleOpenBuild(item.build.id);
          }}
          onPressOwner={() => {
            handleOpenOwner(item.build.user_id);
          }}
        />
      );
    }

    return (
      <SearchProfileResultCard
        profile={item.profile}
        onPress={() => {
          handleOpenProfile(item.profile.id);
        }}
      />
    );
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <PageHeader
          variant="dark"
          title={SEARCH_COPY.SCREEN_TITLE}
          subtitle={SEARCH_COPY.SCREEN_SUBTITLE}
        />

        <View style={styles.searchBox}>
          <Search size={20} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={SEARCH_COPY.INPUT_PLACEHOLDER}
            placeholderTextColor={MOTORCYCLE_SHOWCASE_COLORS.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            style={styles.input}
            selectionColor={MOTORCYCLE_SHOWCASE_COLORS.accent}
            onSubmitEditing={() => {
              void runSearch(query);
            }}
          />

          {query.trim().length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Hapus pencarian"
              onPress={handleClearSearch}
              style={({ pressed }) => [
                styles.clearButton,
                pressed ? styles.pressed : null,
              ]}
            >
              <X size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
            </Pressable>
          ) : null}
        </View>

        {canSearch ? (
          <SearchResultTabs
            activeTab={activeTab}
            buildCount={buildResults.length}
            riderCount={profileResults.length}
            disabled={searching}
            onChangeTab={setActiveTab}
          />
        ) : null}
      </View>
    );
  }

  function renderEmptyState() {
    if (!canSearch) {
      return (
        <EmptyState
          variant="dark"
          title={SEARCH_COPY.INITIAL_TITLE}
          description={SEARCH_COPY.INITIAL_DESCRIPTION}
        />
      );
    }

    if (searching) {
      return (
        <View style={styles.loadingState}>
          <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
          <Text style={styles.loadingText}>Mencari referensi...</Text>
        </View>
      );
    }

    if (searchFailed) {
      return (
        <EmptyState
          variant="dark"
          title={SEARCH_COPY.LOAD_FAILED_TITLE}
          description={SEARCH_COPY.LOAD_FAILED_DESCRIPTION}
          action={
            <AppButton
              theme="dark"
              title={SEARCH_COPY.RETRY_BUTTON}
              onPress={handleRetrySearch}
            />
          }
        />
      );
    }

    if (!hasSearched) {
      return (
        <EmptyState
          variant="dark"
          title={SEARCH_COPY.INITIAL_TITLE}
          description={SEARCH_COPY.INITIAL_DESCRIPTION}
        />
      );
    }

    return (
      <EmptyState
        variant="dark"
        title={
          activeTab === "builds"
            ? SEARCH_COPY.EMPTY_BUILDS_TITLE
            : SEARCH_COPY.EMPTY_RIDERS_TITLE
        }
        description={
          activeTab === "builds"
            ? SEARCH_COPY.EMPTY_BUILDS_DESCRIPTION
            : SEARCH_COPY.EMPTY_RIDERS_DESCRIPTION
        }
      />
    );
  }

  return (
    <Screen
      padded={false}
      backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
    >
      <View style={styles.screenContent}>
        {renderHeader()}

        <FlatList
          data={listData}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          renderItem={renderSearchItem}
          ListEmptyComponent={renderEmptyState}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsContent}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  resultsContent: {
    flexGrow: 1,
    paddingBottom: spacing["5xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  searchBox: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  input: {
    flex: 1,
    minHeight: 52,
    paddingVertical: 0,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  clearButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  separator: {
    height: spacing.lg,
  },
  loadingState: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  loadingText: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.72,
  },
});

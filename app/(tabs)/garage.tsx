import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import { colors, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { GarageFilterBar } from "@/src/features/motorcycle/components/GarageFilterBar";
import { GarageSummaryCard } from "@/src/features/motorcycle/components/GarageSummaryCard";
import { MotorcycleCard } from "@/src/features/motorcycle/components/MotorcycleCard";
import {
  MOTORCYCLE_COPY,
  MOTORCYCLE_SORT_OPTIONS,
} from "@/src/features/motorcycle/constants/motorcycle.constants";
import { getMyMotorcycles } from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type {
  Motorcycle,
  MotorcycleSortOption,
} from "@/src/features/motorcycle/types/motorcycle.types";
import { filterMotorcycles } from "@/src/features/motorcycle/utils/motorcycleFilter";
import { calculateGarageSummary } from "@/src/features/motorcycle/utils/garageSummary";
import { sortMotorcycles } from "@/src/features/motorcycle/utils/motorcycleSort";
import { getPartsByUserId } from "@/src/features/part/repositories/part.repository";
import type { Part } from "@/src/features/part/types/part.types";

export default function GarageScreen() {
  const { user } = useAuth();

  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<MotorcycleSortOption>(
    MOTORCYCLE_SORT_OPTIONS.NEWEST,
  );

  const [loading, setLoading] = useState(true);

  const filteredMotorcycles = filterMotorcycles({
    motorcycles,
    searchQuery,
  });

  const sortedMotorcycles = sortMotorcycles(filteredMotorcycles, sortOption);

  const garageSummary = calculateGarageSummary({
    motorcycles,
    parts,
  });

  const loadGarage = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const [motorcycleData, partsData] = await Promise.all([
        getMyMotorcycles(user.id),
        getPartsByUserId(user.id),
      ]);

      setMotorcycles(motorcycleData);
      setParts(partsData);
    } catch (error) {
      Alert.alert(
        MOTORCYCLE_COPY.LOAD_FAILED_TITLE,
        MOTORCYCLE_COPY.LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadGarage();
    }, [loadGarage]),
  );

  function handleAddMotorcycle() {
    router.push(ROUTES.MOTORCYCLE.ADD);
  }

  function handleOpenMotorcycle(motorcycleId: string) {
    router.push(ROUTES.MOTORCYCLE.DETAIL(motorcycleId));
  }

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <ActivityIndicator color={colors.primary} />
      </Screen>
    );
  }

  return (
    <Screen scroll contentContainerStyle={styles.container}>
      <PageHeader
        title={MOTORCYCLE_COPY.GARAGE_TITLE}
        subtitle={MOTORCYCLE_COPY.GARAGE_SUBTITLE}
        action={
          <AppButton
            title={MOTORCYCLE_COPY.ADD_BUTTON}
            onPress={handleAddMotorcycle}
          />
        }
      />

      {motorcycles.length > 0 ? (
        <>
          <GarageSummaryCard summary={garageSummary} />

          <GarageFilterBar
            searchQuery={searchQuery}
            sortOption={sortOption}
            onChangeSearchQuery={setSearchQuery}
            onChangeSortOption={setSortOption}
          />

          {sortedMotorcycles.length > 0 ? (
            <View style={styles.list}>
              {sortedMotorcycles.map((motorcycle) => (
                <MotorcycleCard
                  key={motorcycle.id}
                  motorcycle={motorcycle}
                  onPress={() => handleOpenMotorcycle(motorcycle.id)}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              title={MOTORCYCLE_COPY.GARAGE_FILTER_EMPTY_TITLE}
              description={MOTORCYCLE_COPY.GARAGE_FILTER_EMPTY_DESCRIPTION}
              action={
                <AppButton
                  title={MOTORCYCLE_COPY.ADD_BUTTON}
                  onPress={handleAddMotorcycle}
                />
              }
            />
          )}
        </>
      ) : (
        <EmptyState
          title={MOTORCYCLE_COPY.EMPTY_TITLE}
          description={MOTORCYCLE_COPY.EMPTY_DESCRIPTION}
          action={
            <AppButton
              title={MOTORCYCLE_COPY.ADD_BUTTON}
              onPress={handleAddMotorcycle}
            />
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["2xl"],
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    gap: spacing.md,
  },
});

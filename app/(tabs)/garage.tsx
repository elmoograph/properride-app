import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Plus } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import { spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { GarageFilterBar } from "@/src/features/motorcycle/components/GarageFilterBar";
import { GarageSummaryCard } from "@/src/features/motorcycle/components/GarageSummaryCard";
import { GarageMotorcycleCard } from "@/src/features/motorcycle/components/GarageMotorcycleCard";
import {
  MOTORCYCLE_COPY,
  MOTORCYCLE_SORT_OPTIONS,
} from "@/src/features/motorcycle/constants/motorcycle.constants";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
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
import { getMotorcycleImagesByUserId } from "@/src/features/motorcycleImage/repositories/motorcycleImage.repository";
import type { MotorcycleImage } from "@/src/features/motorcycleImage/types/motorcycleImage.types";

function getPartCountByMotorcycle(parts: Part[], motorcycleId: string): number {
  return parts.filter((part) => part.motorcycle_id === motorcycleId).length;
}

function getPhotoCountByMotorcycle(
  images: MotorcycleImage[],
  motorcycleId: string,
): number {
  return images.filter((image) => image.motorcycle_id === motorcycleId).length;
}

function getBuildValueByMotorcycle(
  parts: Part[],
  motorcycleId: string,
): number {
  return parts
    .filter((part) => part.motorcycle_id === motorcycleId)
    .reduce((total, part) => total + (part.price ?? 0), 0);
}

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
  const [motorcycleImages, setMotorcycleImages] = useState<MotorcycleImage[]>(
    [],
  );
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
      const [motorcycleData, partsData, imageData] = await Promise.all([
        getMyMotorcycles(user.id),
        getPartsByUserId(user.id),
        getMotorcycleImagesByUserId(user.id),
      ]);

      setMotorcycles(motorcycleData);
      setParts(partsData);
      setMotorcycleImages(imageData);
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
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
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
        <View style={styles.headerTextContent}>
          <Text style={styles.eyebrow}>ProperRide Garage</Text>
          <Text style={styles.title}>My Garage</Text>
          <Text style={styles.subtitle}>
            Build, track, and showcase your motorcycles.
          </Text>
        </View>

        <Pressable style={styles.addButton} onPress={handleAddMotorcycle}>
          <Plus size={18} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
        </Pressable>
      </View>

      {motorcycles.length > 0 ? (
        <>
          <GarageSummaryCard
            motorcycleCount={garageSummary.totalMotorcycles}
            partCount={garageSummary.totalParts}
            buildValue={garageSummary.estimatedBuildCost}
          />

          <View style={styles.filterWrapper}>
            <GarageFilterBar
              searchQuery={searchQuery}
              sortOption={sortOption}
              onChangeSearchQuery={setSearchQuery}
              onChangeSortOption={setSortOption}
            />
          </View>

          {sortedMotorcycles.length > 0 ? (
            <View style={styles.list}>
              {sortedMotorcycles.map((motorcycle) => (
                <GarageMotorcycleCard
                  key={motorcycle.id}
                  motorcycle={motorcycle}
                  partCount={getPartCountByMotorcycle(parts, motorcycle.id)}
                  photoCount={getPhotoCountByMotorcycle(
                    motorcycleImages,
                    motorcycle.id,
                  )}
                  buildValue={getBuildValueByMotorcycle(parts, motorcycle.id)}
                  onPress={handleOpenMotorcycle}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyBox}>
              <EmptyState
                variant="dark"
                title={MOTORCYCLE_COPY.GARAGE_FILTER_EMPTY_TITLE}
                description={MOTORCYCLE_COPY.GARAGE_FILTER_EMPTY_DESCRIPTION}
                action={
                  <AppButton
                    theme="dark"
                    title={MOTORCYCLE_COPY.ADD_BUTTON}
                    onPress={handleAddMotorcycle}
                  />
                }
              />
            </View>
          )}
        </>
      ) : (
        <View style={styles.emptyGarage}>
          <View style={styles.emptyIcon}>
            <Plus size={28} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
          </View>

          <Text style={styles.emptyTitle}>Create your first build</Text>
          <Text style={styles.emptyDescription}>
            Add your motorcycle, upload a hero photo, and start documenting your
            setup for inspiration.
          </Text>

          <AppButton
            theme="dark"
            title="Create Build"
            onPress={handleAddMotorcycle}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["2xl"],
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
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
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  headerTextContent: {
    flex: 1,
  },
  eyebrow: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    marginTop: spacing.xs,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 30,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  addButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  filterWrapper: {
    padding: spacing.md,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  list: {
    gap: spacing.lg,
  },
  emptyBox: {
    padding: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  emptyGarage: {
    alignItems: "center",
    gap: spacing.md,
    padding: spacing["2xl"],
    borderRadius: 28,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  emptyIcon: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 29,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  emptyTitle: {
    marginTop: spacing.sm,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
    textAlign: "center",
  },
  emptyDescription: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
    textAlign: "center",
  },
});

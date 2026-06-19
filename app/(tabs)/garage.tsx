import { useCallback, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { ROUTES } from "@/src/constants/routes";
import { spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import { MotorcycleCard } from "@/src/features/motorcycle/components/MotorcycleCard";
import { getMyMotorcycles } from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

export default function GarageScreen() {
  const { user } = useAuth();

  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMotorcycles = useCallback(async () => {
    if (!user) return;

    try {
      const data = await getMyMotorcycles(user.id);
      setMotorcycles(data);
    } catch (error) {
      Alert.alert(
        MOTORCYCLE_COPY.LOAD_FAILED_TITLE,
        MOTORCYCLE_COPY.LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadMotorcycles();
    }, [loadMotorcycles]),
  );

  function handleAddMotorcycle() {
    router.push(ROUTES.MOTORCYCLE.ADD);
  }

  function handleOpenMotorcycle(motorcycleId: string) {
    router.push(ROUTES.MOTORCYCLE.DETAIL(motorcycleId));
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadMotorcycles();
  }

  return (
    <Screen padded={false}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <PageHeader
          title={MOTORCYCLE_COPY.GARAGE_TITLE}
          subtitle={MOTORCYCLE_COPY.GARAGE_SUBTITLE}
        />

        {motorcycles.length === 0 && !loading ? (
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
        ) : (
          <View style={styles.list}>
            {motorcycles.map((motorcycle) => (
              <MotorcycleCard
                key={motorcycle.id}
                motorcycle={motorcycle}
                onPress={() => handleOpenMotorcycle(motorcycle.id)}
              />
            ))}
          </View>
        )}

        {motorcycles.length > 0 ? (
          <AppButton
            title={MOTORCYCLE_COPY.ADD_BUTTON}
            onPress={handleAddMotorcycle}
          />
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.xl,
    gap: spacing["2xl"],
  },
  list: {
    gap: spacing.md,
  },
});

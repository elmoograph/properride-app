import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { Screen } from "@/src/components/layout";
import {
  AppButton,
  EmptyState,
  InfoRow,
  SectionCard,
} from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS } from "@/src/constants/storage";
import { colors, fontFamily, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import { PartHero } from "@/src/features/part/components/PartHero";
import {
  deletePart,
  getPartById,
} from "@/src/features/part/repositories/part.repository";
import type { Part } from "@/src/features/part/types/part.types";
import {
  formatCurrency,
  formatDate,
  formatOptionalValue,
} from "@/src/utils/format";
import { deleteUploadedImage } from "@/src/utils/uploadImage";
import { PartInfoGrid } from "@/src/features/part/components/PartInfoGrid";

export default function PartDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const partId = Array.isArray(id) ? id[0] : id;

  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const loadPart = useCallback(async () => {
    if (!partId) {
      setLoading(false);
      return;
    }

    try {
      const data = await getPartById(partId);
      setPart(data);
    } catch (error) {
      Alert.alert(
        PART_COPY.DETAIL_LOAD_FAILED_TITLE,
        PART_COPY.DETAIL_LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
    }
  }, [partId]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadPart();
    }, [loadPart]),
  );

  function handleEdit() {
    if (!partId) {
      return;
    }

    router.push(ROUTES.PART.EDIT(partId));
  }

  function handleBackToMotorcycle() {
    if (part?.motorcycle_id) {
      router.replace(ROUTES.MOTORCYCLE.DETAIL(part.motorcycle_id));
      return;
    }

    router.replace(ROUTES.TABS.GARAGE);
  }

  function confirmDelete() {
    Alert.alert(
      PART_COPY.DELETE_CONFIRM_TITLE,
      PART_COPY.DELETE_CONFIRM_MESSAGE,
      [
        {
          text: COMMON_COPY.CANCEL,
          style: "cancel",
        },
        {
          text: COMMON_COPY.DELETE,
          style: "destructive",
          onPress: handleDelete,
        },
      ],
    );
  }

  async function handleDelete() {
    if (!part) {
      return;
    }

    setDeleting(true);

    try {
      if (part.main_image_path) {
        await deleteUploadedImage({
          bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
          path: part.main_image_path,
        });
      }

      await deletePart(part.id);

      Alert.alert(
        PART_COPY.DELETE_SUCCESS_TITLE,
        PART_COPY.DELETE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () =>
              router.replace(ROUTES.MOTORCYCLE.DETAIL(part.motorcycle_id)),
          },
        ],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : PART_COPY.DELETE_FAILED_MESSAGE;

      Alert.alert(PART_COPY.DELETE_FAILED_TITLE, message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <ActivityIndicator color={colors.primary} />
      </Screen>
    );
  }

  if (!part) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <EmptyState
          title={PART_COPY.DETAIL_NOT_FOUND_TITLE}
          description={PART_COPY.DETAIL_NOT_FOUND_DESCRIPTION}
          action={
            <AppButton
              title={COMMON_COPY.BACK}
              variant="secondary"
              onPress={handleBackToMotorcycle}
            />
          }
        />
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <PartHero part={part} />

        <View style={styles.actionGroup}>
          <AppButton
            title={PART_COPY.DETAIL_EDIT_BUTTON}
            onPress={handleEdit}
            style={styles.actionButton}
          />

          <AppButton
            title={PART_COPY.DELETE_BUTTON}
            variant="danger"
            loading={deleting}
            onPress={confirmDelete}
            style={styles.actionButton}
          />
        </View>

        <PartInfoGrid part={part} />

        <SectionCard title={PART_COPY.DETAIL_OVERVIEW_TITLE}>
          <InfoRow
            label={PART_COPY.LABEL_CATEGORY}
            value={formatOptionalValue(part.category)}
          />

          <InfoRow
            label={PART_COPY.LABEL_BRAND}
            value={formatOptionalValue(part.brand || part.custom_brand)}
          />

          <InfoRow
            label={PART_COPY.LABEL_PRODUCT_NAME}
            value={formatOptionalValue(
              part.product_name || part.custom_product_name,
            )}
          />
        </SectionCard>

        <SectionCard title={PART_COPY.DETAIL_INSTALLATION_TITLE}>
          <InfoRow
            label={PART_COPY.LABEL_PURCHASE_DATE}
            value={formatOptionalValue(part.purchase_date)}
          />

          <InfoRow
            label={PART_COPY.LABEL_INSTALL_DATE}
            value={formatOptionalValue(part.install_date)}
          />

          <InfoRow
            label={PART_COPY.LABEL_WORKSHOP}
            value={formatOptionalValue(part.workshop)}
          />

          <InfoRow
            label={PART_COPY.LABEL_LOCATION}
            value={formatOptionalValue(part.location)}
          />
        </SectionCard>

        <SectionCard title={PART_COPY.DETAIL_DESCRIPTION_TITLE}>
          <Text style={styles.description}>
            {formatOptionalValue(part.description)}
          </Text>
        </SectionCard>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  actionGroup: {
    flexDirection: "row",
    gap: spacing.md,
  },
  description: {
    fontFamily: fontFamily.body.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  actionButton: {
    flex: 1,
  },
});

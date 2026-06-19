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
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { colors, fontFamily, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MotorcycleHero } from "@/src/features/motorcycle/components/MotorcycleHero";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import {
  deleteMotorcycle,
  getMotorcycleById,
} from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import { MotorcycleGalleryGrid } from "@/src/features/motorcycleImage/components/MotorcycleGalleryGrid";
import { MotorcycleGalleryModal } from "@/src/features/motorcycleImage/components/MotorcycleGalleryModal";
import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import {
  createMotorcycleImage,
  deleteMotorcycleImage,
  getMotorcycleImages,
} from "@/src/features/motorcycleImage/repositories/motorcycleImage.repository";
import type { MotorcycleImage } from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import {
  formatCc,
  formatMileage,
  formatOptionalValue,
} from "@/src/utils/format";
import { pickImageFromLibrary } from "@/src/utils/pickImage";
import { deleteUploadedImage, uploadImage } from "@/src/utils/uploadImage";
import { PartCard } from "@/src/features/part/components/PartCard";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import { getPartsByMotorcycleId } from "@/src/features/part/repositories/part.repository";
import type { Part } from "@/src/features/part/types/part.types";

export default function MotorcycleDetailScreen() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const motorcycleId = Array.isArray(id) ? id[0] : id;

  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [galleryImages, setGalleryImages] = useState<MotorcycleImage[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState<MotorcycleImage | null>(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [deletingGalleryImage, setDeletingGalleryImage] = useState(false);

  const loadDetail = useCallback(async () => {
    if (!motorcycleId) {
      setLoading(false);
      return;
    }

    try {
      const [motorcycleData, galleryData, partsData] = await Promise.all([
        getMotorcycleById(motorcycleId),
        getMotorcycleImages(motorcycleId),
        getPartsByMotorcycleId(motorcycleId),
      ]);

      setMotorcycle(motorcycleData);
      setGalleryImages(galleryData);
      setParts(partsData);
    } catch (error) {
      Alert.alert(
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_TITLE,
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
    }
  }, [motorcycleId]);

  async function refreshGallery() {
    if (!motorcycleId) {
      return;
    }

    const nextGalleryImages = await getMotorcycleImages(motorcycleId);
    setGalleryImages(nextGalleryImages);
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadDetail();
    }, [loadDetail]),
  );
  function handleAddPart() {
    if (!motorcycleId) {
      return;
    }

    router.push(ROUTES.PART.ADD(motorcycleId));
  }

  function handleOpenPart(partId: string) {
    router.push(ROUTES.PART.DETAIL(partId));
  }
  function handleEdit() {
    if (!motorcycleId) {
      return;
    }

    router.push(ROUTES.MOTORCYCLE.EDIT(motorcycleId));
  }

  function handleBackToGarage() {
    router.replace(ROUTES.TABS.GARAGE);
  }

  function confirmDelete() {
    Alert.alert(
      MOTORCYCLE_COPY.DELETE_CONFIRM_TITLE,
      MOTORCYCLE_COPY.DELETE_CONFIRM_MESSAGE,
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
    if (!motorcycleId) {
      return;
    }

    setDeleting(true);

    try {
      await deleteMotorcycle(motorcycleId);

      Alert.alert(
        MOTORCYCLE_COPY.DELETE_SUCCESS_TITLE,
        MOTORCYCLE_COPY.DELETE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () => router.replace(ROUTES.TABS.GARAGE),
          },
        ],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_COPY.DELETE_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_COPY.DELETE_FAILED_TITLE, message);
    } finally {
      setDeleting(false);
    }
  }

  async function handleAddGalleryImage() {
    if (!user || !motorcycleId) {
      return;
    }

    try {
      const imageUri = await pickImageFromLibrary();

      if (!imageUri) {
        return;
      }

      setUploadingGallery(true);

      const uploadedImage = await uploadImage({
        bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
        folder: STORAGE_FOLDERS.MOTORCYCLE_GALLERY,
        userId: user.id,
        uri: imageUri,
      });

      await createMotorcycleImage({
        motorcycle_id: motorcycleId,
        user_id: user.id,
        image_url: uploadedImage.publicUrl,
        image_path: uploadedImage.path,
      });

      await refreshGallery();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_IMAGE_COPY.UPLOAD_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_IMAGE_COPY.UPLOAD_FAILED_TITLE, message);
    } finally {
      setUploadingGallery(false);
    }
  }

  function handleOpenGalleryImage(image: MotorcycleImage) {
    setSelectedGalleryImage(image);
  }

  function handleCloseGalleryImage() {
    if (deletingGalleryImage) {
      return;
    }

    setSelectedGalleryImage(null);
  }

  function confirmDeleteGalleryImage() {
    Alert.alert(
      MOTORCYCLE_IMAGE_COPY.DELETE_CONFIRM_TITLE,
      MOTORCYCLE_IMAGE_COPY.DELETE_CONFIRM_MESSAGE,
      [
        {
          text: COMMON_COPY.CANCEL,
          style: "cancel",
        },
        {
          text: COMMON_COPY.DELETE,
          style: "destructive",
          onPress: handleDeleteGalleryImage,
        },
      ],
    );
  }

  async function handleDeleteGalleryImage() {
    if (!selectedGalleryImage) {
      return;
    }

    setDeletingGalleryImage(true);

    try {
      if (selectedGalleryImage.image_path) {
        await deleteUploadedImage({
          bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
          path: selectedGalleryImage.image_path,
        });
      }

      await deleteMotorcycleImage(selectedGalleryImage.id);

      setSelectedGalleryImage(null);
      await refreshGallery();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_IMAGE_COPY.DELETE_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_IMAGE_COPY.DELETE_FAILED_TITLE, message);
    } finally {
      setDeletingGalleryImage(false);
    }
  }

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <ActivityIndicator color={colors.primary} />
      </Screen>
    );
  }

  if (!motorcycle) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <EmptyState
          title={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_TITLE}
          description={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_DESCRIPTION}
          action={
            <AppButton
              title={COMMON_COPY.BACK}
              variant="secondary"
              onPress={handleBackToGarage}
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
        <MotorcycleHero motorcycle={motorcycle} />

        <View style={styles.actionGroup}>
          <AppButton
            title={MOTORCYCLE_COPY.DETAIL_EDIT_BUTTON}
            onPress={handleEdit}
          />

          <AppButton
            title={MOTORCYCLE_COPY.DELETE_BUTTON}
            variant="danger"
            loading={deleting}
            onPress={confirmDelete}
          />
        </View>

        <SectionCard title={MOTORCYCLE_IMAGE_COPY.GALLERY_TITLE}>
          {galleryImages.length > 0 ? (
            <MotorcycleGalleryGrid
              images={galleryImages}
              onPressImage={handleOpenGalleryImage}
            />
          ) : (
            <EmptyState
              title={MOTORCYCLE_IMAGE_COPY.GALLERY_EMPTY_TITLE}
              description={MOTORCYCLE_IMAGE_COPY.GALLERY_EMPTY_DESCRIPTION}
            />
          )}

          <View style={styles.galleryButton}>
            <AppButton
              title={MOTORCYCLE_IMAGE_COPY.ADD_GALLERY_BUTTON}
              variant="secondary"
              loading={uploadingGallery}
              onPress={handleAddGalleryImage}
            />
          </View>
        </SectionCard>
        <SectionCard title={PART_COPY.SECTION_TITLE}>
          {parts.length > 0 ? (
            <View style={styles.partsList}>
              {parts.map((part) => (
                <PartCard
                  key={part.id}
                  part={part}
                  onPress={() => handleOpenPart(part.id)}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              title={PART_COPY.SECTION_EMPTY_TITLE}
              description={PART_COPY.SECTION_EMPTY_DESCRIPTION}
            />
          )}

          <View style={styles.partsButton}>
            <AppButton
              title={PART_COPY.ADD_BUTTON}
              variant="secondary"
              onPress={handleAddPart}
            />
          </View>
        </SectionCard>
        <SectionCard title={MOTORCYCLE_COPY.DETAIL_OVERVIEW_TITLE}>
          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_NICKNAME}
            value={formatOptionalValue(motorcycle.nickname)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_STATUS}
            value={formatOptionalValue(motorcycle.status)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_VISIBILITY}
            value={formatOptionalValue(motorcycle.visibility)}
          />
        </SectionCard>

        <SectionCard title={MOTORCYCLE_COPY.DETAIL_SPECIFICATION_TITLE}>
          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_BRAND}
            value={formatOptionalValue(motorcycle.brand)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_MODEL}
            value={formatOptionalValue(motorcycle.model)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_VARIANT}
            value={formatOptionalValue(motorcycle.variant)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_YEAR}
            value={formatOptionalValue(motorcycle.year)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_COLOR}
            value={formatOptionalValue(motorcycle.color)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_ENGINE_CC}
            value={formatCc(motorcycle.engine_cc)}
          />

          <InfoRow
            label={MOTORCYCLE_COPY.LABEL_MILEAGE}
            value={formatMileage(motorcycle.mileage)}
          />
        </SectionCard>

        <SectionCard title={MOTORCYCLE_COPY.DETAIL_DESCRIPTION_TITLE}>
          <Text style={styles.description}>
            {formatOptionalValue(motorcycle.description)}
          </Text>
        </SectionCard>
      </ScrollView>

      <MotorcycleGalleryModal
        visible={Boolean(selectedGalleryImage)}
        image={selectedGalleryImage}
        deleting={deletingGalleryImage}
        onClose={handleCloseGalleryImage}
        onDelete={confirmDeleteGalleryImage}
      />
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
    gap: spacing.md,
  },
  galleryButton: {
    marginTop: spacing.lg,
  },
  description: {
    fontFamily: fontFamily.body.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  partsList: {
    gap: spacing.md,
  },
  partsButton: {
    marginTop: spacing.lg,
  },
});

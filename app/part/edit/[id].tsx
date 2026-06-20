import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { colors, spacing } from "@/src/theme";
import { PartForm } from "@/src/features/part/components/PartForm";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import {
  getPartById,
  updatePart,
} from "@/src/features/part/repositories/part.repository";
import type { Part } from "@/src/features/part/types/part.types";
import {
  INITIAL_PART_FORM,
  mapPartToForm,
  validatePartForm,
  type PartFormErrors,
  type PartFormValues,
} from "@/src/features/part/utils/partForm";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { parseOptionalDate } from "@/src/utils/date";
import { parseOptionalNumber } from "@/src/utils/number";
import { pickImageFromLibrary } from "@/src/utils/pickImage";
import { deleteUploadedImage, uploadImage } from "@/src/utils/uploadImage";

export default function EditPartScreen() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const partId = Array.isArray(id) ? id[0] : id;

  const [part, setPart] = useState<Part | null>(null);
  const [form, setForm] = useState<PartFormValues>(INITIAL_PART_FORM);
  const [errors, setErrors] = useState<PartFormErrors>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadPart = useCallback(async () => {
    if (!partId) {
      setLoading(false);
      return;
    }

    try {
      const data = await getPartById(partId);

      setPart(data);

      if (data) {
        setForm(mapPartToForm(data));
      }
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

  function updateField<FieldName extends keyof PartFormValues>(
    fieldName: FieldName,
    value: PartFormValues[FieldName],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: undefined,
    }));
  }

  async function handlePickImage() {
    try {
      const imageUri = await pickImageFromLibrary();

      if (!imageUri) {
        return;
      }

      updateField("mainImageLocalUri", imageUri);
    } catch (error) {
      Alert.alert(
        PART_COPY.IMAGE_PICK_FAILED_TITLE,
        PART_COPY.LOAD_FAILED_MESSAGE,
      );
    }
  }

  async function uploadMainImageIfNeeded(): Promise<{
    url: string | null;
    path: string | null;
  }> {
    if (!user || !form.mainImageLocalUri) {
      return {
        url: form.mainImageUrl || null,
        path: part?.main_image_path || null,
      };
    }

    const uploadedImage = await uploadImage({
      bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
      folder: STORAGE_FOLDERS.PARTS,
      userId: user.id,
      uri: form.mainImageLocalUri,
    });

    if (part?.main_image_path) {
      await deleteUploadedImage({
        bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
        path: part.main_image_path,
      });
    }

    return {
      url: uploadedImage.publicUrl,
      path: uploadedImage.path,
    };
  }

  async function handleSubmit() {
    if (!partId || !part) {
      return;
    }

    const nextErrors = validatePartForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const uploadedImage = await uploadMainImageIfNeeded();

      await updatePart(partId, {
        motorcycle_id: part.motorcycle_id,
        user_id: part.user_id,

        category: form.category,
        brand: form.brand.trim() || null,
        product_name: form.productName.trim() || null,

        price: parseOptionalNumber(form.price),
        purchase_date: parseOptionalDate(form.purchaseDate),
        install_date: parseOptionalDate(form.installDate),

        workshop: form.workshop.trim() || null,
        location: form.location.trim() || null,
        rating: parseOptionalNumber(form.rating),
        description: form.description.trim() || null,

        main_image_url: uploadedImage.url,
        main_image_path: uploadedImage.path,

        is_public: form.isPublic,
      });

      Alert.alert(
        PART_COPY.UPDATE_SUCCESS_TITLE,
        PART_COPY.UPDATE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: handleBackToPartDetail,
          },
        ],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : PART_COPY.UPDATE_FAILED_MESSAGE;

      Alert.alert(PART_COPY.UPDATE_FAILED_TITLE, message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    if (part) {
      router.replace(ROUTES.PART.DETAIL(part.id));
      return;
    }

    router.replace(ROUTES.TABS.GARAGE);
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
              onPress={handleBack}
            />
          }
        />
      </Screen>
    );
  }

  function handleBackToPartDetail() {
    router.back();
  }

  return (
    <Screen scroll keyboardAvoiding contentContainerStyle={styles.container}>
      <PageHeader
        title={PART_COPY.EDIT_SCREEN_TITLE}
        subtitle={PART_COPY.EDIT_SCREEN_SUBTITLE}
      />

      <PartForm
        values={form}
        errors={errors}
        submitting={submitting}
        submitTitle={PART_COPY.UPDATE_BUTTON}
        onChange={updateField}
        onPickImage={handlePickImage}
        onSubmit={handleSubmit}
      />
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
});

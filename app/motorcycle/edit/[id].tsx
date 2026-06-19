import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { colors, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MotorcycleForm } from "@/src/features/motorcycle/components/MotorcycleForm";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import {
  getMotorcycleById,
  updateMotorcycle,
} from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import {
  INITIAL_MOTORCYCLE_FORM,
  mapMotorcycleToForm,
  validateMotorcycleForm,
  type MotorcycleFormErrors,
  type MotorcycleFormValues,
} from "@/src/features/motorcycle/utils/motorcycleForm";
import { parseOptionalNumber } from "@/src/utils/number";
import { pickImageFromLibrary } from "@/src/utils/pickImage";
import { uploadImage } from "@/src/utils/uploadImage";

export default function EditMotorcycleScreen() {
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const motorcycleId = Array.isArray(id) ? id[0] : id;

  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [form, setForm] = useState<MotorcycleFormValues>(
    INITIAL_MOTORCYCLE_FORM,
  );
  const [errors, setErrors] = useState<MotorcycleFormErrors>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadMotorcycle = useCallback(async () => {
    if (!motorcycleId) {
      setLoading(false);
      return;
    }

    try {
      const data = await getMotorcycleById(motorcycleId);

      setMotorcycle(data);

      if (data) {
        setForm(mapMotorcycleToForm(data));
      }
    } catch (error) {
      Alert.alert(
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_TITLE,
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
    }
  }, [motorcycleId]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadMotorcycle();
    }, [loadMotorcycle]),
  );

  function updateField<FieldName extends keyof MotorcycleFormValues>(
    fieldName: FieldName,
    value: MotorcycleFormValues[FieldName],
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

      updateField("heroImageLocalUri", imageUri);
    } catch (error) {
      Alert.alert(
        MOTORCYCLE_COPY.IMAGE_PICK_FAILED_TITLE,
        MOTORCYCLE_COPY.LOAD_FAILED_MESSAGE,
      );
    }
  }

  async function uploadHeroImageIfNeeded(): Promise<string | null> {
    if (!user || !form.heroImageLocalUri) {
      return form.heroImageUrl || null;
    }

    const uploadedImage = await uploadImage({
      bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
      folder: STORAGE_FOLDERS.MOTORCYCLES,
      userId: user.id,
      uri: form.heroImageLocalUri,
    });

    return uploadedImage.publicUrl;
  }

  async function handleSubmit() {
    if (!motorcycleId) {
      return;
    }

    const nextErrors = validateMotorcycleForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const heroImageUrl = await uploadHeroImageIfNeeded();

      await updateMotorcycle(motorcycleId, {
        brand: form.brand.trim(),
        model: form.model.trim(),
        variant: form.variant.trim() || null,
        year: parseOptionalNumber(form.year),
        color: form.color.trim() || null,
        engine_cc: parseOptionalNumber(form.engineCc),
        nickname: form.nickname.trim() || null,
        mileage: parseOptionalNumber(form.mileage) ?? 0,
        description: form.description.trim() || null,
        hero_image_url: heroImageUrl,
      });

      Alert.alert(
        MOTORCYCLE_COPY.UPDATE_SUCCESS_TITLE,
        MOTORCYCLE_COPY.UPDATE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () => router.back(),
          },
        ],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_COPY.IMAGE_UPLOAD_FAILED_TITLE;

      Alert.alert(MOTORCYCLE_COPY.UPDATE_FAILED_TITLE, message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleBackToGarage() {
    router.replace(ROUTES.TABS.GARAGE);
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
    <Screen scroll keyboardAvoiding contentContainerStyle={styles.container}>
      <PageHeader
        title={MOTORCYCLE_COPY.EDIT_SCREEN_TITLE}
        subtitle={MOTORCYCLE_COPY.EDIT_SCREEN_SUBTITLE}
      />

      <MotorcycleForm
        values={form}
        errors={errors}
        submitting={submitting}
        submitTitle={MOTORCYCLE_COPY.UPDATE_BUTTON}
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

import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { router } from "expo-router";

import { Screen } from "@/src/components/layout";
import { PageHeader } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MotorcycleForm } from "@/src/features/motorcycle/components/MotorcycleForm";
import {
  MOTORCYCLE_COPY,
  MOTORCYCLE_STATUS,
  MOTORCYCLE_VISIBILITY,
} from "@/src/features/motorcycle/constants/motorcycle.constants";
import { createMotorcycle } from "@/src/features/motorcycle/repositories/motorcycle.repository";
import {
  INITIAL_MOTORCYCLE_FORM,
  validateMotorcycleForm,
  type MotorcycleFormErrors,
  type MotorcycleFormValues,
} from "@/src/features/motorcycle/utils/motorcycleForm";
import { parseOptionalNumber } from "@/src/utils/number";
import { pickImageFromLibrary } from "@/src/utils/pickImage";
import { uploadImage } from "@/src/utils/uploadImage";

export default function AddMotorcycleScreen() {
  const { user } = useAuth();

  const [form, setForm] = useState<MotorcycleFormValues>(
    INITIAL_MOTORCYCLE_FORM,
  );
  const [errors, setErrors] = useState<MotorcycleFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

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
    if (!user) {
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

      await createMotorcycle({
        user_id: user.id,
        brand: form.brand,
        model: form.model,
        variant: form.variant || null,
        year: parseOptionalNumber(form.year),
        color: form.color || null,
        engine_cc: parseOptionalNumber(form.engineCc),
        nickname: form.nickname || null,
        mileage: parseOptionalNumber(form.mileage) ?? 0,
        description: form.description || null,
        hero_image_url: heroImageUrl,
        visibility: MOTORCYCLE_VISIBILITY.PUBLIC,
        status: MOTORCYCLE_STATUS.ACTIVE,
      });

      Alert.alert(
        MOTORCYCLE_COPY.SAVE_SUCCESS_TITLE,
        MOTORCYCLE_COPY.SAVE_SUCCESS_MESSAGE,
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
          : MOTORCYCLE_COPY.IMAGE_UPLOAD_FAILED_TITLE;

      Alert.alert(MOTORCYCLE_COPY.SAVE_FAILED_TITLE, message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen scroll keyboardAvoiding contentContainerStyle={styles.container}>
      <PageHeader
        title={MOTORCYCLE_COPY.ADD_SCREEN_TITLE}
        subtitle={MOTORCYCLE_COPY.ADD_SCREEN_SUBTITLE}
      />

      <MotorcycleForm
        values={form}
        errors={errors}
        submitting={submitting}
        submitTitle={MOTORCYCLE_COPY.SAVE_BUTTON}
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
});

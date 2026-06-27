import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { spacing } from "@/src/theme";
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
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

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

      if (!data) {
        setMotorcycle(null);
        return;
      }

      if (data.user_id !== user?.id) {
        Alert.alert(
          "Akses Ditolak",
          "Anda tidak memiliki izin untuk mengedit Build ini.",
          [
            {
              text: COMMON_COPY.OK,
              onPress: () => {
                router.replace(ROUTES.MOTORCYCLE.DETAIL(data.id));
              },
            },
          ],
        );

        setMotorcycle(null);
        return;
      }

      setMotorcycle(data);
      setForm(mapMotorcycleToForm(data));
    } catch (error) {
      Alert.alert(
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_TITLE,
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
    }
  }, [motorcycleId, user?.id]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadMotorcycle();
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
    if (
      !user ||
      !motorcycle ||
      motorcycle.user_id !== user.id ||
      !form.heroImageLocalUri
    ) {
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
    if (
      !motorcycleId ||
      !motorcycle ||
      motorcycle.user_id !== user?.id ||
      submitting
    ) {
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
        status: form.status,
        visibility: form.visibility,
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
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.TABS.GARAGE);
  }
  function handleCancel() {
    Alert.alert(
      "Discard changes?",
      "Changes you made to this build will not be saved.",
      [
        {
          text: "Keep Editing",
          style: "cancel",
        },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => router.back(),
        },
      ],
    );
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

  if (!motorcycle) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_TITLE}
          description={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_DESCRIPTION}
          action={
            <AppButton
              theme="dark"
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
    <Screen
      scroll
      keyboardAvoiding
      backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleCancel}>
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.eyebrow}>ProperRide Garage</Text>
          <Text style={styles.title}>Edit Build</Text>
          <Text style={styles.subtitle}>
            Update your motorcycle identity, setup details, and build
            visibility.
          </Text>
        </View>
      </View>

      <MotorcycleForm
        variant="dark"
        values={form}
        errors={errors}
        submitting={submitting}
        submitTitle={MOTORCYCLE_COPY.UPDATE_BUTTON}
        onChange={updateField}
        onPickImage={handlePickImage}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
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
    gap: spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  headerContent: {
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
    fontSize: 28,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
});

import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
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
import { spacing } from "@/src/theme";
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
    } catch {
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
    } catch {
      Alert.alert(
        PART_COPY.IMAGE_PICK_FAILED_TITLE,
        PART_COPY.IMAGE_PICK_FAILED_MESSAGE,
      );
    }
  }

  async function uploadMainImageIfNeeded(): Promise<{
    url: string | null;
    path: string | null;
    previousPathToDelete: string | null;
  }> {
    if (!user || !form.mainImageLocalUri) {
      return {
        url: form.mainImageUrl || null,
        path: part?.main_image_path || null,
        previousPathToDelete: null,
      };
    }

    const uploadedImage = await uploadImage({
      bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
      folder: STORAGE_FOLDERS.PARTS,
      userId: user.id,
      uri: form.mainImageLocalUri,
    });

    return {
      url: uploadedImage.publicUrl,
      path: uploadedImage.path,
      previousPathToDelete: part?.main_image_path || null,
    };
  }

  function navigateToPartDetail() {
    if (part?.id) {
      router.replace(ROUTES.PART.DETAIL(part.id));
      return;
    }

    router.replace(ROUTES.TABS.GARAGE);
  }

  function handleCancel() {
    Alert.alert(PART_COPY.CANCEL_EDIT_TITLE, PART_COPY.CANCEL_EDIT_MESSAGE, [
      {
        text: PART_COPY.KEEP_EDITING_BUTTON,
        style: "cancel",
      },
      {
        text: PART_COPY.DISCARD_CHANGES_BUTTON,
        style: "destructive",
        onPress: navigateToPartDetail,
      },
    ]);
  }

  async function handleSubmit() {
    if (!partId || !part || submitting) {
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

      /*
       * Hapus gambar lama setelah update database berhasil.
       * Ini mencegah gambar lama hilang jika proses update gagal.
       */
      if (uploadedImage.previousPathToDelete) {
        try {
          await deleteUploadedImage({
            bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
            path: uploadedImage.previousPathToDelete,
          });
        } catch (error) {
          console.warn("Gagal menghapus gambar part lama:", error);
        }
      }

      Alert.alert(
        PART_COPY.UPDATE_SUCCESS_TITLE,
        PART_COPY.UPDATE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: navigateToPartDetail,
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

  if (!part) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={PART_COPY.DETAIL_NOT_FOUND_TITLE}
          description={PART_COPY.DETAIL_NOT_FOUND_DESCRIPTION}
          action={
            <AppButton
              title={COMMON_COPY.BACK}
              variant="secondary"
              onPress={navigateToPartDetail}
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali ke detail part"
          disabled={submitting}
          onPress={handleCancel}
          style={({ pressed }) => [
            styles.backButton,
            pressed && !submitting ? styles.pressed : null,
            submitting ? styles.disabled : null,
          ]}
        >
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.eyebrow}>Build Setup</Text>

          <Text style={styles.title}>{PART_COPY.EDIT_SCREEN_TITLE}</Text>

          <Text style={styles.subtitle}>{PART_COPY.EDIT_SCREEN_SUBTITLE}</Text>
        </View>
      </View>

      <PartForm
        variant="dark"
        values={form}
        errors={errors}
        submitting={submitting}
        submitTitle={PART_COPY.UPDATE_BUTTON}
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
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
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
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.5,
  },
});

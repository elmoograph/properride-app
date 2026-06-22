import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Screen } from "@/src/components/layout";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { PartForm } from "@/src/features/part/components/PartForm";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import { createPart } from "@/src/features/part/repositories/part.repository";
import {
  INITIAL_PART_FORM,
  validatePartForm,
  type PartFormErrors,
  type PartFormValues,
} from "@/src/features/part/utils/partForm";
import { parseOptionalDate } from "@/src/utils/date";
import { parseOptionalNumber } from "@/src/utils/number";
import { pickImageFromLibrary } from "@/src/utils/pickImage";
import { uploadImage } from "@/src/utils/uploadImage";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

export default function AddPartScreen() {
  const { user } = useAuth();
  const { motorcycleId } = useLocalSearchParams<{ motorcycleId: string }>();

  const resolvedMotorcycleId = Array.isArray(motorcycleId)
    ? motorcycleId[0]
    : motorcycleId;

  const [form, setForm] = useState<PartFormValues>(INITIAL_PART_FORM);
  const [errors, setErrors] = useState<PartFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

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
        path: null,
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
    };
  }
  function handleCancel() {
    Alert.alert(
      "Batalkan penambahan part?",
      "Informasi part yang sudah Anda isi tidak akan disimpan.",
      [
        {
          text: "Lanjut Mengedit",
          style: "cancel",
        },
        {
          text: "Buang Perubahan",
          style: "destructive",
          onPress: () => {
            if (router.canGoBack()) {
              router.back();
              return;
            }

            if (resolvedMotorcycleId) {
              router.replace(ROUTES.MOTORCYCLE.DETAIL(resolvedMotorcycleId));
            }
          },
        },
      ],
    );
  }
  async function handleSubmit() {
    if (!user || !resolvedMotorcycleId) {
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

      await createPart({
        motorcycle_id: resolvedMotorcycleId,
        user_id: user.id,

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
        PART_COPY.SAVE_SUCCESS_TITLE,
        PART_COPY.SAVE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () =>
              router.replace(ROUTES.MOTORCYCLE.DETAIL(resolvedMotorcycleId)),
          },
        ],
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : PART_COPY.SAVE_FAILED_MESSAGE;

      Alert.alert(PART_COPY.SAVE_FAILED_TITLE, message);
    } finally {
      setSubmitting(false);
    }
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
          style={styles.backButton}
          onPress={handleCancel}
          disabled={submitting}
        >
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.eyebrow}>Build Setup</Text>

          <Text style={styles.title}>{PART_COPY.ADD_SCREEN_TITLE}</Text>

          <Text style={styles.subtitle}>{PART_COPY.ADD_SCREEN_SUBTITLE}</Text>
        </View>
      </View>

      <PartForm
        variant="dark"
        values={form}
        errors={errors}
        submitting={submitting}
        submitTitle={PART_COPY.SAVE_BUTTON}
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

import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { Screen } from "@/src/components/layout";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
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
import {
  AppInput,
  FormSection,
  ImagePickerBox,
  SelectChipGroup,
} from "@/src/components/ui";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { ArrowLeft } from "lucide-react-native";

const MOTORCYCLE_STATUS_OPTIONS = [
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
];

const MOTORCYCLE_VISIBILITY_OPTIONS = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

export default function AddMotorcycleScreen() {
  const { user } = useAuth();

  const [form, setForm] = useState<MotorcycleFormValues>(
    INITIAL_MOTORCYCLE_FORM,
  );
  const [errors, setErrors] = useState<MotorcycleFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  function handleCancel() {
    Alert.alert(
      "Cancel create build?",
      "Your motorcycle data will not be saved.",
      [
        {
          text: "Keep Editing",
          style: "cancel",
        },
        {
          text: "Cancel",
          style: "destructive",
          onPress: () => router.replace(ROUTES.TABS.GARAGE),
        },
      ],
    );
  }

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
        visibility: form.visibility,
        status: form.status,
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

        <View style={styles.headerTextContent}>
          <Text style={styles.headerEyebrow}>ProperRide Garage</Text>
          <Text style={styles.headerTitle}>Create Build</Text>
          <Text style={styles.headerSubtitle}>
            Add your motorcycle and start building your garage showcase.
          </Text>
        </View>
      </View>

      <FormSection title="Build Cover" variant="dark">
        <ImagePickerBox
          variant="dark"
          imageUri={form.heroImageLocalUri || form.heroImageUrl}
          title="Add motorcycle photo"
          description="Use a clean side view or hero shot for the best showcase look."
          onPress={handlePickImage}
        />
      </FormSection>

      <FormSection title="Build Identity" variant="dark">
        <AppInput
          variant="dark"
          label="Brand"
          value={form.brand}
          onChangeText={(value) => updateField("brand", value)}
          placeholder="Yamaha"
          error={errors.brand}
        />

        <AppInput
          variant="dark"
          label="Model"
          value={form.model}
          onChangeText={(value) => updateField("model", value)}
          placeholder="NMAX Neo"
          error={errors.model}
        />

        <AppInput
          variant="dark"
          label="Variant"
          value={form.variant}
          onChangeText={(value) => updateField("variant", value)}
          placeholder="ABS / Connected / Turbo"
        />

        <AppInput
          variant="dark"
          label="Nickname"
          value={form.nickname}
          onChangeText={(value) => updateField("nickname", value)}
          placeholder="Neon Beast"
        />
      </FormSection>

      <FormSection title="Motorcycle Specs" variant="dark">
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <AppInput
              variant="dark"
              label="Year"
              value={form.year}
              onChangeText={(value) => updateField("year", value)}
              placeholder="2024"
              keyboardType="numeric"
              error={errors.year}
            />
          </View>

          <View style={styles.rowItem}>
            <AppInput
              variant="dark"
              label="Engine CC"
              value={form.engineCc}
              onChangeText={(value) => updateField("engineCc", value)}
              placeholder="155"
              keyboardType="numeric"
            />
          </View>
        </View>

        <AppInput
          variant="dark"
          label="Color"
          value={form.color}
          onChangeText={(value) => updateField("color", value)}
          placeholder="Black / Matte Grey / Lime"
        />

        <AppInput
          variant="dark"
          label="Mileage"
          value={form.mileage}
          onChangeText={(value) => updateField("mileage", value)}
          placeholder="18250"
          keyboardType="numeric"
        />
      </FormSection>

      <FormSection title="Build Status" variant="dark">
        <SelectChipGroup
          variant="dark"
          label="Status"
          options={MOTORCYCLE_STATUS_OPTIONS}
          value={form.status}
          onChange={(value) => updateField("status", value)}
        />

        <SelectChipGroup
          variant="dark"
          label="Visibility"
          options={MOTORCYCLE_VISIBILITY_OPTIONS}
          value={form.visibility}
          onChange={(value) => updateField("visibility", value)}
        />

        <View style={styles.visibilityHint}>
          <Text style={styles.visibilityHintTitle}>
            Public builds inspire other riders
          </Text>
          <Text style={styles.visibilityHintText}>
            Public motorcycles can be discovered later in Garage Explore and
            public profile.
          </Text>
        </View>
      </FormSection>

      <FormSection title="Build Story" variant="dark">
        <AppInput
          variant="dark"
          label="Description"
          value={form.description}
          onChangeText={(value) => updateField("description", value)}
          placeholder="Tell the story, concept, or direction of this build."
          multiline
        />
      </FormSection>

      <View style={styles.footer}>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[
            styles.createButton,
            submitting ? styles.createButtonDisabled : null,
          ]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.createButtonText}>
            {submitting ? "Creating..." : "Create Build"}
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
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
  headerTextContent: {
    flex: 1,
  },
  headerEyebrow: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  headerTitle: {
    marginTop: spacing.xs,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 28,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  headerSubtitle: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  rowItem: {
    flex: 1,
  },
  visibilityHint: {
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  visibilityHintTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  visibilityHintText: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  cancelButton: {
    minHeight: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  cancelButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  createButton: {
    minHeight: 50,
    flex: 1.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
});

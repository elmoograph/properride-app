import { useCallback, useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Globe2, LockKeyhole } from "lucide-react-native";

import { Screen } from "@/src/components/layout";
import {
  AppButton,
  AppInput,
  EmptyState,
  FormSection,
} from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { GalleryMediaPreviewGrid } from "@/src/features/motorcycleImage/components/GalleryMediaPreviewGrid";
import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import { createMotorcycleGalleryPostWithMedia } from "@/src/features/motorcycleImage/repositories/motorcycleGallery.repository";
import type {
  GalleryVisibility,
  PickedGalleryMedia,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import { getMotorcycleById } from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import {
  appendGalleryMedia,
  INITIAL_GALLERY_POST_FORM,
  removeGalleryMedia,
  validateGalleryPostForm,
  type GalleryPostFormErrors,
  type GalleryPostFormValues,
} from "@/src/features/motorcycleImage/utils/galleryPostForm";
import { pickGalleryMedia } from "@/src/features/motorcycleImage/utils/pickGalleryMedia";
import {
  deleteUploadedGalleryMedia,
  uploadGalleryMedia,
} from "@/src/features/motorcycleImage/utils/uploadGalleryMedia";
import { radius, spacing } from "@/src/theme";

export default function AddGalleryScreen() {
  const { user } = useAuth();

  const { motorcycleId } = useLocalSearchParams<{
    motorcycleId: string;
  }>();

  const resolvedMotorcycleId = Array.isArray(motorcycleId)
    ? motorcycleId[0]
    : motorcycleId;

  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

  const [loading, setLoading] = useState(true);

  const loadMotorcycle = useCallback(async () => {
    if (!resolvedMotorcycleId) {
      setMotorcycle(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getMotorcycleById(resolvedMotorcycleId);

      if (!data) {
        setMotorcycle(null);
        return;
      }

      if (data.user_id !== user?.id) {
        Alert.alert(
          "Akses Ditolak",
          "Anda tidak memiliki izin untuk menambahkan Gallery pada Build ini.",
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
    } catch (error) {
      Alert.alert(
        "Gallery Tidak Dapat Dimuat",
        "Terjadi kendala saat memuat data Build. Silakan coba kembali.",
      );
    } finally {
      setLoading(false);
    }
  }, [resolvedMotorcycleId, user?.id]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadMotorcycle();
    }, [loadMotorcycle]),
  );

  const [form, setForm] = useState<GalleryPostFormValues>(
    INITIAL_GALLERY_POST_FORM,
  );

  const [errors, setErrors] = useState<GalleryPostFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    completed: 0,
    total: 0,
  });

  function updateField<FieldName extends keyof GalleryPostFormValues>(
    fieldName: FieldName,
    value: GalleryPostFormValues[FieldName],
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

  async function handlePickMedia() {
    if (submitting) {
      return;
    }

    try {
      const selectedMedia = await pickGalleryMedia();

      if (selectedMedia.length === 0) {
        return;
      }

      const nextMedia = appendGalleryMedia(form.media, selectedMedia);

      updateField("media", nextMedia);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_IMAGE_COPY.MEDIA_PICK_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_IMAGE_COPY.MEDIA_PICK_FAILED_TITLE, message);
    }
  }

  function handleRemoveMedia(mediaId: string) {
    if (submitting) {
      return;
    }

    const nextMedia = removeGalleryMedia(form.media, mediaId);

    updateField("media", nextMedia);
  }

  function handleChangeVisibility(visibility: GalleryVisibility) {
    if (submitting) {
      return;
    }

    updateField("visibility", visibility);
  }

  function navigateBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    if (resolvedMotorcycleId) {
      router.replace(ROUTES.MOTORCYCLE.DETAIL(resolvedMotorcycleId));
      return;
    }

    router.replace(ROUTES.TABS.GARAGE);
  }

  function handleCancel() {
    if (submitting) {
      return;
    }

    const hasChanges =
      form.media.length > 0 ||
      Boolean(form.caption.trim()) ||
      form.visibility !== "public";

    if (!hasChanges) {
      navigateBack();
      return;
    }

    Alert.alert(
      MOTORCYCLE_IMAGE_COPY.CANCEL_CONFIRM_TITLE,
      MOTORCYCLE_IMAGE_COPY.CANCEL_CONFIRM_MESSAGE,
      [
        {
          text: MOTORCYCLE_IMAGE_COPY.KEEP_EDITING_BUTTON,
          style: "cancel",
        },
        {
          text: MOTORCYCLE_IMAGE_COPY.DISCARD_BUTTON,
          style: "destructive",
          onPress: navigateBack,
        },
      ],
    );
  }

  async function uploadSelectedMedia(selectedMedia: PickedGalleryMedia[]) {
    if (!user || !motorcycle || motorcycle.user_id !== user.id) {
      return [];
    }

    const uploadedItems = [];

    setUploadProgress({
      completed: 0,
      total: selectedMedia.length,
    });

    for (let index = 0; index < selectedMedia.length; index += 1) {
      const uploadedItem = await uploadGalleryMedia({
        userId: user.id,
        media: selectedMedia[index],
      });

      uploadedItems.push(uploadedItem);

      setUploadProgress({
        completed: index + 1,
        total: selectedMedia.length,
      });
    }

    return uploadedItems;
  }

  async function handleSubmit() {
    if (
      !user ||
      !resolvedMotorcycleId ||
      !motorcycle ||
      motorcycle.user_id !== user.id ||
      submitting
    ) {
      return;
    }

    const nextErrors = validateGalleryPostForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const uploadedPaths: string[] = [];

    try {
      const uploadedMedia = await uploadSelectedMedia(form.media);

      uploadedPaths.push(...uploadedMedia.map((item) => item.path));

      await createMotorcycleGalleryPostWithMedia({
        post: {
          motorcycle_id: resolvedMotorcycleId,
          user_id: user.id,
          caption: form.caption.trim() || null,
          visibility: form.visibility,
        },
        media: uploadedMedia.map((item, index) => ({
          media_type: item.mediaType,
          media_url: item.publicUrl,
          media_path: item.path,

          thumbnail_url: null,
          thumbnail_path: null,

          width: item.width,
          height: item.height,
          duration_ms: item.durationMs,

          sort_order: index,
        })),
      });

      Alert.alert(
        MOTORCYCLE_IMAGE_COPY.POST_SUCCESS_TITLE,
        MOTORCYCLE_IMAGE_COPY.POST_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () =>
              router.replace(ROUTES.MOTORCYCLE.DETAIL(resolvedMotorcycleId)),
          },
        ],
      );
    } catch (error) {
      /*
       * Bila upload atau insert database gagal,
       * hapus seluruh file yang sudah sempat diunggah.
       */
      if (uploadedPaths.length > 0) {
        try {
          await deleteUploadedGalleryMedia(uploadedPaths);
        } catch (cleanupError) {
          console.warn("Gagal membersihkan media Gallery:", cleanupError);
        }
      }

      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_IMAGE_COPY.POST_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_IMAGE_COPY.POST_FAILED_TITLE, message);
    } finally {
      setSubmitting(false);
      setUploadProgress({
        completed: 0,
        total: 0,
      });
    }
  }

  const submitTitle =
    submitting && uploadProgress.total > 0
      ? `${MOTORCYCLE_IMAGE_COPY.PUBLISHING_LABEL} ${uploadProgress.completed}/${uploadProgress.total}`
      : MOTORCYCLE_IMAGE_COPY.PUBLISH_BUTTON;

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
          title="Build Tidak Ditemukan"
          description="Build tidak tersedia atau Anda tidak memiliki akses untuk menambahkan Gallery."
          action={
            <AppButton
              theme="dark"
              title={COMMON_COPY.BACK}
              variant="secondary"
              onPress={navigateBack}
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
          accessibilityLabel="Kembali"
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
          <Text style={styles.eyebrow}>
            {MOTORCYCLE_IMAGE_COPY.CREATE_POST_EYEBROW}
          </Text>

          <Text style={styles.title}>
            {MOTORCYCLE_IMAGE_COPY.CREATE_POST_TITLE}
          </Text>

          <Text style={styles.subtitle}>
            {MOTORCYCLE_IMAGE_COPY.CREATE_POST_SUBTITLE}
          </Text>
        </View>
      </View>

      <FormSection
        variant="dark"
        title={MOTORCYCLE_IMAGE_COPY.MEDIA_SECTION_TITLE}
        description={MOTORCYCLE_IMAGE_COPY.MEDIA_SECTION_DESCRIPTION}
      >
        <GalleryMediaPreviewGrid
          media={form.media}
          disabled={submitting}
          onAddMedia={handlePickMedia}
          onRemoveMedia={handleRemoveMedia}
        />

        {errors.media ? <Text style={styles.error}>{errors.media}</Text> : null}
      </FormSection>

      <FormSection
        variant="dark"
        title={MOTORCYCLE_IMAGE_COPY.POST_DETAIL_SECTION_TITLE}
        description={MOTORCYCLE_IMAGE_COPY.POST_DETAIL_SECTION_DESCRIPTION}
      >
        <AppInput
          variant="dark"
          label={MOTORCYCLE_IMAGE_COPY.CAPTION_LABEL}
          value={form.caption}
          onChangeText={(value) => updateField("caption", value)}
          placeholder={MOTORCYCLE_IMAGE_COPY.CAPTION_PLACEHOLDER}
          multiline
        />

        <View style={styles.visibilityGroup}>
          <Text style={styles.visibilityLabel}>
            {MOTORCYCLE_IMAGE_COPY.VISIBILITY_LABEL}
          </Text>

          <VisibilityOption
            active={form.visibility === "public"}
            title={MOTORCYCLE_IMAGE_COPY.VISIBILITY_PUBLIC}
            description={MOTORCYCLE_IMAGE_COPY.VISIBILITY_PUBLIC_DESCRIPTION}
            icon={
              <Globe2
                size={19}
                color={
                  form.visibility === "public"
                    ? MOTORCYCLE_SHOWCASE_COLORS.accent
                    : MOTORCYCLE_SHOWCASE_COLORS.textMuted
                }
              />
            }
            disabled={submitting}
            onPress={() => handleChangeVisibility("public")}
          />

          <VisibilityOption
            active={form.visibility === "private"}
            title={MOTORCYCLE_IMAGE_COPY.VISIBILITY_PRIVATE}
            description={MOTORCYCLE_IMAGE_COPY.VISIBILITY_PRIVATE_DESCRIPTION}
            icon={
              <LockKeyhole
                size={19}
                color={
                  form.visibility === "private"
                    ? MOTORCYCLE_SHOWCASE_COLORS.accent
                    : MOTORCYCLE_SHOWCASE_COLORS.textMuted
                }
              />
            }
            disabled={submitting}
            onPress={() => handleChangeVisibility("private")}
          />
        </View>
      </FormSection>

      {submitting && uploadProgress.total > 0 ? (
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Mengunggah media</Text>

            <Text style={styles.progressValue}>
              {uploadProgress.completed}/{uploadProgress.total}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    (uploadProgress.completed / uploadProgress.total) * 100
                  }%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressDescription}>
            Jangan tutup aplikasi hingga proses selesai.
          </Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <View style={styles.cancelAction}>
          <AppButton
            title={MOTORCYCLE_IMAGE_COPY.CANCEL_BUTTON}
            variant="secondary"
            disabled={submitting}
            onPress={handleCancel}
          />
        </View>

        <View style={styles.submitAction}>
          <AppButton
            title={submitTitle}
            loading={submitting}
            disabled={submitting}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </Screen>
  );
}

type VisibilityOptionProps = {
  active: boolean;
  title: string;
  description: string;
  icon: ReactNode;
  disabled?: boolean;
  onPress: () => void;
};

function VisibilityOption({
  active,
  title,
  description,
  icon,
  disabled = false,
  onPress,
}: VisibilityOptionProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{
        checked: active,
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.visibilityOption,
        active ? styles.visibilityOptionActive : null,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <View style={styles.visibilityIcon}>{icon}</View>

      <View style={styles.visibilityContent}>
        <Text style={styles.visibilityTitle}>{title}</Text>

        <Text style={styles.visibilityDescription}>{description}</Text>
      </View>

      <View
        style={[styles.radioOuter, active ? styles.radioOuterActive : null]}
      >
        {active ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
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
    borderRadius: radius.full,
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
  visibilityGroup: {
    gap: spacing.md,
  },
  visibilityLabel: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  visibilityOption: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  visibilityOptionActive: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: "rgba(167,244,50,0.07)",
  },
  visibilityIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  visibilityContent: {
    flex: 1,
  },
  visibilityTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  visibilityDescription: {
    marginTop: 3,
    fontFamily: "Inter-Regular",
    fontSize: 11,
    lineHeight: 17,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  radioOuter: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  radioOuterActive: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  progressCard: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  progressValue: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  progressTrack: {
    height: 6,
    overflow: "hidden",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  progressFill: {
    height: "100%",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  progressDescription: {
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  cancelAction: {
    flex: 1,
  },
  submitAction: {
    flex: 1.4,
  },
  error: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#EF4444",
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.5,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
});

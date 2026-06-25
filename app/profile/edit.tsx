import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { router, useFocusEffect, useNavigation } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { EditProfileForm } from "@/src/features/profile/components/EditProfileForm";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import {
  getProfile,
  updateProfile,
  isUsernameAvailable,
} from "@/src/features/profile/repositories/profile.repository";
import type { Profile } from "@/src/features/profile/types/profile.types";
import {
  INITIAL_PROFILE_FORM,
  mapProfileToForm,
  normalizeInstagramUsername,
  normalizeUsername,
  normalizeWebsite,
  validateProfileForm,
  type ProfileFormErrors,
  type ProfileFormValues,
} from "@/src/features/profile/utils/profileForm";
import { radius, spacing } from "@/src/theme";
import { pickImageFromLibrary } from "@/src/utils/pickImage";
import { deleteUploadedImage, uploadImage } from "@/src/utils/uploadImage";
import { usePreventRemove } from "expo-router/react-navigation";

type UploadedProfileImage = {
  path: string;
  publicUrl: string;
};

export default function EditProfileScreen() {
  const { user } = useAuth();
  const userId = user?.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<ProfileFormValues>(INITIAL_PROFILE_FORM);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigation = useNavigation();
  const [allowNavigation, setAllowNavigation] = useState(false);

  const hasChanges = useMemo(() => {
    if (!profile) {
      return false;
    }

    return (
      form.fullName.trim() !== (profile.full_name ?? "").trim() ||
      normalizeUsername(form.username) !==
        normalizeUsername(profile.username ?? "") ||
      form.bio.trim() !== (profile.bio ?? "").trim() ||
      form.location.trim() !== (profile.location ?? "").trim() ||
      normalizeWebsite(form.website) !==
        normalizeWebsite(profile.website ?? "") ||
      normalizeInstagramUsername(form.instagram) !==
        normalizeInstagramUsername(profile.instagram ?? "") ||
      Boolean(form.avatarLocalUri) ||
      Boolean(form.coverLocalUri) ||
      form.removeAvatar ||
      form.removeCover
    );
  }, [form, profile]);

  usePreventRemove(
    hasChanges && !submitting && !allowNavigation,
    ({ data }) => {
      Alert.alert(
        PROFILE_COPY.EDIT.DISCARD_TITLE,
        PROFILE_COPY.EDIT.DISCARD_MESSAGE,
        [
          {
            text: PROFILE_COPY.EDIT.KEEP_EDITING,
            style: "cancel",
          },
          {
            text: PROFILE_COPY.EDIT.DISCARD,
            style: "destructive",
            onPress: () => {
              navigation.dispatch(data.action);
            },
          },
        ],
      );
    },
  );
  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      setLoadFailed(false);
      return;
    }

    setLoading(true);
    setLoadFailed(false);
    setAllowNavigation(false);
    setSubmitError(null);
    setErrors({});

    try {
      const profileData = await getProfile(userId);

      setProfile(profileData);

      if (profileData) {
        setForm(mapProfileToForm(profileData));
        setErrors({});
      }
    } catch (error) {
      console.error("Gagal memuat Edit Profile:", error);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      void loadProfile();
    }, [loadProfile]),
  );

  function updateField<FieldName extends keyof ProfileFormValues>(
    fieldName: FieldName,
    value: ProfileFormValues[FieldName],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value,
    }));

    setSubmitError(null);

    if (
      fieldName === "fullName" ||
      fieldName === "username" ||
      fieldName === "bio" ||
      fieldName === "location" ||
      fieldName === "website" ||
      fieldName === "instagram"
    ) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: undefined,
      }));
    }
  }

  async function handlePickAvatar() {
    if (submitting) {
      return;
    }

    try {
      const imageUri = await pickImageFromLibrary({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!imageUri) {
        return;
      }

      setForm((currentForm) => ({
        ...currentForm,
        avatarLocalUri: imageUri,
        removeAvatar: false,
      }));
      setSubmitError(null);
    } catch (error) {
      console.error("Gagal memilih avatar:", error);

      Alert.alert(
        PROFILE_COPY.EDIT.IMAGE_PICK_FAILED_TITLE,
        PROFILE_COPY.EDIT.IMAGE_PICK_FAILED_MESSAGE,
      );
    }
  }

  async function handlePickCover() {
    if (submitting) {
      return;
    }

    try {
      const imageUri = await pickImageFromLibrary({
        allowsEditing: true,
        aspect: [16, 9],
      });

      if (!imageUri) {
        return;
      }

      setForm((currentForm) => ({
        ...currentForm,
        coverLocalUri: imageUri,
        removeCover: false,
      }));
      setSubmitError(null);
    } catch (error) {
      console.error("Gagal memilih cover:", error);

      Alert.alert(
        PROFILE_COPY.EDIT.IMAGE_PICK_FAILED_TITLE,
        PROFILE_COPY.EDIT.IMAGE_PICK_FAILED_MESSAGE,
      );
    }
  }

  async function uploadAvatarIfNeeded(): Promise<UploadedProfileImage | null> {
    if (!userId || !form.avatarLocalUri || form.removeAvatar) {
      return null;
    }

    return uploadImage({
      bucket: STORAGE_BUCKETS.PROFILE_IMAGES,
      folder: STORAGE_FOLDERS.PROFILE_AVATARS,
      userId,
      uri: form.avatarLocalUri,
    });
  }

  async function uploadCoverIfNeeded(): Promise<UploadedProfileImage | null> {
    if (!userId || !form.coverLocalUri || form.removeCover) {
      return null;
    }

    return uploadImage({
      bucket: STORAGE_BUCKETS.PROFILE_IMAGES,
      folder: STORAGE_FOLDERS.PROFILE_COVERS,
      userId,
      uri: form.coverLocalUri,
    });
  }

  async function rollbackNewUploads(
    uploadedImages: UploadedProfileImage[],
  ): Promise<void> {
    const rollbackResults = await Promise.allSettled(
      uploadedImages.map((uploadedImage) =>
        deleteUploadedImage({
          bucket: STORAGE_BUCKETS.PROFILE_IMAGES,
          path: uploadedImage.path,
        }),
      ),
    );

    rollbackResults.forEach((result, index) => {
      if (result.status === "rejected") {
        console.warn(
          "Gagal melakukan rollback Profile image:",
          uploadedImages[index]?.path,
          result.reason,
        );
      }
    });
  }

  async function cleanupPreviousImages(params: {
    avatarUpload: UploadedProfileImage | null;
    coverUpload: UploadedProfileImage | null;
  }): Promise<void> {
    const pathsToDelete = new Set<string>();

    if ((params.avatarUpload || form.removeAvatar) && profile?.avatar_path) {
      pathsToDelete.add(profile.avatar_path);
    }

    if ((params.coverUpload || form.removeCover) && profile?.cover_path) {
      pathsToDelete.add(profile.cover_path);
    }

    const paths = Array.from(pathsToDelete);

    const results = await Promise.allSettled(
      paths.map((path) =>
        deleteUploadedImage({
          bucket: STORAGE_BUCKETS.PROFILE_IMAGES,
          path,
        }),
      ),
    );

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.warn(
          "Profile berhasil diperbarui, tetapi file lama gagal dihapus:",
          paths[index],
          result.reason,
        );
      }
    });
  }

  async function handleSubmit() {
    if (!userId || !profile || submitting) {
      return;
    }
    setSubmitError(null);
    const nextErrors = validateProfileForm(form);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const normalizedUsername = normalizeUsername(form.username);

    const usernameChanged =
      normalizedUsername !== normalizeUsername(profile.username ?? "");

    setSubmitting(true);

    const newlyUploadedImages: UploadedProfileImage[] = [];

    try {
      const usernameAvailable = await isUsernameAvailable(
        normalizedUsername,
        userId,
      );

      if (usernameChanged) {
        const usernameAvailable = await isUsernameAvailable(
          normalizedUsername,
          userId,
        );

        if (!usernameAvailable) {
          setErrors((currentErrors) => ({
            ...currentErrors,
            username: PROFILE_COPY.EDIT.USERNAME_TAKEN,
          }));

          return;
        }
      }

      let avatarUpload: UploadedProfileImage | null = null;
      let coverUpload: UploadedProfileImage | null = null;

      if (form.avatarLocalUri) {
        avatarUpload = await uploadAvatarIfNeeded();

        if (avatarUpload) {
          newlyUploadedImages.push(avatarUpload);
        }
      }

      if (form.coverLocalUri) {
        coverUpload = await uploadCoverIfNeeded();

        if (coverUpload) {
          newlyUploadedImages.push(coverUpload);
        }
      }

      await updateProfile(userId, {
        full_name: form.fullName,
        username: normalizedUsername,
        bio: form.bio,
        location: form.location,
        website: normalizeWebsite(form.website),
        instagram: normalizeInstagramUsername(form.instagram) || null,

        avatar_url: form.removeAvatar
          ? null
          : (avatarUpload?.publicUrl ?? profile.avatar_url),

        avatar_path: form.removeAvatar
          ? null
          : (avatarUpload?.path ?? profile.avatar_path),

        cover_url: form.removeCover
          ? null
          : (coverUpload?.publicUrl ?? profile.cover_url),

        cover_path: form.removeCover
          ? null
          : (coverUpload?.path ?? profile.cover_path),
      });

      await cleanupPreviousImages({
        avatarUpload,
        coverUpload,
      });

      Alert.alert(
        PROFILE_COPY.EDIT.SAVE_SUCCESS_TITLE,
        PROFILE_COPY.EDIT.SAVE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () => {
              setAllowNavigation(true);

              requestAnimationFrame(() => {
                router.back();
              });
            },
          },
        ],
      );
    } catch (error) {
      await rollbackNewUploads(newlyUploadedImages);

      console.error("Gagal memperbarui Profile:", error);

      const submitFailure = getProfileSubmitError(error);

      if (submitFailure.field) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [submitFailure.field!]: submitFailure.message,
        }));
      } else {
        setSubmitError(submitFailure.message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    if (submitting) {
      return;
    }

    router.back();
  }

  function handleBackToProfile() {
    router.replace(ROUTES.TABS.PROFILE);
  }
  function handleRemoveAvatar() {
    if (submitting) {
      return;
    }

    Alert.alert(
      PROFILE_COPY.EDIT.REMOVE_AVATAR_TITLE,
      PROFILE_COPY.EDIT.REMOVE_AVATAR_MESSAGE,
      [
        {
          text: PROFILE_COPY.EDIT.REMOVE_CANCEL,
          style: "cancel",
        },
        {
          text: PROFILE_COPY.EDIT.REMOVE_CONFIRM,
          style: "destructive",
          onPress: () => {
            setForm((currentForm) => ({
              ...currentForm,
              avatarLocalUri: "",
              removeAvatar: true,
            }));
            setSubmitError(null);
          },
        },
      ],
    );
  }

  function handleRemoveCover() {
    if (submitting) {
      return;
    }

    Alert.alert(
      PROFILE_COPY.EDIT.REMOVE_COVER_TITLE,
      PROFILE_COPY.EDIT.REMOVE_COVER_MESSAGE,
      [
        {
          text: PROFILE_COPY.EDIT.REMOVE_CANCEL,
          style: "cancel",
        },
        {
          text: PROFILE_COPY.EDIT.REMOVE_CONFIRM,
          style: "destructive",
          onPress: () => {
            setForm((currentForm) => ({
              ...currentForm,
              coverLocalUri: "",
              removeCover: true,
            }));
            setSubmitError(null);
          },
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
        <ActivityIndicator
          size="small"
          color={MOTORCYCLE_SHOWCASE_COLORS.accent}
        />
      </Screen>
    );
  }

  if (loadFailed) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={PROFILE_COPY.EDIT.LOAD_FAILED_TITLE}
          description={PROFILE_COPY.EDIT.LOAD_FAILED_MESSAGE}
          action={
            <AppButton
              theme="dark"
              title={PROFILE_COPY.RETRY_BUTTON}
              onPress={() => {
                void loadProfile();
              }}
            />
          }
        />
      </Screen>
    );
  }

  if (!profile) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title="Profile Tidak Ditemukan"
          description="Data Profile akun ini belum tersedia."
          action={
            <AppButton
              theme="dark"
              variant="secondary"
              title={COMMON_COPY.BACK}
              onPress={handleBackToProfile}
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
          style={({ pressed }) => [
            styles.backButton,
            pressed ? styles.backButtonPressed : null,
          ]}
          disabled={submitting}
          onPress={handleCancel}
        >
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.eyebrow}>{PROFILE_COPY.EDIT.SCREEN_EYEBROW}</Text>

          <Text style={styles.title}>{PROFILE_COPY.EDIT.SCREEN_TITLE}</Text>

          <Text style={styles.subtitle}>
            {PROFILE_COPY.EDIT.SCREEN_SUBTITLE}
          </Text>
        </View>
      </View>

      <EditProfileForm
        values={form}
        errors={errors}
        submitting={submitting}
        submitError={submitError}
        hasChanges={hasChanges}
        onChange={updateField}
        onPickAvatar={handlePickAvatar}
        onPickCover={handlePickCover}
        onRemoveAvatar={handleRemoveAvatar}
        onRemoveCover={handleRemoveCover}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Screen>
  );
}
type ProfileSubmitError = {
  field?: keyof ProfileFormErrors;
  message: string;
};
function getProfileSubmitError(error: unknown): ProfileSubmitError {
  if (!(error instanceof Error)) {
    return {
      message: PROFILE_COPY.EDIT.SAVE_FAILED_MESSAGE,
    };
  }

  const message = error.message.toLowerCase();

  const isUsernameConflict =
    message.includes("duplicate key") ||
    message.includes("unique constraint") ||
    message.includes("profiles_username") ||
    message.includes("username_key") ||
    message.includes("profiles_username_unique_lower_idx");

  if (isUsernameConflict) {
    return {
      field: "username",
      message: PROFILE_COPY.EDIT.USERNAME_TAKEN,
    };
  }

  const isStoragePermissionError =
    message.includes("row-level security") ||
    message.includes("unauthorized") ||
    message.includes("permission denied") ||
    message.includes("not allowed");

  if (isStoragePermissionError) {
    return {
      message: "Foto tidak dapat diunggah karena izin Storage belum sesuai.",
    };
  }

  const isNetworkError =
    message.includes("network") ||
    message.includes("failed to fetch") ||
    message.includes("fetch failed") ||
    message.includes("timeout");

  if (isNetworkError) {
    return {
      message: "Koneksi bermasalah. Periksa internet Anda lalu coba kembali.",
    };
  }

  const isFileReadError =
    message.includes("file") &&
    (message.includes("read") ||
      message.includes("not found") ||
      message.includes("does not exist"));

  if (isFileReadError) {
    return {
      message: "File foto tidak dapat dibaca. Silakan pilih foto lain.",
    };
  }

  const isInvalidUrl =
    message.includes("invalid url") || message.includes("url is invalid");

  if (isInvalidUrl) {
    return {
      field: "website",
      message: "Masukkan alamat website yang valid.",
    };
  }

  return {
    message: PROFILE_COPY.EDIT.SAVE_FAILED_MESSAGE,
  };
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["2xl"],
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
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  backButtonPressed: {
    opacity: 0.76,
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

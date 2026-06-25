import { StyleSheet, Text, View } from "react-native";

import { AppButton, AppInput, FormSection } from "@/src/components/ui";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { ProfileImageEditor } from "@/src/features/profile/components/ProfileImageEditor";
import {
  getProfileAvatarPreview,
  getProfileCoverPreview,
  type ProfileFormErrors,
  type ProfileFormValues,
} from "@/src/features/profile/utils/profileForm";
import { fontFamily, radius, spacing } from "@/src/theme";
import { CircleAlert } from "lucide-react-native";

type EditProfileFormProps = {
  values: ProfileFormValues;
  errors: ProfileFormErrors;
  submitting: boolean;
  submitError?: string | null;
  hasChanges?: boolean;
  onChange: <FieldName extends keyof ProfileFormValues>(
    fieldName: FieldName,
    value: ProfileFormValues[FieldName],
  ) => void;
  onPickAvatar: () => void | Promise<void>;
  onPickCover: () => void | Promise<void>;
  onRemoveAvatar: () => void;
  onRemoveCover: () => void;
  onSubmit: () => void | Promise<void>;
  onCancel: () => void;
};

export function EditProfileForm({
  values,
  errors,
  submitting,
  submitError,
  hasChanges = true,
  onChange,
  onPickAvatar,
  onPickCover,
  onRemoveAvatar,
  onRemoveCover,
  onSubmit,
  onCancel,
}: EditProfileFormProps) {
  const avatarPreview = getProfileAvatarPreview(values);
  const coverPreview = getProfileCoverPreview(values);

  return (
    <View style={styles.container}>
      <FormSection
        variant="dark"
        title={PROFILE_COPY.EDIT.MEDIA_SECTION_TITLE}
        subtitle={PROFILE_COPY.EDIT.MEDIA_SECTION_SUBTITLE}
      >
        <ProfileImageEditor
          avatarUri={avatarPreview}
          coverUri={coverPreview}
          disabled={submitting}
          onPickAvatar={onPickAvatar}
          onPickCover={onPickCover}
          onRemoveAvatar={onRemoveAvatar}
          onRemoveCover={onRemoveCover}
        />
      </FormSection>

      <FormSection
        variant="dark"
        title={PROFILE_COPY.EDIT.IDENTITY_SECTION_TITLE}
        subtitle={PROFILE_COPY.EDIT.IDENTITY_SECTION_SUBTITLE}
      >
        <AppInput
          variant="dark"
          label={PROFILE_COPY.EDIT.FULL_NAME_LABEL}
          placeholder={PROFILE_COPY.EDIT.FULL_NAME_PLACEHOLDER}
          value={values.fullName}
          error={errors.fullName}
          editable={!submitting}
          autoCapitalize="words"
          maxLength={60}
          returnKeyType="next"
          onChangeText={(value) => onChange("fullName", value)}
        />

        <AppInput
          variant="dark"
          label={PROFILE_COPY.EDIT.USERNAME_LABEL}
          placeholder={PROFILE_COPY.EDIT.USERNAME_PLACEHOLDER}
          value={values.username}
          error={errors.username}
          editable={!submitting}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
          returnKeyType="next"
          onChangeText={(value) => onChange("username", value)}
        />

        <Text style={styles.helperText}>
          Gunakan huruf, angka, titik, atau garis bawah tanpa spasi.
        </Text>
      </FormSection>

      <FormSection
        variant="dark"
        title={PROFILE_COPY.EDIT.ABOUT_SECTION_TITLE}
        subtitle={PROFILE_COPY.EDIT.ABOUT_SECTION_SUBTITLE}
      >
        <AppInput
          variant="dark"
          label={PROFILE_COPY.EDIT.BIO_LABEL}
          placeholder={PROFILE_COPY.EDIT.BIO_PLACEHOLDER}
          value={values.bio}
          error={errors.bio}
          editable={!submitting}
          multiline
          maxLength={160}
          onChangeText={(value) => onChange("bio", value)}
        />

        <View style={styles.characterCounter}>
          <Text style={styles.characterCounterText}>
            {values.bio.length}/160
          </Text>
        </View>

        <AppInput
          variant="dark"
          label={PROFILE_COPY.EDIT.LOCATION_LABEL}
          placeholder={PROFILE_COPY.EDIT.LOCATION_PLACEHOLDER}
          value={values.location}
          error={errors.location}
          editable={!submitting}
          maxLength={80}
          returnKeyType="next"
          onChangeText={(value) => onChange("location", value)}
        />
      </FormSection>

      <FormSection
        variant="dark"
        title={PROFILE_COPY.EDIT.SOCIAL_SECTION_TITLE}
        subtitle={PROFILE_COPY.EDIT.SOCIAL_SECTION_SUBTITLE}
      >
        <AppInput
          variant="dark"
          label={PROFILE_COPY.EDIT.WEBSITE_LABEL}
          placeholder={PROFILE_COPY.EDIT.WEBSITE_PLACEHOLDER}
          value={values.website}
          error={errors.website}
          editable={!submitting}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          maxLength={200}
          returnKeyType="next"
          onChangeText={(value) => onChange("website", value)}
        />

        <AppInput
          variant="dark"
          label={PROFILE_COPY.EDIT.INSTAGRAM_LABEL}
          placeholder={PROFILE_COPY.EDIT.INSTAGRAM_PLACEHOLDER}
          value={values.instagram}
          error={errors.instagram}
          editable={!submitting}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={30}
          returnKeyType="done"
          onChangeText={(value) => onChange("instagram", value)}
          onSubmitEditing={() => {
            void onSubmit();
          }}
        />
      </FormSection>
      {submitError ? (
        <View style={styles.errorBanner}>
          <CircleAlert
            size={19}
            color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
          />

          <Text style={styles.errorBannerText}>{submitError}</Text>
        </View>
      ) : null}
      <View style={styles.actions}>
        <AppButton
          theme="dark"
          title={PROFILE_COPY.EDIT.SAVE_BUTTON}
          loading={submitting}
          disabled={submitting || !hasChanges}
          onPress={() => {
            void onSubmit();
          }}
        />

        <AppButton
          theme="dark"
          variant="secondary"
          title={PROFILE_COPY.EDIT.CANCEL_BUTTON}
          disabled={submitting}
          onPress={onCancel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  helperText: {
    marginTop: -spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 11,
    lineHeight: 17,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  characterCounter: {
    alignItems: "flex-end",
    marginTop: -spacing.sm,
  },
  characterCounterText: {
    fontFamily: fontFamily.body.medium,
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  actions: {
    gap: spacing.md,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.5)",
    backgroundColor: "rgba(239, 68, 68, 0.12)",
  },
  errorBannerText: {
    flex: 1,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
});

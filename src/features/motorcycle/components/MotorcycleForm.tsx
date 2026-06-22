import { StyleSheet, View } from "react-native";

import {
  AppButton,
  AppInput,
  FormSection,
  ImagePickerBox,
  SelectChipGroup,
} from "@/src/components/ui";
import { spacing } from "@/src/theme";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type {
  MotorcycleFormErrors,
  MotorcycleFormValues,
} from "@/src/features/motorcycle/utils/motorcycleForm";

type MotorcycleFormVariant = "default" | "dark";

type MotorcycleFormProps = {
  values: MotorcycleFormValues;
  errors: MotorcycleFormErrors;
  submitting: boolean;
  submitTitle: string;
  variant?: MotorcycleFormVariant;
  showStatusFields?: boolean;
  onChange: <FieldName extends keyof MotorcycleFormValues>(
    fieldName: FieldName,
    value: MotorcycleFormValues[FieldName],
  ) => void;
  onPickImage: () => void;
  onSubmit: () => void;
  onCancel?: () => void;
};

const MOTORCYCLE_STATUS_OPTIONS = [
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
] as const;

const MOTORCYCLE_VISIBILITY_OPTIONS = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
] as const;

export function MotorcycleForm({
  values,
  errors,
  submitting,
  submitTitle,
  variant = "default",
  showStatusFields = true,
  onChange,
  onPickImage,
  onSubmit,
  onCancel,
}: MotorcycleFormProps) {
  const isDark = variant === "dark";
  const displayImageUri = values.heroImageLocalUri || values.heroImageUrl;

  return (
    <>
      <FormSection
        variant={variant}
        title={MOTORCYCLE_COPY.IMAGE_SECTION_TITLE}
        description={MOTORCYCLE_COPY.IMAGE_SECTION_DESCRIPTION}
      >
        <ImagePickerBox
          variant={variant}
          title="Change motorcycle photo"
          description="Use a clean side view or hero shot for the best showcase result."
          imageUri={displayImageUri}
          onPress={onPickImage}
        />
      </FormSection>

      <FormSection
        variant={variant}
        title={MOTORCYCLE_COPY.BASIC_SECTION_TITLE}
        description={MOTORCYCLE_COPY.BASIC_SECTION_DESCRIPTION}
      >
        <AppInput
          variant={variant}
          label={MOTORCYCLE_COPY.FIELD_BRAND}
          value={values.brand}
          onChangeText={(value) => onChange("brand", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_BRAND}
          error={errors.brand}
        />

        <AppInput
          variant={variant}
          label={MOTORCYCLE_COPY.FIELD_MODEL}
          value={values.model}
          onChangeText={(value) => onChange("model", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_MODEL}
          error={errors.model}
        />

        <AppInput
          variant={variant}
          label={MOTORCYCLE_COPY.FIELD_VARIANT}
          value={values.variant}
          onChangeText={(value) => onChange("variant", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_VARIANT}
        />

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <AppInput
              variant={variant}
              label={MOTORCYCLE_COPY.FIELD_YEAR}
              value={values.year}
              onChangeText={(value) => onChange("year", value)}
              placeholder={MOTORCYCLE_COPY.PLACEHOLDER_YEAR}
              keyboardType="number-pad"
              error={errors.year}
            />
          </View>

          <View style={styles.rowItem}>
            <AppInput
              variant={variant}
              label={MOTORCYCLE_COPY.FIELD_ENGINE_CC}
              value={values.engineCc}
              onChangeText={(value) => onChange("engineCc", value)}
              placeholder={MOTORCYCLE_COPY.PLACEHOLDER_ENGINE_CC}
              keyboardType="number-pad"
              error={errors.engineCc}
            />
          </View>
        </View>
      </FormSection>

      <FormSection
        variant={variant}
        title={MOTORCYCLE_COPY.DETAIL_SECTION_TITLE}
        description={MOTORCYCLE_COPY.DETAIL_SECTION_DESCRIPTION}
      >
        <AppInput
          variant={variant}
          label={MOTORCYCLE_COPY.FIELD_NICKNAME}
          value={values.nickname}
          onChangeText={(value) => onChange("nickname", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_NICKNAME}
        />

        <AppInput
          variant={variant}
          label={MOTORCYCLE_COPY.FIELD_COLOR}
          value={values.color}
          onChangeText={(value) => onChange("color", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_COLOR}
        />

        <AppInput
          variant={variant}
          label={MOTORCYCLE_COPY.FIELD_MILEAGE}
          value={values.mileage}
          onChangeText={(value) => onChange("mileage", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_MILEAGE}
          keyboardType="number-pad"
          error={errors.mileage}
        />

        <AppInput
          variant={variant}
          label={MOTORCYCLE_COPY.FIELD_DESCRIPTION}
          value={values.description}
          onChangeText={(value) => onChange("description", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_DESCRIPTION}
          multiline
        />
      </FormSection>

      {showStatusFields ? (
        <FormSection
          variant={variant}
          title="Build Settings"
          description="Control the progress status and who can view this build."
        >
          <SelectChipGroup
            variant={variant}
            label="Status"
            options={MOTORCYCLE_STATUS_OPTIONS}
            value={values.status}
            onChange={(value) => onChange("status", value)}
          />

          <SelectChipGroup
            variant={variant}
            label="Visibility"
            options={MOTORCYCLE_VISIBILITY_OPTIONS}
            value={values.visibility}
            onChange={(value) => onChange("visibility", value)}
          />
        </FormSection>
      ) : null}

      <View style={styles.actions}>
        {onCancel ? (
          <View style={styles.secondaryAction}>
            <AppButton
              theme={isDark ? "dark" : "default"}
              variant="secondary"
              title="Cancel"
              onPress={onCancel}
              disabled={submitting}
            />
          </View>
        ) : null}

        <View style={onCancel ? styles.primaryAction : styles.fullAction}>
          <AppButton
            theme={isDark ? "dark" : "default"}
            title={submitTitle}
            loading={submitting}
            onPress={onSubmit}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  rowItem: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  secondaryAction: {
    flex: 1,
  },
  primaryAction: {
    flex: 1.4,
  },
  fullAction: {
    flex: 1,
  },
});

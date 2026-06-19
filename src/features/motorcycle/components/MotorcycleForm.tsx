import { StyleSheet } from "react-native";

import {
  AppButton,
  AppInput,
  FormSection,
  ImagePickerBox,
} from "@/src/components/ui";
import { spacing } from "@/src/theme";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type {
  MotorcycleFormErrors,
  MotorcycleFormValues,
} from "@/src/features/motorcycle/utils/motorcycleForm";

type MotorcycleFormProps = {
  values: MotorcycleFormValues;
  errors: MotorcycleFormErrors;
  submitting: boolean;
  submitTitle: string;
  onChange: <FieldName extends keyof MotorcycleFormValues>(
    fieldName: FieldName,
    value: MotorcycleFormValues[FieldName],
  ) => void;
  onPickImage: () => void;
  onSubmit: () => void;
};

export function MotorcycleForm({
  values,
  errors,
  submitting,
  submitTitle,
  onChange,
  onPickImage,
  onSubmit,
}: MotorcycleFormProps) {
  const displayImageUri = values.heroImageLocalUri || values.heroImageUrl;

  return (
    <>
      <FormSection
        title={MOTORCYCLE_COPY.IMAGE_SECTION_TITLE}
        description={MOTORCYCLE_COPY.IMAGE_SECTION_DESCRIPTION}
      >
        <ImagePickerBox
          label={MOTORCYCLE_COPY.FIELD_HERO_IMAGE}
          imageUri={displayImageUri}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_HERO_IMAGE}
          onPress={onPickImage}
        />
      </FormSection>

      <FormSection
        title={MOTORCYCLE_COPY.BASIC_SECTION_TITLE}
        description={MOTORCYCLE_COPY.BASIC_SECTION_DESCRIPTION}
      >
        <AppInput
          label={MOTORCYCLE_COPY.FIELD_BRAND}
          value={values.brand}
          onChangeText={(value) => onChange("brand", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_BRAND}
          error={errors.brand}
        />

        <AppInput
          label={MOTORCYCLE_COPY.FIELD_MODEL}
          value={values.model}
          onChangeText={(value) => onChange("model", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_MODEL}
          error={errors.model}
        />

        <AppInput
          label={MOTORCYCLE_COPY.FIELD_VARIANT}
          value={values.variant}
          onChangeText={(value) => onChange("variant", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_VARIANT}
        />

        <AppInput
          label={MOTORCYCLE_COPY.FIELD_YEAR}
          value={values.year}
          onChangeText={(value) => onChange("year", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_YEAR}
          keyboardType="number-pad"
          error={errors.year}
        />
      </FormSection>

      <FormSection
        title={MOTORCYCLE_COPY.DETAIL_SECTION_TITLE}
        description={MOTORCYCLE_COPY.DETAIL_SECTION_DESCRIPTION}
      >
        <AppInput
          label={MOTORCYCLE_COPY.FIELD_COLOR}
          value={values.color}
          onChangeText={(value) => onChange("color", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_COLOR}
        />

        <AppInput
          label={MOTORCYCLE_COPY.FIELD_ENGINE_CC}
          value={values.engineCc}
          onChangeText={(value) => onChange("engineCc", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_ENGINE_CC}
          keyboardType="number-pad"
          error={errors.engineCc}
        />

        <AppInput
          label={MOTORCYCLE_COPY.FIELD_NICKNAME}
          value={values.nickname}
          onChangeText={(value) => onChange("nickname", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_NICKNAME}
        />

        <AppInput
          label={MOTORCYCLE_COPY.FIELD_MILEAGE}
          value={values.mileage}
          onChangeText={(value) => onChange("mileage", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_MILEAGE}
          keyboardType="number-pad"
          error={errors.mileage}
        />

        <AppInput
          label={MOTORCYCLE_COPY.FIELD_DESCRIPTION}
          value={values.description}
          onChangeText={(value) => onChange("description", value)}
          placeholder={MOTORCYCLE_COPY.PLACEHOLDER_DESCRIPTION}
          multiline
        />
      </FormSection>

      <AppButton
        title={submitTitle}
        loading={submitting}
        onPress={onSubmit}
        style={styles.submit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  submit: {
    marginTop: spacing.sm,
  },
});

import { StyleSheet } from "react-native";

import {
  AppButton,
  AppInput,
  FormSection,
  ImagePickerBox,
  SelectChipGroup,
} from "@/src/components/ui";
import { spacing } from "@/src/theme";
import {
  PART_CATEGORIES,
  PART_COPY,
} from "@/src/features/part/constants/part.constants";
import type {
  PartFormErrors,
  PartFormValues,
} from "@/src/features/part/utils/partForm";

type PartFormProps = {
  values: PartFormValues;
  errors: PartFormErrors;
  submitting: boolean;
  submitTitle: string;
  onChange: <FieldName extends keyof PartFormValues>(
    fieldName: FieldName,
    value: PartFormValues[FieldName],
  ) => void;
  onPickImage: () => void;
  onSubmit: () => void;
};

export function PartForm({
  values,
  errors,
  submitting,
  submitTitle,
  onChange,
  onPickImage,
  onSubmit,
}: PartFormProps) {
  const displayImageUri = values.mainImageLocalUri || values.mainImageUrl;

  return (
    <>
      <FormSection
        title={PART_COPY.IMAGE_SECTION_TITLE}
        description={PART_COPY.IMAGE_SECTION_DESCRIPTION}
      >
        <ImagePickerBox
          label={PART_COPY.FIELD_MAIN_IMAGE}
          imageUri={displayImageUri}
          placeholder={PART_COPY.PLACEHOLDER_MAIN_IMAGE}
          onPress={onPickImage}
        />
      </FormSection>

      <FormSection
        title={PART_COPY.BASIC_SECTION_TITLE}
        description={PART_COPY.BASIC_SECTION_DESCRIPTION}
      >
        <SelectChipGroup
          label={PART_COPY.FIELD_CATEGORY}
          value={values.category}
          options={PART_CATEGORIES}
          onChange={(value) => onChange("category", value)}
          error={errors.category}
        />

        <AppInput
          label={PART_COPY.FIELD_BRAND}
          value={values.brand}
          onChangeText={(value) => onChange("brand", value)}
          placeholder={PART_COPY.PLACEHOLDER_BRAND}
        />

        <AppInput
          label={PART_COPY.FIELD_PRODUCT_NAME}
          value={values.productName}
          onChangeText={(value) => onChange("productName", value)}
          placeholder={PART_COPY.PLACEHOLDER_PRODUCT_NAME}
        />
      </FormSection>

      <FormSection
        title={PART_COPY.DETAIL_SECTION_TITLE}
        description={PART_COPY.DETAIL_SECTION_DESCRIPTION}
      >
        <AppInput
          label={PART_COPY.FIELD_PRICE}
          value={values.price}
          onChangeText={(value) => onChange("price", value)}
          placeholder={PART_COPY.PLACEHOLDER_PRICE}
          keyboardType="number-pad"
          error={errors.price}
        />

        <AppInput
          label={PART_COPY.FIELD_PURCHASE_DATE}
          value={values.purchaseDate}
          onChangeText={(value) => onChange("purchaseDate", value)}
          placeholder={PART_COPY.PLACEHOLDER_PURCHASE_DATE}
          error={errors.purchaseDate}
        />

        <AppInput
          label={PART_COPY.FIELD_INSTALL_DATE}
          value={values.installDate}
          onChangeText={(value) => onChange("installDate", value)}
          placeholder={PART_COPY.PLACEHOLDER_INSTALL_DATE}
          error={errors.installDate}
        />

        <AppInput
          label={PART_COPY.FIELD_WORKSHOP}
          value={values.workshop}
          onChangeText={(value) => onChange("workshop", value)}
          placeholder={PART_COPY.PLACEHOLDER_WORKSHOP}
        />

        <AppInput
          label={PART_COPY.FIELD_LOCATION}
          value={values.location}
          onChangeText={(value) => onChange("location", value)}
          placeholder={PART_COPY.PLACEHOLDER_LOCATION}
        />

        <AppInput
          label={PART_COPY.FIELD_RATING}
          value={values.rating}
          onChangeText={(value) => onChange("rating", value)}
          placeholder={PART_COPY.PLACEHOLDER_RATING}
          keyboardType="number-pad"
          error={errors.rating}
        />

        <AppInput
          label={PART_COPY.FIELD_DESCRIPTION}
          value={values.description}
          onChangeText={(value) => onChange("description", value)}
          placeholder={PART_COPY.PLACEHOLDER_DESCRIPTION}
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

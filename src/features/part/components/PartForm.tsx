import { StyleSheet, Text, View } from "react-native";

import {
  AppButton,
  AppInput,
  FormSection,
  ImagePickerBox,
  SelectChipGroup,
  SwitchRow,
} from "@/src/components/ui";
import { RatingSelect } from "@/src/features/part/components/RatingSelect";
import {
  PART_CATEGORIES,
  PART_COPY,
} from "@/src/features/part/constants/part.constants";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type {
  PartFormErrors,
  PartFormValues,
} from "@/src/features/part/utils/partForm";
import { colors, fontFamily, spacing } from "@/src/theme";
import { formatDateInput, onlyNumbers } from "@/src/utils/input";

type PartFormVariant = "default" | "dark";

type PartFormProps = {
  values: PartFormValues;
  errors: PartFormErrors;
  submitting: boolean;
  submitTitle: string;
  variant?: PartFormVariant;
  onChange: <FieldName extends keyof PartFormValues>(
    fieldName: FieldName,
    value: PartFormValues[FieldName],
  ) => void;
  onPickImage: () => void;
  onSubmit: () => void;
  onCancel?: () => void;
};

export function PartForm({
  values,
  errors,
  submitting,
  submitTitle,
  variant = "default",
  onChange,
  onPickImage,
  onSubmit,
  onCancel,
}: PartFormProps) {
  const isDark = variant === "dark";
  const displayImageUri = values.mainImageLocalUri || values.mainImageUrl;

  return (
    <>
      <FormSection
        variant={variant}
        title={PART_COPY.IMAGE_SECTION_TITLE}
        description={PART_COPY.IMAGE_SECTION_DESCRIPTION}
      >
        <ImagePickerBox
          variant={variant}
          label={PART_COPY.FIELD_MAIN_IMAGE}
          imageUri={displayImageUri}
          placeholder={PART_COPY.PLACEHOLDER_MAIN_IMAGE}
          onPress={onPickImage}
        />
      </FormSection>

      <FormSection
        variant={variant}
        title={PART_COPY.BASIC_SECTION_TITLE}
        description={PART_COPY.BASIC_SECTION_DESCRIPTION}
      >
        <SelectChipGroup
          variant={variant}
          label={PART_COPY.FIELD_CATEGORY}
          value={values.category}
          options={PART_CATEGORIES}
          onChange={(value) => onChange("category", value)}
          error={errors.category}
        />

        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_BRAND}
          value={values.brand}
          onChangeText={(value) => onChange("brand", value)}
          placeholder={PART_COPY.PLACEHOLDER_BRAND}
        />

        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_PRODUCT_NAME}
          value={values.productName}
          onChangeText={(value) => onChange("productName", value)}
          placeholder={PART_COPY.PLACEHOLDER_PRODUCT_NAME}
        />
      </FormSection>

      <FormSection
        variant={variant}
        title={PART_COPY.DETAIL_SECTION_TITLE}
        description={PART_COPY.DETAIL_SECTION_DESCRIPTION}
      >
        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_PRICE}
          value={values.price}
          onChangeText={(value) => onChange("price", onlyNumbers(value))}
          placeholder={PART_COPY.PLACEHOLDER_PRICE}
          keyboardType="number-pad"
          error={errors.price}
        />

        <Text
          style={[styles.helperText, isDark ? styles.helperTextDark : null]}
        >
          {PART_COPY.PRICE_HELPER}
        </Text>

        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_PURCHASE_DATE}
          value={values.purchaseDate}
          onChangeText={(value) =>
            onChange("purchaseDate", formatDateInput(value))
          }
          placeholder={PART_COPY.PLACEHOLDER_PURCHASE_DATE}
          keyboardType="number-pad"
          error={errors.purchaseDate}
        />

        <Text
          style={[styles.helperText, isDark ? styles.helperTextDark : null]}
        >
          {PART_COPY.DATE_HELPER}
        </Text>

        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_INSTALL_DATE}
          value={values.installDate}
          onChangeText={(value) =>
            onChange("installDate", formatDateInput(value))
          }
          placeholder={PART_COPY.PLACEHOLDER_INSTALL_DATE}
          keyboardType="number-pad"
          error={errors.installDate}
        />

        <Text
          style={[styles.helperText, isDark ? styles.helperTextDark : null]}
        >
          {PART_COPY.DATE_HELPER}
        </Text>

        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_WORKSHOP}
          value={values.workshop}
          onChangeText={(value) => onChange("workshop", value)}
          placeholder={PART_COPY.PLACEHOLDER_WORKSHOP}
        />

        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_LOCATION}
          value={values.location}
          onChangeText={(value) => onChange("location", value)}
          placeholder={PART_COPY.PLACEHOLDER_LOCATION}
        />

        <RatingSelect
          variant={variant}
          label={PART_COPY.FIELD_RATING}
          value={values.rating}
          error={errors.rating}
          disabled={submitting}
          onChange={(value) => onChange("rating", value)}
        />

        <SwitchRow
          variant={variant}
          label="Tampilkan di Public Setup"
          description="Rider lain dapat melihat part ini saat membuka build Anda."
          value={values.isPublic}
          disabled={submitting}
          onValueChange={(value) => onChange("isPublic", value)}
        />

        <AppInput
          variant={variant}
          label={PART_COPY.FIELD_DESCRIPTION}
          value={values.description}
          onChangeText={(value) => onChange("description", value)}
          placeholder={PART_COPY.PLACEHOLDER_DESCRIPTION}
          multiline
        />
      </FormSection>

      <View style={styles.actions}>
        {onCancel ? (
          <View style={styles.cancelAction}>
            <AppButton
              title="Cancel"
              variant="secondary"
              disabled={submitting}
              onPress={onCancel}
            />
          </View>
        ) : null}

        <View style={onCancel ? styles.submitAction : styles.fullAction}>
          <AppButton
            title={submitTitle}
            loading={submitting}
            disabled={submitting}
            onPress={onSubmit}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  fullAction: {
    flex: 1,
  },
  helperText: {
    marginTop: -spacing.sm,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted,
  },
  helperTextDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
});

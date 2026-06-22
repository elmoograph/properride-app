import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import { isValidOptionalNumber } from "@/src/utils/number";

export type MotorcycleFormValues = {
  brand: string;
  model: string;
  variant: string;
  year: string;
  color: string;
  engineCc: string;
  nickname: string;
  mileage: string;
  description: string;
  heroImageUrl: string;
  heroImageLocalUri: string;
  status: string;
  visibility: string;
};

export type MotorcycleFormErrors = Partial<
  Record<keyof MotorcycleFormValues, string>
>;

export const INITIAL_MOTORCYCLE_FORM: MotorcycleFormValues = {
  brand: "",
  model: "",
  variant: "",
  year: "",
  color: "",
  engineCc: "",
  nickname: "",
  mileage: "",
  description: "",
  heroImageUrl: "",
  heroImageLocalUri: "",
  status: "in_progress",
  visibility: "public",
};

export function mapMotorcycleToForm(
  motorcycle: Motorcycle,
): MotorcycleFormValues {
  return {
    brand: motorcycle.brand ?? "",
    model: motorcycle.model ?? "",
    variant: motorcycle.variant ?? "",
    year: motorcycle.year ? String(motorcycle.year) : "",
    color: motorcycle.color ?? "",
    engineCc: motorcycle.engine_cc ? String(motorcycle.engine_cc) : "",
    nickname: motorcycle.nickname ?? "",
    mileage:
      motorcycle.mileage !== null && motorcycle.mileage !== undefined
        ? String(motorcycle.mileage)
        : "",
    description: motorcycle.description ?? "",
    heroImageUrl: motorcycle.hero_image_url ?? "",
    heroImageLocalUri: "",
    status: motorcycle.status || "in_progress",
    visibility: motorcycle.visibility || "public",
  };
}

export function validateMotorcycleForm(
  form: MotorcycleFormValues,
): MotorcycleFormErrors {
  const errors: MotorcycleFormErrors = {};

  if (!form.brand.trim()) {
    errors.brand = MOTORCYCLE_COPY.VALIDATION_BRAND_REQUIRED;
  }

  if (!form.model.trim()) {
    errors.model = MOTORCYCLE_COPY.VALIDATION_MODEL_REQUIRED;
  }

  if (!isValidOptionalNumber(form.year)) {
    errors.year = MOTORCYCLE_COPY.VALIDATION_YEAR_INVALID;
  }

  if (!isValidOptionalNumber(form.engineCc)) {
    errors.engineCc = MOTORCYCLE_COPY.VALIDATION_ENGINE_CC_INVALID;
  }

  if (!isValidOptionalNumber(form.mileage)) {
    errors.mileage = MOTORCYCLE_COPY.VALIDATION_MILEAGE_INVALID;
  }

  return errors;
}

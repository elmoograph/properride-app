import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
export type MotorcycleImageFormValues = {
  imageLocalUri: string;
  caption: string;
};

export type MotorcycleImageFormErrors = Partial<
  Record<keyof MotorcycleImageFormValues, string>
>;

export const INITIAL_MOTORCYCLE_IMAGE_FORM: MotorcycleImageFormValues = {
  imageLocalUri: "",
  caption: "",
};

export function validateMotorcycleImageForm(
  values: MotorcycleImageFormValues,
): MotorcycleImageFormErrors {
  const errors: MotorcycleImageFormErrors = {};

  if (!values.imageLocalUri) {
    errors.imageLocalUri = MOTORCYCLE_IMAGE_COPY.PHOTO_REQUIRED;
  }

  return errors;
}

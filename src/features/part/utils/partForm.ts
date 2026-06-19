import {
  PART_COPY,
  PART_CATEGORIES,
} from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";
import { isValidOptionalDate } from "@/src/utils/date";
import { isValidOptionalNumber, parseOptionalNumber } from "@/src/utils/number";

export type PartFormValues = {
  category: string;
  brand: string;
  productName: string;
  price: string;
  purchaseDate: string;
  installDate: string;
  workshop: string;
  location: string;
  rating: string;
  description: string;
  mainImageUrl: string;
  mainImageLocalUri: string;
};

export type PartFormErrors = Partial<Record<keyof PartFormValues, string>>;

export const INITIAL_PART_FORM: PartFormValues = {
  category: PART_CATEGORIES[0],
  brand: "",
  productName: "",
  price: "",
  purchaseDate: "",
  installDate: "",
  workshop: "",
  location: "",
  rating: "",
  description: "",
  mainImageUrl: "",
  mainImageLocalUri: "",
};

export function mapPartToForm(part: Part): PartFormValues {
  return {
    category: part.category || PART_CATEGORIES[0],
    brand: part.brand || part.custom_brand || "",
    productName: part.product_name || part.custom_product_name || "",
    price:
      part.price !== null && part.price !== undefined ? String(part.price) : "",
    purchaseDate: part.purchase_date || "",
    installDate: part.install_date || "",
    workshop: part.workshop || "",
    location: part.location || "",
    rating:
      part.rating !== null && part.rating !== undefined
        ? String(part.rating)
        : "",
    description: part.description || "",
    mainImageUrl: part.main_image_url || "",
    mainImageLocalUri: "",
  };
}

export function validatePartForm(form: PartFormValues): PartFormErrors {
  const errors: PartFormErrors = {};

  if (!form.category.trim()) {
    errors.category = PART_COPY.VALIDATION_CATEGORY_REQUIRED;
  }

  if (!isValidOptionalNumber(form.price)) {
    errors.price = PART_COPY.VALIDATION_PRICE_INVALID;
  }

  if (!isValidOptionalDate(form.purchaseDate)) {
    errors.purchaseDate = PART_COPY.VALIDATION_DATE_INVALID;
  }

  if (!isValidOptionalDate(form.installDate)) {
    errors.installDate = PART_COPY.VALIDATION_DATE_INVALID;
  }

  if (form.rating.trim()) {
    const rating = parseOptionalNumber(form.rating);

    if (!rating || rating < 1 || rating > 5) {
      errors.rating = PART_COPY.VALIDATION_RATING_INVALID;
    }
  }

  return errors;
}

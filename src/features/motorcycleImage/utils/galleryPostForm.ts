import { GALLERY_UPLOAD_LIMITS } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import type {
  GalleryVisibility,
  PickedGalleryMedia,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";

export type GalleryPostFormValues = {
  media: PickedGalleryMedia[];
  caption: string;
  visibility: GalleryVisibility;
};

export type GalleryPostFormErrors = {
  media?: string;
  caption?: string;
};

export const INITIAL_GALLERY_POST_FORM: GalleryPostFormValues = {
  media: [],
  caption: "",
  visibility: "public",
};

export function validateGalleryPostForm(
  values: GalleryPostFormValues,
): GalleryPostFormErrors {
  const errors: GalleryPostFormErrors = {};

  if (values.media.length === 0) {
    errors.media = "Pilih minimal satu foto atau video.";
  }

  if (values.media.length > GALLERY_UPLOAD_LIMITS.MAX_MEDIA_PER_POST) {
    errors.media = `Maksimal ${GALLERY_UPLOAD_LIMITS.MAX_MEDIA_PER_POST} media dalam satu post.`;
  }

  return errors;
}

export function appendGalleryMedia(
  currentMedia: PickedGalleryMedia[],
  selectedMedia: PickedGalleryMedia[],
): PickedGalleryMedia[] {
  const remainingSlots =
    GALLERY_UPLOAD_LIMITS.MAX_MEDIA_PER_POST - currentMedia.length;

  if (remainingSlots <= 0) {
    return currentMedia;
  }

  return [...currentMedia, ...selectedMedia.slice(0, remainingSlots)];
}

export function removeGalleryMedia(
  currentMedia: PickedGalleryMedia[],
  mediaId: string,
): PickedGalleryMedia[] {
  return currentMedia.filter((media) => media.id !== mediaId);
}

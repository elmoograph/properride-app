import * as ImagePicker from "expo-image-picker";

import { GALLERY_UPLOAD_LIMITS } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import type {
  GalleryMediaType,
  PickedGalleryMedia,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";

function createLocalMediaId(index: number): string {
  return `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 10)}`;
}

function resolveMediaType(
  asset: ImagePicker.ImagePickerAsset,
): GalleryMediaType | null {
  if (asset.type === "image") {
    return "image";
  }

  if (asset.type === "video") {
    return "video";
  }

  return null;
}

function validateVideoAsset(asset: ImagePicker.ImagePickerAsset): void {
  const maximumDurationMs =
    GALLERY_UPLOAD_LIMITS.MAX_VIDEO_DURATION_SECONDS * 1000;

  if (
    typeof asset.duration === "number" &&
    asset.duration > maximumDurationMs
  ) {
    throw new Error(
      `Durasi video maksimal ${GALLERY_UPLOAD_LIMITS.MAX_VIDEO_DURATION_SECONDS} detik.`,
    );
  }

  const maximumFileSizeBytes =
    GALLERY_UPLOAD_LIMITS.MAX_VIDEO_SIZE_MB * 1024 * 1024;

  if (
    typeof asset.fileSize === "number" &&
    asset.fileSize > maximumFileSizeBytes
  ) {
    throw new Error(
      `Ukuran video maksimal ${GALLERY_UPLOAD_LIMITS.MAX_VIDEO_SIZE_MB} MB.`,
    );
  }
}

export async function pickGalleryMedia(): Promise<PickedGalleryMedia[]> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error(
      "Izin akses galeri diperlukan untuk memilih foto atau video.",
    );
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images", "videos"],
    allowsMultipleSelection: true,
    selectionLimit: GALLERY_UPLOAD_LIMITS.MAX_MEDIA_PER_POST,
    allowsEditing: false,
    orderedSelection: true,
    quality: 1,
  });

  if (result.canceled || !result.assets) {
    return [];
  }

  const selectedMedia: PickedGalleryMedia[] = [];

  result.assets.forEach((asset, index) => {
    const mediaType = resolveMediaType(asset);

    if (!mediaType) {
      return;
    }

    if (mediaType === "video") {
      validateVideoAsset(asset);
    }

    selectedMedia.push({
      id: createLocalMediaId(index),
      uri: asset.uri,
      mediaType,

      width: asset.width || null,
      height: asset.height || null,
      durationMs: asset.duration ?? null,

      fileName: asset.fileName ?? null,
      fileSize: asset.fileSize ?? null,
      mimeType: asset.mimeType ?? null,
    });
  });

  if (selectedMedia.length === 0) {
    throw new Error(
      "Media yang dipilih tidak didukung. Pilih foto atau video.",
    );
  }

  return selectedMedia;
}

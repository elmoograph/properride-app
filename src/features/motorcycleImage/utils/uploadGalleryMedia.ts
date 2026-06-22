import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import type {
  GalleryMediaType,
  PickedGalleryMedia,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import { supabase } from "@/src/lib/supabase";

type UploadGalleryMediaParams = {
  userId: string;
  media: PickedGalleryMedia;
};

export type UploadedGalleryMedia = {
  localId: string;

  mediaType: GalleryMediaType;

  path: string;
  publicUrl: string;

  width: number | null;
  height: number | null;
  durationMs: number | null;
};

function sanitizeExtension(extension: string): string {
  return extension
    .toLowerCase()
    .split("?")[0]
    .replace(/[^a-z0-9]/g, "");
}

function getExtensionFromFileName(fileName: string | null): string | null {
  if (!fileName || !fileName.includes(".")) {
    return null;
  }

  const extension = fileName.split(".").pop();

  if (!extension) {
    return null;
  }

  const sanitizedExtension = sanitizeExtension(extension);

  return sanitizedExtension || null;
}

function getExtensionFromMimeType(mimeType: string | null): string | null {
  if (!mimeType || !mimeType.includes("/")) {
    return null;
  }

  const mimeExtension = mimeType.split("/")[1];

  if (!mimeExtension) {
    return null;
  }

  const normalizedExtension = sanitizeExtension(mimeExtension);

  if (normalizedExtension === "jpeg") {
    return "jpg";
  }

  if (normalizedExtension === "quicktime") {
    return "mov";
  }

  return normalizedExtension || null;
}

function getExtensionFromUri(uri: string): string | null {
  const cleanUri = uri.split("?")[0];

  if (!cleanUri.includes(".")) {
    return null;
  }

  const extension = cleanUri.split(".").pop();

  if (!extension) {
    return null;
  }

  const sanitizedExtension = sanitizeExtension(extension);

  return sanitizedExtension || null;
}

function resolveFileExtension(media: PickedGalleryMedia): string {
  const extensionFromFileName = getExtensionFromFileName(media.fileName);

  if (extensionFromFileName) {
    return extensionFromFileName;
  }

  const extensionFromMimeType = getExtensionFromMimeType(media.mimeType);

  if (extensionFromMimeType) {
    return extensionFromMimeType;
  }

  const extensionFromUri = getExtensionFromUri(media.uri);

  if (extensionFromUri) {
    return extensionFromUri;
  }

  return media.mediaType === "video" ? "mp4" : "jpg";
}

function resolveContentType(
  mediaType: GalleryMediaType,
  extension: string,
  mimeType: string | null,
): string {
  if (mimeType) {
    return mimeType;
  }

  if (mediaType === "image") {
    if (extension === "jpg" || extension === "jpeg") {
      return "image/jpeg";
    }

    if (extension === "png") {
      return "image/png";
    }

    if (extension === "webp") {
      return "image/webp";
    }

    if (extension === "heic") {
      return "image/heic";
    }

    return `image/${extension}`;
  }

  if (extension === "mov") {
    return "video/quicktime";
  }

  if (extension === "m4v") {
    return "video/x-m4v";
  }

  if (extension === "webm") {
    return "video/webm";
  }

  return "video/mp4";
}

function createGalleryMediaPath(params: {
  userId: string;
  mediaType: GalleryMediaType;
  extension: string;
}): string {
  const timestamp = Date.now();
  const randomValue = Math.random().toString(36).slice(2, 10);

  const folder =
    params.mediaType === "video"
      ? STORAGE_FOLDERS.MOTORCYCLE_GALLERY_VIDEOS
      : STORAGE_FOLDERS.MOTORCYCLE_GALLERY_IMAGES;

  return [
    folder,
    params.userId,
    `${timestamp}-${randomValue}.${params.extension}`,
  ].join("/");
}

export async function uploadGalleryMedia({
  userId,
  media,
}: UploadGalleryMediaParams): Promise<UploadedGalleryMedia> {
  const extension = resolveFileExtension(media);

  const contentType = resolveContentType(
    media.mediaType,
    extension,
    media.mimeType,
  );

  const filePath = createGalleryMediaPath({
    userId,
    mediaType: media.mediaType,
    extension,
  });

  const base64 = await FileSystem.readAsStringAsync(media.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKETS.MOTORCYCLE_IMAGES)
    .upload(filePath, decode(base64), {
      contentType,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKETS.MOTORCYCLE_IMAGES)
    .getPublicUrl(filePath);

  return {
    localId: media.id,

    mediaType: media.mediaType,

    path: filePath,
    publicUrl: data.publicUrl,

    width: media.width,
    height: media.height,
    durationMs: media.durationMs,
  };
}

export async function uploadGalleryMediaSequentially(params: {
  userId: string;
  media: PickedGalleryMedia[];
  onProgress?: (completed: number, total: number) => void;
}): Promise<UploadedGalleryMedia[]> {
  const uploadedMedia: UploadedGalleryMedia[] = [];

  for (const selectedMedia of params.media) {
    const uploadedItem = await uploadGalleryMedia({
      userId: params.userId,
      media: selectedMedia,
    });

    uploadedMedia.push(uploadedItem);

    params.onProgress?.(uploadedMedia.length, params.media.length);
  }

  return uploadedMedia;
}

export async function deleteUploadedGalleryMedia(
  paths: string[],
): Promise<void> {
  const uniquePaths = [...new Set(paths.filter(Boolean))];

  if (uniquePaths.length === 0) {
    return;
  }

  const { error } = await supabase.storage
    .from(STORAGE_BUCKETS.MOTORCYCLE_IMAGES)
    .remove(uniquePaths);

  if (error) {
    throw new Error(error.message);
  }
}

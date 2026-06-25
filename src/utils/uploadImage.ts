import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

import { supabase } from "@/src/lib/supabase";

type UploadImageParams = {
  bucket: string;
  folder: string;
  userId: string;
  uri: string;
};

type UploadImageResult = {
  path: string;
  publicUrl: string;
};

function getFileExtension(uri: string): string {
  const uriWithoutQuery = uri.split("?")[0];
  const extension = uriWithoutQuery.split(".").pop()?.toLowerCase();

  if (!extension) {
    return "jpg";
  }

  const supportedExtensions = ["jpg", "jpeg", "png", "webp"];

  return supportedExtensions.includes(extension) ? extension : "jpg";
}

function getImageContentType(extension: string): string {
  switch (extension) {
    case "png":
      return "image/png";

    case "webp":
      return "image/webp";

    case "jpeg":
    case "jpg":
    default:
      return "image/jpeg";
  }
}

function createImagePath(params: {
  folder: string;
  userId: string;
  extension: string;
}) {
  const timestamp = Date.now();
  const randomValue = Math.random().toString(36).slice(2);

  return `${params.folder}/${params.userId}/${timestamp}-${randomValue}.${params.extension}`;
}

export async function uploadImage({
  bucket,
  folder,
  userId,
  uri,
}: UploadImageParams): Promise<UploadImageResult> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const extension = getFileExtension(uri);
  const filePath = createImagePath({
    folder,
    userId,
    extension,
  });

  const contentType = getImageContentType(extension);

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, decode(base64), {
      contentType,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return {
    path: filePath,
    publicUrl: data.publicUrl,
  };
}

export async function deleteUploadedImage(params: {
  bucket: string;
  path: string;
}): Promise<void> {
  const { error } = await supabase.storage
    .from(params.bucket)
    .remove([params.path]);

  if (error) {
    throw new Error(error.message);
  }
}

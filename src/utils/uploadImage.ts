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
  const extension = uri.split(".").pop();

  if (!extension) {
    return "jpg";
  }

  return extension.toLowerCase();
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

  const contentType = `image/${extension === "jpg" ? "jpeg" : extension}`;

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

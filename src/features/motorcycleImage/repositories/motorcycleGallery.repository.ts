import { supabase } from "@/src/lib/supabase";
import {
  MOTORCYCLE_GALLERY_MEDIA_TABLE,
  MOTORCYCLE_GALLERY_POST_TABLE,
} from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import type {
  CreateMotorcycleGalleryMediaInput,
  CreateMotorcycleGalleryPostInput,
  GalleryPostWithMediaRow,
  MotorcycleGalleryMedia,
  MotorcycleGalleryPost,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";

type CreateGalleryMediaWithoutPostId = Omit<
  CreateMotorcycleGalleryMediaInput,
  "post_id"
>;

type CreateGalleryPostWithMediaInput = {
  post: CreateMotorcycleGalleryPostInput;
  media: CreateGalleryMediaWithoutPostId[];
};

function normalizeGalleryPost(
  row: GalleryPostWithMediaRow,
): MotorcycleGalleryPost {
  return {
    ...row,
    media: [...(row.media ?? [])].sort(
      (firstMedia, secondMedia) =>
        firstMedia.sort_order - secondMedia.sort_order,
    ),
  };
}

/**
 * Mengambil seluruh Gallery Post milik satu motor.
 *
 * RLS Supabase akan otomatis:
 * - menampilkan post public kepada pengguna lain;
 * - menampilkan post public dan private kepada pemilik.
 */
export async function getMotorcycleGalleryPosts(
  motorcycleId: string,
): Promise<MotorcycleGalleryPost[]> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_GALLERY_POST_TABLE)
    .select(
      `
      *,
      media:${MOTORCYCLE_GALLERY_MEDIA_TABLE} (*)
    `,
    )
    .eq("motorcycle_id", motorcycleId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as GalleryPostWithMediaRow[];

  return (data ?? []).map(normalizeGalleryPost);
}

/**
 * Mengambil satu Gallery Post beserta seluruh medianya.
 */
export async function getMotorcycleGalleryPostById(
  postId: string,
): Promise<MotorcycleGalleryPost | null> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_GALLERY_POST_TABLE)
    .select(
      `
      *,
      media:${MOTORCYCLE_GALLERY_MEDIA_TABLE} (*)
    `,
    )
    .eq("id", postId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return data ? normalizeGalleryPost(data) : null;
}

/**
 * Membuat Gallery Post kosong.
 *
 * Media dapat ditambahkan sesudah post dibuat.
 */
export async function createMotorcycleGalleryPost(
  input: CreateMotorcycleGalleryPostInput,
): Promise<MotorcycleGalleryPost> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_GALLERY_POST_TABLE)
    .insert({
      motorcycle_id: input.motorcycle_id,
      user_id: input.user_id,
      caption: input.caption?.trim() || null,
      visibility: input.visibility ?? "public",
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    media: [],
  } as MotorcycleGalleryPost;
}

/**
 * Menambahkan satu media ke Gallery Post.
 */
export async function createMotorcycleGalleryMedia(
  input: CreateMotorcycleGalleryMediaInput,
): Promise<MotorcycleGalleryMedia> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_GALLERY_MEDIA_TABLE)
    .insert({
      post_id: input.post_id,
      media_type: input.media_type,
      media_url: input.media_url,
      media_path: input.media_path,

      thumbnail_url: input.thumbnail_url ?? null,
      thumbnail_path: input.thumbnail_path ?? null,

      width: input.width ?? null,
      height: input.height ?? null,
      duration_ms: input.duration_ms ?? null,

      sort_order: input.sort_order,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as MotorcycleGalleryMedia;
}

/**
 * Menambahkan beberapa media sekaligus ke satu Gallery Post.
 */
export async function createMotorcycleGalleryMediaBatch(
  postId: string,
  media: CreateGalleryMediaWithoutPostId[],
): Promise<MotorcycleGalleryMedia[]> {
  if (media.length === 0) {
    return [];
  }

  const payload = media.map((item, index) => ({
    post_id: postId,
    media_type: item.media_type,
    media_url: item.media_url,
    media_path: item.media_path,

    thumbnail_url: item.thumbnail_url ?? null,
    thumbnail_path: item.thumbnail_path ?? null,

    width: item.width ?? null,
    height: item.height ?? null,
    duration_ms: item.duration_ms ?? null,

    sort_order: item.sort_order ?? index,
  }));

  const { data, error } = await supabase
    .from(MOTORCYCLE_GALLERY_MEDIA_TABLE)
    .insert(payload)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as MotorcycleGalleryMedia[]).sort(
    (firstMedia, secondMedia) => firstMedia.sort_order - secondMedia.sort_order,
  );
}

/**
 * Membuat satu Gallery Post beserta seluruh medianya.
 *
 * Jika penyimpanan media gagal, post yang baru dibuat akan dihapus
 * agar tidak meninggalkan post kosong di database.
 */
export async function createMotorcycleGalleryPostWithMedia({
  post,
  media,
}: CreateGalleryPostWithMediaInput): Promise<MotorcycleGalleryPost> {
  if (media.length === 0) {
    throw new Error("Pilih minimal satu foto atau video untuk Gallery Post.");
  }

  const createdPost = await createMotorcycleGalleryPost(post);

  try {
    const createdMedia = await createMotorcycleGalleryMediaBatch(
      createdPost.id,
      media,
    );

    return {
      ...createdPost,
      media: createdMedia,
    };
  } catch (error) {
    /*
     * Menghapus post kosong apabila insert media gagal.
     * Media yang sudah sempat tersimpan juga akan ikut terhapus
     * karena foreign key menggunakan ON DELETE CASCADE.
     */
    try {
      await deleteMotorcycleGalleryPost(createdPost.id);
    } catch (cleanupError) {
      console.warn(
        "Gagal membersihkan Gallery Post setelah media gagal disimpan:",
        cleanupError,
      );
    }

    throw error;
  }
}

/**
 * Memperbarui caption atau visibility Gallery Post.
 */
// export async function updateMotorcycleGalleryPost(
//   postId: string,
//   input: UpdateMotorcycleGalleryPostInput,
// ): Promise<MotorcycleGalleryPost> {
//   const updatePayload: UpdateMotorcycleGalleryPostInput = {};

//   if (input.caption !== undefined) {
//     updatePayload.caption = input.caption?.trim() || null;
//   }

//   if (input.visibility !== undefined) {
//     updatePayload.visibility = input.visibility;
//   }

//   const { data, error } = await supabase
//     .from(MOTORCYCLE_GALLERY_POST_TABLE)
//     .update(updatePayload)
//     .eq("id", postId)
//     .select(
//       `
//       *,
//       media:${MOTORCYCLE_GALLERY_MEDIA_TABLE} (*)
//     `,
//     )
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return normalizeGalleryPost(data as GalleryPostWithMediaRow);
// }

/**
 * Menghapus satu media dari Gallery Post.
 *
 * Fungsi ini hanya menghapus record database.
 * File Storage perlu dihapus melalui deleteUploadedImage().
 */
export async function deleteMotorcycleGalleryMedia(
  mediaId: string,
): Promise<void> {
  const { error } = await supabase
    .from(MOTORCYCLE_GALLERY_MEDIA_TABLE)
    .delete()
    .eq("id", mediaId);

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Menghapus Gallery Post.
 *
 * Seluruh record media akan ikut terhapus karena ON DELETE CASCADE.
 * File fisik di Supabase Storage tetap perlu dihapus secara terpisah.
 */
export async function deleteMotorcycleGalleryPost(
  postId: string,
): Promise<void> {
  const { error } = await supabase
    .from(MOTORCYCLE_GALLERY_POST_TABLE)
    .delete()
    .eq("id", postId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getMotorcycleGalleryPostsByUserId(
  userId: string,
): Promise<MotorcycleGalleryPost[]> {
  const { data, error } = await supabase
    .from(MOTORCYCLE_GALLERY_POST_TABLE)
    .select(
      `
      *,
      media:${MOTORCYCLE_GALLERY_MEDIA_TABLE} (*)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Gallery Post Garage query error:", error);

    throw error;
  }

  return (data ?? []).map((post) =>
    normalizeGalleryPost(post as GalleryPostWithMediaRow),
  );
}

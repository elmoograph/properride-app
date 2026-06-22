export const MOTORCYCLE_IMAGE_TABLE = "motorcycle_images";

export const MOTORCYCLE_IMAGE_COPY = {
  // Add Gallery screen
  ADD_EYEBROW: "Galeri Build",
  ADD_TITLE: "Tambah Foto Galeri",
  ADD_SUBTITLE:
    "Tambahkan foto motor, detail modifikasi, atau proses build Anda.",

  IMAGE_SECTION_TITLE: "Foto Galeri",
  IMAGE_SECTION_DESCRIPTION:
    "Pilih foto yang jelas dan menarik untuk ditampilkan di galeri build.",

  PHOTO_LABEL: "Foto",
  PHOTO_PLACEHOLDER: "Pilih foto galeri",
  PHOTO_REQUIRED: "Silakan pilih foto terlebih dahulu.",

  DETAIL_SECTION_TITLE: "Detail Foto",
  DETAIL_SECTION_DESCRIPTION:
    "Tambahkan keterangan singkat agar pengguna lain memahami isi foto.",

  CAPTION_LABEL: "Keterangan",
  CAPTION_PLACEHOLDER:
    "Ceritakan motor, modifikasi, atau detail yang terlihat pada foto...",

  CANCEL_BUTTON: "Batal",
  ADD_BUTTON: "Tambahkan ke Galeri",

  // Cancel confirmation
  CANCEL_CONFIRM_TITLE: "Batalkan penambahan foto?",
  CANCEL_CONFIRM_MESSAGE:
    "Foto dan keterangan yang sudah dipilih tidak akan disimpan.",
  KEEP_EDITING_BUTTON: "Lanjut Mengedit",
  DISCARD_BUTTON: "Buang Perubahan",

  // Picker
  IMAGE_PICK_FAILED_TITLE: "Gagal Memilih Foto",
  IMAGE_PICK_FAILED_MESSAGE: "Foto tidak dapat dipilih. Silakan coba kembali.",

  // Upload
  UPLOAD_FAILED_TITLE: "Gagal Menambahkan Foto",
  UPLOAD_FAILED_MESSAGE:
    "Foto galeri tidak dapat disimpan. Silakan coba kembali.",

  UPLOAD_SUCCESS_TITLE: "Foto Berhasil Ditambahkan",
  UPLOAD_SUCCESS_MESSAGE: "Foto telah ditambahkan ke galeri motor Anda.",

  // Gallery viewer
  IMAGE_DETAIL_TITLE: "Galeri Motor",
  IMAGE_COUNTER_ACCESSIBILITY: "Posisi foto",
  CLOSE_VIEWER_ACCESSIBILITY: "Tutup galeri",
  DELETE_ACCESSIBILITY: "Hapus foto galeri",

  // Delete
  DELETE_BUTTON: "Hapus Foto",
  DELETE_CONFIRM_TITLE: "Hapus foto ini?",
  DELETE_CONFIRM_MESSAGE:
    "Foto akan dihapus secara permanen dari galeri motor Anda.",
  DELETE_SUCCESS_TITLE: "Foto Berhasil Dihapus",
  DELETE_SUCCESS_MESSAGE: "Foto telah dihapus dari galeri.",
  DELETE_FAILED_TITLE: "Gagal Menghapus Foto",
  DELETE_FAILED_MESSAGE: "Foto tidak dapat dihapus. Silakan coba kembali.",

  DELETING_LABEL: "Menghapus foto...",

  // Empty state
  EMPTY_TITLE: "Galeri masih kosong",
  EMPTY_DESCRIPTION:
    "Tambahkan foto motor atau detail modifikasi untuk melengkapi build Anda.",
  CREATE_POST_EYEBROW: "Build Gallery",
  CREATE_POST_TITLE: "Create Gallery Post",
  CREATE_POST_SUBTITLE:
    "Bagikan foto atau video yang menampilkan detail dan proses build motor Anda.",

  MEDIA_SECTION_TITLE: "Gallery Media",
  MEDIA_SECTION_DESCRIPTION:
    "Tambahkan hingga 10 foto atau video dalam satu post.",

  POST_DETAIL_SECTION_TITLE: "Post Details",
  POST_DETAIL_SECTION_DESCRIPTION:
    "Tambahkan keterangan dan tentukan siapa yang dapat melihat post ini.",

  VISIBILITY_LABEL: "Visibilitas",
  VISIBILITY_PUBLIC: "Public",
  VISIBILITY_PUBLIC_DESCRIPTION: "Post dapat dilihat rider lain.",
  VISIBILITY_PRIVATE: "Private",
  VISIBILITY_PRIVATE_DESCRIPTION: "Post hanya dapat dilihat oleh Anda.",

  PUBLISH_BUTTON: "Publikasikan",
  PUBLISHING_LABEL: "Mengunggah",

  POST_SUCCESS_TITLE: "Gallery Post Berhasil Dibuat",
  POST_SUCCESS_MESSAGE:
    "Foto dan video telah ditambahkan ke Gallery build Anda.",

  POST_FAILED_TITLE: "Gagal Membuat Gallery Post",
  POST_FAILED_MESSAGE: "Gallery Post tidak dapat dibuat. Silakan coba kembali.",

  MEDIA_PICK_FAILED_TITLE: "Gagal Memilih Media",
  MEDIA_PICK_FAILED_MESSAGE:
    "Foto atau video tidak dapat dipilih. Silakan coba kembali.",
  DELETE_POST_CONFIRM_TITLE: "Hapus Gallery Post ini?",
  DELETE_POST_CONFIRM_MESSAGE:
    "Seluruh foto dan video dalam post ini akan dihapus secara permanen.",

  DELETE_POST_SUCCESS_TITLE: "Gallery Post Berhasil Dihapus",
  DELETE_POST_SUCCESS_MESSAGE:
    "Post beserta seluruh medianya telah dihapus dari Gallery.",

  DELETE_POST_FAILED_TITLE: "Gagal Menghapus Gallery Post",
  DELETE_POST_FAILED_MESSAGE:
    "Gallery Post tidak dapat dihapus. Silakan coba kembali.",

  DELETING_POST_LABEL: "Menghapus Gallery Post...",
} as const;

export const MOTORCYCLE_GALLERY_POST_TABLE = "motorcycle_gallery_posts";

export const MOTORCYCLE_GALLERY_MEDIA_TABLE = "motorcycle_gallery_media";

export const GALLERY_UPLOAD_LIMITS = {
  MAX_MEDIA_PER_POST: 10,
  MAX_VIDEO_DURATION_SECONDS: 60,
  MAX_VIDEO_SIZE_MB: 25,
} as const;

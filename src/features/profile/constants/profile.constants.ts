export const PROFILE_COPY = {
  SCREEN_TITLE: "Profile",
  SCREEN_SUBTITLE: "Kelola identitas rider dan informasi akun Anda.",

  EDIT_PROFILE_BUTTON: "Edit Profile",
  SETTINGS_BUTTON: "Settings",

  BUILDS_LABEL: "Builds",
  FOLLOWERS_LABEL: "Followers",
  FOLLOWING_LABEL: "Following",

  EMAIL_LABEL: "Email",
  LOCATION_EMPTY: "Lokasi belum ditambahkan",
  BIO_EMPTY: "Tambahkan bio agar rider lain lebih mengenal Anda.",
  USERNAME_EMPTY: "Username belum tersedia",
  FULL_NAME_EMPTY: "Rider ProperRide",
  EMAIL_EMPTY: "Email tidak tersedia",

  LOAD_FAILED_TITLE: "Gagal Memuat Profile",
  LOAD_FAILED_MESSAGE: "Data Profile tidak dapat dimuat. Silakan coba kembali.",

  RETRY_BUTTON: "Coba Lagi",

  LOGOUT_BUTTON: "Logout",
  LOGOUT_CONFIRM_TITLE: "Logout",
  LOGOUT_CONFIRM_MESSAGE: "Apakah Anda yakin ingin keluar dari akun ini?",
  LOGOUT_CANCEL: "Batal",
  LOGOUT_CONFIRM: "Logout",
  LOGOUT_FAILED_TITLE: "Logout Gagal",
  LOGOUT_FAILED_MESSAGE: "Tidak dapat keluar dari akun. Silakan coba kembali.",
  SAVED_BUILDS_TITLE: "Saved Builds",
  SAVED_BUILDS_DESCRIPTION: "Build disimpan sebagai referensi modifikasi.",
  SAVED_BUILDS_EMPTY_DESCRIPTION: "Belum ada Build yang disimpan.",
  SAVED_BUILDS_OPEN_BUTTON: "Buka",

  EDIT: {
    SCREEN_TITLE: "Edit Profile",
    SCREEN_EYEBROW: "Rider Identity",
    SCREEN_SUBTITLE:
      "Perbarui identitas, foto, dan informasi publik Profile Anda.",

    MEDIA_SECTION_TITLE: "Profile Media",
    MEDIA_SECTION_SUBTITLE:
      "Gunakan foto yang jelas agar Profile Anda mudah dikenali rider lain.",

    IDENTITY_SECTION_TITLE: "Identity",
    IDENTITY_SECTION_SUBTITLE:
      "Nama dan username akan ditampilkan pada Profile publik Anda.",

    ABOUT_SECTION_TITLE: "About",
    ABOUT_SECTION_SUBTITLE:
      "Tambahkan informasi singkat agar rider lain lebih mengenal Anda.",

    SOCIAL_SECTION_TITLE: "Links",
    SOCIAL_SECTION_SUBTITLE:
      "Tambahkan website dan akun Instagram yang dapat dikunjungi rider lain.",

    FULL_NAME_LABEL: "Nama Lengkap",
    FULL_NAME_PLACEHOLDER: "Masukkan nama lengkap",

    USERNAME_LABEL: "Username",
    USERNAME_PLACEHOLDER: "contoh: properride",

    BIO_LABEL: "Bio",
    BIO_PLACEHOLDER: "Ceritakan sedikit tentang Anda dan gaya riding Anda",

    LOCATION_LABEL: "Lokasi",
    LOCATION_PLACEHOLDER: "Contoh: Bandung, Jawa Barat",

    WEBSITE_LABEL: "Website",
    WEBSITE_PLACEHOLDER: "properride.com",

    INSTAGRAM_LABEL: "Instagram",
    INSTAGRAM_PLACEHOLDER: "contoh: properride",

    AVATAR_LABEL: "Foto Profile",
    AVATAR_ACTION: "Ganti Foto",

    COVER_TITLE: "Cover Profile",
    COVER_DESCRIPTION:
      "Pilih foto horizontal yang mewakili karakter dan gaya build Anda.",

    SAVE_BUTTON: "Simpan Perubahan",
    CANCEL_BUTTON: "Batal",

    LOAD_FAILED_TITLE: "Gagal Memuat Profile",
    LOAD_FAILED_MESSAGE:
      "Data Profile tidak dapat dimuat. Silakan coba kembali.",

    SAVE_SUCCESS_TITLE: "Profile Diperbarui",
    SAVE_SUCCESS_MESSAGE: "Perubahan Profile berhasil disimpan.",

    SAVE_FAILED_TITLE: "Gagal Memperbarui Profile",
    SAVE_FAILED_MESSAGE:
      "Perubahan Profile tidak dapat disimpan. Silakan coba kembali.",

    USERNAME_TAKEN:
      "Username sudah digunakan. Silakan pilih username yang lain.",

    IMAGE_PICK_FAILED_TITLE: "Gagal Memilih Foto",
    IMAGE_PICK_FAILED_MESSAGE:
      "Foto tidak dapat dipilih dari perangkat. Silakan coba kembali.",

    DISCARD_TITLE: "Batalkan Perubahan?",
    DISCARD_MESSAGE:
      "Perubahan yang belum disimpan akan hilang jika Anda kembali.",
    KEEP_EDITING: "Lanjut Edit",
    DISCARD: "Batalkan Perubahan",
    REMOVE_AVATAR: "Hapus Foto",
    REMOVE_COVER: "Hapus Cover",

    REMOVE_AVATAR_TITLE: "Hapus Foto Profile?",
    REMOVE_AVATAR_MESSAGE:
      "Foto Profile akan dihapus setelah perubahan disimpan.",

    REMOVE_COVER_TITLE: "Hapus Cover Profile?",
    REMOVE_COVER_MESSAGE:
      "Cover Profile akan dihapus setelah perubahan disimpan.",

    REMOVE_CANCEL: "Batal",
    REMOVE_CONFIRM: "Hapus",
  },
  PUBLIC: {
    SCREEN_EYEBROW: "Rider Profile",
    SCREEN_SUBTITLE:
      "Lihat identitas rider, statistik komunitas, dan koleksi Build.",

    FOLLOW_BUTTON: "Follow",
    FOLLOWING_BUTTON: "Following",
    EDIT_PROFILE_BUTTON: "Edit Profile",

    LOAD_FAILED_TITLE: "Gagal Memuat Profile",
    LOAD_FAILED_MESSAGE:
      "Profile rider tidak dapat dimuat. Silakan coba kembali.",

    NOT_FOUND_TITLE: "Profile Tidak Ditemukan",
    NOT_FOUND_MESSAGE: "Profile rider ini tidak tersedia atau sudah dihapus.",

    FOLLOW_FAILED_TITLE: "Aksi Gagal",
    UNFOLLOW_TITLE: "Unfollow Rider?",
    UNFOLLOW_MESSAGE:
      "Anda tidak akan lagi melihat update rider ini dalam daftar Following.",
    UNFOLLOW_CANCEL: "Batal",
    UNFOLLOW_CONFIRM: "Unfollow",

    BUILDS_SECTION_TITLE: "Builds",
    BUILDS_SECTION_SUBTITLE:
      "Koleksi motorcycle dan setup yang dibagikan rider ini.",

    BUILDS_EMPTY_TITLE: "Belum Ada Build",
    BUILDS_EMPTY_MESSAGE: "Rider ini belum membagikan Build ke ProperRide.",

    RETRY_BUTTON: "Coba Lagi",
    BUILD_STATUS_ACTIVE: "Active",
    BUILD_STATUS_SOLD: "Sold",
    BUILD_STATUS_ARCHIVED: "Archived",

    BUILD_YEAR_EMPTY: "Tahun belum tersedia",
    OPEN_BUILD: "Lihat Build",
  } as const,
  FOLLOW_LIST: {
    FOLLOWERS_TITLE: "Followers",
    FOLLOWING_TITLE: "Following",

    FOLLOWERS_SUBTITLE: "Rider yang mengikuti Profile ini.",
    FOLLOWING_SUBTITLE: "Rider yang diikuti oleh Profile ini.",

    EMPTY_FOLLOWERS_TITLE: "Belum Ada Followers",
    EMPTY_FOLLOWERS_MESSAGE: "Belum ada rider yang mengikuti Profile ini.",

    EMPTY_FOLLOWING_TITLE: "Belum Mengikuti Rider",
    EMPTY_FOLLOWING_MESSAGE: "Profile ini belum mengikuti rider lain.",

    LOAD_FAILED_TITLE: "Gagal Memuat Rider",
    LOAD_FAILED_MESSAGE:
      "Daftar rider tidak dapat dimuat. Silakan coba kembali.",

    FOLLOW_BUTTON: "Follow",
    FOLLOWING_BUTTON: "Following",
    VIEW_PROFILE: "Lihat Profile",
    RETRY_BUTTON: "Coba Lagi",

    UNFOLLOW_TITLE: "Unfollow Rider?",
    UNFOLLOW_MESSAGE: "Anda tidak akan lagi mengikuti rider ini.",
    UNFOLLOW_CANCEL: "Batal",
    UNFOLLOW_CONFIRM: "Unfollow",
  },
} as const;

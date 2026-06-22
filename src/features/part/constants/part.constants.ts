export const PART_TABLE = "parts";

/**
 * Nilai kategori disimpan ke database.
 * Jangan mengubah value kategori lama tanpa melakukan migrasi data.
 */
export const PART_CATEGORIES = [
  "Engine",
  "Exhaust",
  "Suspension",
  "Brake",
  "Wheel",
  "Tire",
  "Body",
  "Lighting",
  "Electrical",
  "Performance",
  "Accessories",
  "Other",
] as const;

export type PartCategory = (typeof PART_CATEGORIES)[number];

export const PART_SORT_OPTIONS = {
  NEWEST: "newest",
  OLDEST: "oldest",
  PRICE_HIGH: "price_high",
  PRICE_LOW: "price_low",
  RATING_HIGH: "rating_high",
  INSTALL_DATE: "install_date",
} as const;

export type PartSortOption =
  (typeof PART_SORT_OPTIONS)[keyof typeof PART_SORT_OPTIONS];

export const PART_SORT_LABELS: Record<PartSortOption, string> = {
  [PART_SORT_OPTIONS.NEWEST]: "Terbaru",
  [PART_SORT_OPTIONS.OLDEST]: "Terlama",
  [PART_SORT_OPTIONS.PRICE_HIGH]: "Harga Tertinggi",
  [PART_SORT_OPTIONS.PRICE_LOW]: "Harga Terendah",
  [PART_SORT_OPTIONS.RATING_HIGH]: "Rating Tertinggi",
  [PART_SORT_OPTIONS.INSTALL_DATE]: "Tanggal Pemasangan",
};

export const PART_COPY = {
  // General
  EMPTY_VALUE: "-",
  FILTER_ALL: "Semua",

  // Add Part
  ADD_SCREEN_TITLE: "Add Part",
  ADD_SCREEN_SUBTITLE:
    "Tambahkan detail part yang digunakan pada build motor Anda.",

  // Edit Part
  EDIT_SCREEN_TITLE: "Edit Part",
  EDIT_SCREEN_SUBTITLE:
    "Perbarui informasi, pemasangan, dan visibilitas part ini.",

  // Form sections
  IMAGE_SECTION_TITLE: "Part Photo",
  IMAGE_SECTION_DESCRIPTION:
    "Tambahkan foto part agar setup build lebih mudah dikenali.",

  BASIC_SECTION_TITLE: "Part Identity",
  BASIC_SECTION_DESCRIPTION:
    "Pilih kategori dan lengkapi identitas utama part.",

  DETAIL_SECTION_TITLE: "Part Details",
  DETAIL_SECTION_DESCRIPTION:
    "Lengkapi informasi pembelian, pemasangan, dan pengalaman penggunaan.",

  // Form fields
  FIELD_MAIN_IMAGE: "Foto Part",
  FIELD_CATEGORY: "Kategori",
  FIELD_BRAND: "Merek",
  FIELD_PRODUCT_NAME: "Nama Produk",
  FIELD_PRICE: "Harga",
  FIELD_PURCHASE_DATE: "Tanggal Pembelian",
  FIELD_INSTALL_DATE: "Tanggal Pemasangan",
  FIELD_WORKSHOP: "Bengkel",
  FIELD_LOCATION: "Lokasi",
  FIELD_RATING: "Rating",
  FIELD_DESCRIPTION: "Keterangan",

  // Form placeholders
  PLACEHOLDER_MAIN_IMAGE: "Pilih foto part",
  PLACEHOLDER_BRAND: "Contoh: RCB",
  PLACEHOLDER_PRODUCT_NAME: "Contoh: Rear Shock VD Series",
  PLACEHOLDER_PRICE: "Contoh: 1500000",
  PLACEHOLDER_PURCHASE_DATE: "DD/MM/YYYY",
  PLACEHOLDER_INSTALL_DATE: "DD/MM/YYYY",
  PLACEHOLDER_WORKSHOP: "Masukkan nama bengkel",
  PLACEHOLDER_LOCATION: "Masukkan kota atau lokasi bengkel",
  PLACEHOLDER_DESCRIPTION:
    "Ceritakan fungsi, pengalaman penggunaan, atau alasan memilih part ini...",

  // Form helper
  PRICE_HELPER: "Masukkan angka tanpa titik atau simbol mata uang.",
  DATE_HELPER: "Gunakan format DD/MM/YYYY.",
  RATING_EMPTY: "Belum Dinilai",

  // Visibility
  PUBLIC_SETUP_LABEL: "Tampilkan di Public Setup",
  PUBLIC_SETUP_DESCRIPTION:
    "Rider lain dapat melihat part ini saat membuka build Anda.",

  // Buttons
  SAVE_BUTTON: "Tambahkan Part",
  UPDATE_BUTTON: "Simpan Perubahan",
  DELETE_BUTTON: "Hapus Part",
  CANCEL_BUTTON: "Batal",

  // Add success/error
  SAVE_SUCCESS_TITLE: "Part Berhasil Ditambahkan",
  SAVE_SUCCESS_MESSAGE: "Part telah ditambahkan ke setup build motor Anda.",

  SAVE_FAILED_TITLE: "Gagal Menambahkan Part",
  SAVE_FAILED_MESSAGE: "Part tidak dapat disimpan. Silakan coba kembali.",

  // Update success/error
  UPDATE_SUCCESS_TITLE: "Part Berhasil Diperbarui",
  UPDATE_SUCCESS_MESSAGE: "Perubahan informasi part telah berhasil disimpan.",

  UPDATE_FAILED_TITLE: "Gagal Memperbarui Part",
  UPDATE_FAILED_MESSAGE:
    "Perubahan part tidak dapat disimpan. Silakan coba kembali.",

  // Image
  IMAGE_PICK_FAILED_TITLE: "Gagal Memilih Foto",
  IMAGE_PICK_FAILED_MESSAGE:
    "Foto part tidak dapat dipilih. Silakan coba kembali.",

  IMAGE_UPLOAD_FAILED_TITLE: "Gagal Mengunggah Foto",
  IMAGE_UPLOAD_FAILED_MESSAGE:
    "Foto part tidak dapat diunggah. Silakan coba kembali.",

  // Loading
  LOAD_FAILED_TITLE: "Gagal Memuat Part",
  LOAD_FAILED_MESSAGE: "Data part tidak dapat dimuat. Silakan coba kembali.",

  // Detail loading
  DETAIL_LOAD_FAILED_TITLE: "Gagal Memuat Part",
  DETAIL_LOAD_FAILED_MESSAGE:
    "Detail part tidak dapat dimuat. Silakan coba kembali.",

  // Detail not found
  DETAIL_NOT_FOUND_TITLE: "Part Tidak Ditemukan",
  DETAIL_NOT_FOUND_DESCRIPTION:
    "Part ini mungkin sudah dihapus atau tidak lagi tersedia.",

  // Detail screen
  DETAIL_SCREEN_TITLE: "Part Details",
  DETAIL_SCREEN_SUBTITLE:
    "Informasi lengkap part yang digunakan pada build ini.",

  DETAIL_EDIT_BUTTON: "Edit Part",

  DETAIL_OVERVIEW_TITLE: "Part Overview",
  DETAIL_OVERVIEW_DESCRIPTION: "Identitas utama dari part yang digunakan.",

  DETAIL_INSTALLATION_TITLE: "Purchase & Installation",
  DETAIL_INSTALLATION_DESCRIPTION:
    "Informasi pembelian dan proses pemasangan part.",

  DETAIL_DESCRIPTION_TITLE: "Description",
  DETAIL_DESCRIPTION_DESCRIPTION: "Catatan dan pengalaman penggunaan part.",

  // Detail labels
  LABEL_CATEGORY: "Kategori",
  LABEL_BRAND: "Merek",
  LABEL_PRODUCT_NAME: "Nama Produk",
  LABEL_PRICE: "Harga",
  LABEL_PURCHASE_DATE: "Tanggal Pembelian",
  LABEL_INSTALL_DATE: "Tanggal Pemasangan",
  LABEL_WORKSHOP: "Bengkel",
  LABEL_LOCATION: "Lokasi",
  LABEL_RATING: "Rating",
  LABEL_VISIBILITY: "Visibilitas",

  // Quick information cards
  INFO_PRICE_TITLE: "Harga",
  INFO_INSTALL_DATE_TITLE: "Dipasang",
  INFO_WORKSHOP_TITLE: "Bengkel",
  INFO_RATING_TITLE: "Rating",

  // Delete
  DELETE_CONFIRM_TITLE: "Hapus part ini?",
  DELETE_CONFIRM_MESSAGE:
    "Part akan dihapus secara permanen dari setup build Anda.",

  DELETE_SUCCESS_TITLE: "Part Berhasil Dihapus",
  DELETE_SUCCESS_MESSAGE: "Part telah dihapus dari setup build motor Anda.",

  DELETE_FAILED_TITLE: "Gagal Menghapus Part",
  DELETE_FAILED_MESSAGE: "Part tidak dapat dihapus. Silakan coba kembali.",

  // Cancel Add/Edit
  CANCEL_ADD_TITLE: "Batalkan penambahan part?",
  CANCEL_ADD_MESSAGE: "Informasi part yang sudah Anda isi tidak akan disimpan.",

  CANCEL_EDIT_TITLE: "Batalkan perubahan?",
  CANCEL_EDIT_MESSAGE: "Perubahan pada informasi part tidak akan disimpan.",

  KEEP_EDITING_BUTTON: "Lanjut Mengedit",
  DISCARD_CHANGES_BUTTON: "Buang Perubahan",

  // Validation
  VALIDATION_CATEGORY_REQUIRED: "Silakan pilih kategori part.",
  VALIDATION_PRICE_INVALID: "Harga harus berupa angka yang valid.",
  VALIDATION_PURCHASE_DATE_INVALID:
    "Tanggal pembelian harus menggunakan format DD/MM/YYYY.",
  VALIDATION_INSTALL_DATE_INVALID:
    "Tanggal pemasangan harus menggunakan format DD/MM/YYYY.",
  VALIDATION_RATING_INVALID: "Rating harus berada di antara 1 sampai 5.",

  // Search and filter
  SEARCH_PLACEHOLDER: "Cari merek, produk, atau kategori part...",
  FILTER_CATEGORY_LABEL: "Kategori",
  SORT_LABEL: "Urutkan",

  // Empty states
  EMPTY_LIST_TITLE: "Belum Ada Part",
  EMPTY_LIST_DESCRIPTION:
    "Tambahkan part yang digunakan untuk melengkapi setup build ini.",

  EMPTY_FILTER_TITLE: "Part Tidak Ditemukan",
  EMPTY_FILTER_DESCRIPTION:
    "Coba ubah pencarian, kategori, atau urutan yang digunakan.",

  // Compatibility: category group
  GROUP_TITLE_SUFFIX: "part",

  // Compatibility: summary card
  SUMMARY_TITLE: "Build Summary",
  SUMMARY_TOTAL_PARTS: "Total Part",
  SUMMARY_CATEGORIES: "Kategori",
  SUMMARY_TOTAL_COST: "Total Estimasi",

  // Compatibility: rating
  RATING_NO_VALUE: "Belum Dinilai",

  // Compatibility: date validation
  VALIDATION_DATE_INVALID: "Tanggal harus menggunakan format DD/MM/YYYY.",

  // Compatibility: sorting
  SORT_NEWEST: "Terbaru",
  SORT_PRICE_HIGH: "Harga Tertinggi",
  SORT_PRICE_LOW: "Harga Terendah",
  SORT_INSTALL_DATE: "Tanggal Pemasangan",
} as const;

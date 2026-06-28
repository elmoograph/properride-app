export const USER_BLOCKS_TABLE = "user_blocks";
export const CONTENT_REPORTS_TABLE = "content_reports";

export const REPORT_REASONS = {
  SPAM: "spam",
  HARASSMENT: "harassment",
  INAPPROPRIATE_CONTENT: "inappropriate_content",
  MISLEADING_CONTENT: "misleading_content",
  OTHER: "other",
} as const;

export const SAFETY_COPY = {
  REPORT_TITLE: "Laporkan Konten",
  REPORT_PROFILE_TITLE: "Laporkan Rider",
  REPORT_BUILD_TITLE: "Laporkan Build",

  REPORT_DESCRIPTION:
    "Bantu kami menjaga ProperRide tetap aman dan relevan untuk komunitas rider.",

  REPORT_REASON_LABEL: "Alasan laporan",
  REPORT_DETAILS_LABEL: "Detail tambahan",
  REPORT_DETAILS_PLACEHOLDER:
    "Ceritakan masalah yang Anda temukan. Bagian ini opsional.",

  REPORT_REASON_SPAM: "Spam atau promosi berlebihan",
  REPORT_REASON_HARASSMENT: "Pelecehan atau perilaku mengganggu",
  REPORT_REASON_INAPPROPRIATE_CONTENT: "Konten tidak pantas",
  REPORT_REASON_MISLEADING_CONTENT: "Informasi menyesatkan",
  REPORT_REASON_OTHER: "Lainnya",

  REPORT_SUBMIT_BUTTON: "Kirim Laporan",
  REPORT_CANCEL_BUTTON: "Batal",

  REPORT_SUCCESS_TITLE: "Laporan Terkirim",
  REPORT_SUCCESS_MESSAGE:
    "Terima kasih. Laporan Anda akan kami tinjau untuk menjaga kualitas komunitas.",

  REPORT_FAILED_TITLE: "Gagal Mengirim Laporan",
  REPORT_FAILED_MESSAGE: "Laporan belum dapat dikirim. Silakan coba kembali.",

  BLOCK_USER_TITLE: "Blokir Rider",
  BLOCK_USER_MESSAGE:
    "Anda tidak akan melihat konten dari rider ini. Anda juga dapat membuka blokir nanti.",
  BLOCK_USER_CONFIRM: "Blokir",
  BLOCK_USER_CANCEL: "Batal",

  BLOCK_SUCCESS_TITLE: "Rider Diblokir",
  BLOCK_SUCCESS_MESSAGE:
    "Konten dari rider ini tidak akan ditampilkan di Feed dan Search Anda.",

  BLOCK_FAILED_TITLE: "Gagal Memblokir Rider",
  BLOCK_FAILED_MESSAGE: "Rider belum dapat diblokir. Silakan coba kembali.",

  UNBLOCK_USER_TITLE: "Buka Blokir Rider",
  UNBLOCK_USER_MESSAGE:
    "Konten rider ini akan dapat muncul kembali di ProperRide.",
  UNBLOCK_USER_CONFIRM: "Buka Blokir",

  UNBLOCK_FAILED_TITLE: "Gagal Membuka Blokir",
  UNBLOCK_FAILED_MESSAGE: "Blokir belum dapat dibuka. Silakan coba kembali.",

  BLOCKED_PROFILE_TITLE: "Rider Diblokir",
  BLOCKED_PROFILE_DESCRIPTION:
    "Anda telah memblokir rider ini. Buka blokir untuk melihat Profile dan Build mereka kembali.",
} as const;

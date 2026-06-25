import type { Profile } from "@/src/features/profile/types/profile.types";

export type ProfileFormValues = {
  fullName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  instagram: string;

  avatarUrl: string;
  avatarPath: string;
  avatarLocalUri: string;
  removeAvatar: boolean;

  coverUrl: string;
  coverPath: string;
  coverLocalUri: string;
  removeCover: boolean;
};

export type ProfileFormErrors = Partial<
  Record<
    "fullName" | "username" | "bio" | "location" | "website" | "instagram",
    string
  >
>;

export const INITIAL_PROFILE_FORM: ProfileFormValues = {
  fullName: "",
  username: "",
  bio: "",
  location: "",
  website: "",
  instagram: "",

  avatarUrl: "",
  avatarPath: "",
  avatarLocalUri: "",
  removeAvatar: false,

  coverUrl: "",
  coverPath: "",
  coverLocalUri: "",
  removeCover: false,
};

const PROFILE_FORM_LIMITS = {
  FULL_NAME_MAX: 60,
  USERNAME_MIN: 3,
  USERNAME_MAX: 30,
  BIO_MAX: 160,
  LOCATION_MAX: 80,
  WEBSITE_MAX: 200,
  INSTAGRAM_MAX: 30,
} as const;

const USERNAME_PATTERN = /^[a-zA-Z0-9._]+$/;
const INSTAGRAM_PATTERN = /^[a-zA-Z0-9._]+$/;
const USERNAME_EDGE_PATTERN = /^[a-z0-9](?:[a-z0-9._]*[a-z0-9])?$/;
const FULL_NAME_PATTERN = /[a-zA-ZÀ-ÿ]/;
export function mapProfileToForm(profile: Profile): ProfileFormValues {
  return {
    fullName: profile.full_name ?? "",
    username: profile.username ?? "",
    bio: profile.bio ?? "",
    location: profile.location ?? "",
    website: profile.website ?? "",
    instagram: profile.instagram ?? "",

    avatarUrl: profile.avatar_url ?? "",
    avatarPath: profile.avatar_path ?? "",
    avatarLocalUri: "",
    removeAvatar: false,

    coverUrl: profile.cover_url ?? "",
    coverPath: profile.cover_path ?? "",
    coverLocalUri: "",
    removeCover: false,
  };
}

export function validateProfileForm(
  values: ProfileFormValues,
): ProfileFormErrors {
  const errors: ProfileFormErrors = {};

  const fullName = values.fullName.trim();
  const username = normalizeUsername(values.username);
  const bio = values.bio.trim();
  const location = values.location.trim();
  const website = values.website.trim();
  const instagram = normalizeInstagramUsername(values.instagram);

  if (!fullName) {
    errors.fullName = "Nama lengkap wajib diisi.";
  } else if (!FULL_NAME_PATTERN.test(fullName)) {
    errors.fullName = "Nama lengkap harus mengandung huruf.";
  } else if (fullName.length > PROFILE_FORM_LIMITS.FULL_NAME_MAX) {
    errors.fullName = `Nama lengkap maksimal ${PROFILE_FORM_LIMITS.FULL_NAME_MAX} karakter.`;
  }

  if (!username) {
    errors.username = "Username wajib diisi.";
  } else if (username.length < PROFILE_FORM_LIMITS.USERNAME_MIN) {
    errors.username = `Username minimal ${PROFILE_FORM_LIMITS.USERNAME_MIN} karakter.`;
  } else if (username.length > PROFILE_FORM_LIMITS.USERNAME_MAX) {
    errors.username = `Username maksimal ${PROFILE_FORM_LIMITS.USERNAME_MAX} karakter.`;
  } else if (!USERNAME_PATTERN.test(username)) {
    errors.username =
      "Username hanya boleh berisi huruf, angka, titik, dan garis bawah.";
  } else if (!USERNAME_EDGE_PATTERN.test(username)) {
    errors.username =
      "Username harus diawali dan diakhiri dengan huruf atau angka.";
  } else if (username.includes("..")) {
    errors.username = "Username tidak boleh memiliki dua titik berurutan.";
  }

  if (bio.length > PROFILE_FORM_LIMITS.BIO_MAX) {
    errors.bio = `Bio maksimal ${PROFILE_FORM_LIMITS.BIO_MAX} karakter.`;
  }

  if (location.length > PROFILE_FORM_LIMITS.LOCATION_MAX) {
    errors.location = `Lokasi maksimal ${PROFILE_FORM_LIMITS.LOCATION_MAX} karakter.`;
  }

  if (website.length > PROFILE_FORM_LIMITS.WEBSITE_MAX) {
    errors.website = `Website maksimal ${PROFILE_FORM_LIMITS.WEBSITE_MAX} karakter.`;
  } else if (website && !isValidWebsite(website)) {
    errors.website = "Masukkan alamat website yang valid.";
  }

  if (instagram.length > PROFILE_FORM_LIMITS.INSTAGRAM_MAX) {
    errors.instagram = `Username Instagram maksimal ${PROFILE_FORM_LIMITS.INSTAGRAM_MAX} karakter.`;
  } else if (instagram && !INSTAGRAM_PATTERN.test(instagram)) {
    errors.instagram =
      "Username Instagram hanya boleh berisi huruf, angka, titik, dan garis bawah.";
  }

  return errors;
}

export function normalizeUsername(value: string): string {
  return value.trim().replace(/^@+/, "").toLowerCase();
}

export function normalizeInstagramUsername(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  const withoutInstagramUrl = trimmedValue.replace(
    /^https?:\/\/(www\.)?instagram\.com\//i,
    "",
  );

  return withoutInstagramUrl
    .split(/[/?#]/)[0]
    .replace(/^@+/, "")
    .trim()
    .toLowerCase();
}

export function normalizeWebsite(value: string): string | null {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  if (/^https?:\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  return `https://${normalizedValue}`;
}

export function getProfileAvatarPreview(
  values: ProfileFormValues,
): string | null {
  if (values.removeAvatar) {
    return null;
  }

  return values.avatarLocalUri || values.avatarUrl || null;
}

export function getProfileCoverPreview(
  values: ProfileFormValues,
): string | null {
  if (values.removeCover) {
    return null;
  }

  return values.coverLocalUri || values.coverUrl || null;
}

function isValidWebsite(value: string): boolean {
  try {
    const normalizedValue = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;

    const parsedUrl = new URL(normalizedValue);

    const isSupportedProtocol =
      parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";

    const hostnameParts = parsedUrl.hostname.split(".");
    const hasValidHostname =
      hostnameParts.length >= 2 &&
      hostnameParts.every((part) => part.length > 0);

    return isSupportedProtocol && hasValidHostname;
  } catch {
    return false;
  }
}

export const ROUTES = {
  AUTH: {
    LOGIN: "/(auth)/login",
    REGISTER: "/(auth)/register",
  },

  TABS: {
    HOME: "/(tabs)/home",
    SEARCH: "/(tabs)/search",
    CREATE: "/(tabs)/create",
    GARAGE: "/(tabs)/garage",
    PROFILE: "/(tabs)/profile",
  },

  PROFILE_SETUP: "/profile-setup",
  SAVED_BUILDS: "/saved-builds",
  PROFILE: {
    EDIT: "/profile/edit",
    PUBLIC_PATTERN: "/profile/[userId]",
    FOLLOWERS_PATTERN: "/profile/[userId]/followers",
    FOLLOWING_PATTERN: "/profile/[userId]/following",

    PUBLIC: (userId: string) => `/profile/${userId}` as const,
    FOLLOWERS: (userId: string) => `/profile/${userId}/followers` as const,
    FOLLOWING: (userId: string) => `/profile/${userId}/following` as const,
  },

  MOTORCYCLE: {
    ADD: "/motorcycle/add",
    DETAIL_PATTERN: "/motorcycle/[id]",
    EDIT_PATTERN: "/motorcycle/edit/[id]",

    DETAIL: (id: string) => `/motorcycle/${id}` as const,
    EDIT: (id: string) => `/motorcycle/edit/${id}` as const,
  },

  PART: {
    ADD_PATTERN: "/part/add/[motorcycleId]",
    DETAIL_PATTERN: "/part/[id]",
    EDIT_PATTERN: "/part/edit/[id]",

    ADD: (motorcycleId: string) => `/part/add/${motorcycleId}` as const,
    DETAIL: (id: string) => `/part/${id}` as const,
    EDIT: (id: string) => `/part/edit/${id}` as const,
  },

  GALLERY: {
    ADD: (motorcycleId: string) => `/gallery/add/${motorcycleId}` as const,
  },
} as const;

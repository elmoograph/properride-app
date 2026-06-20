export const MOTORCYCLE_SHOWCASE_COLORS = {
  background: "#05090C",
  surface: "#10151B",
  surfaceSoft: "#151B21",
  surfaceMuted: "#1D242B",

  textPrimary: "#FFFFFF",
  textSecondary: "#B6BDC6",
  textMuted: "#6F7782",

  border: "#222A33",
  borderSoft: "#151B21",

  accent: "#A7F432",
  accentDark: "#7FC900",

  blackOverlay: "rgba(0, 0, 0, 0.45)",
  blackOverlayStrong: "rgba(0, 0, 0, 0.72)",
} as const;

export const MOTORCYCLE_SHOWCASE_TABS = {
  SETUP: "setup",
  TIMELINE: "timeline",
  GALLERY: "gallery",
} as const;

// export const MOTORCYCLE_SHOWCASE_COPY = {
//   SCREEN_TITLE: "My Garage",
//   ADD_MOTORCYCLE: "Tambah motor",

//   TOTAL_BUILD_COST: "Total Build Cost",
//   TOTAL_PARTS: "Total Parts",

//   TAB_SETUP: "Setup",
//   TAB_TIMELINE: "Timeline",
//   TAB_GALLERY: "Gallery",

//   SHOW_MORE: "Show More...",
//   NO_PARTS_TITLE: "No setup parts yet",
//   NO_PARTS_DESCRIPTION:
//     "Add parts to turn this motorcycle into a proper build showcase.",

//   TIMELINE_EMPTY_TITLE: "Timeline coming soon",
//   TIMELINE_EMPTY_DESCRIPTION:
//     "Later, you can document build progress, upgrades, and riding moments here.",

//   GALLERY_EMPTY_TITLE: "No gallery photos yet",
//   GALLERY_EMPTY_DESCRIPTION:
//     "Add gallery photos to make this build more inspiring for other riders.",
// } as const;

export const MOTORCYCLE_SHOWCASE_COPY = {
  SCREEN_TITLE: "My Garage",
  ADD_MOTORCYCLE: "Tambah motor",

  OWNER_ACTION_EDIT_BUILD: "Edit Build",
  OWNER_ACTION_ADD_PART: "Add Part",
  OWNER_ACTION_ADD_GALLERY: "Add Gallery",
  OWNER_ACTION_MORE: "More",

  MORE_MENU_TITLE: "Build Actions",
  MORE_MENU_DESCRIPTION: "Manage this motorcycle build.",
  MORE_MENU_DELETE_BUILD: "Delete Build",
  MORE_MENU_CANCEL: "Cancel",

  TOTAL_BUILD_COST: "Total Build Cost",
  TOTAL_PARTS: "Total Parts",

  TAB_SETUP: "Setup",
  TAB_TIMELINE: "Timeline",
  TAB_GALLERY: "Gallery",

  SHOW_MORE: "Show More...",
  NO_PARTS_TITLE: "No setup parts yet",
  NO_PARTS_DESCRIPTION:
    "Add parts to turn this motorcycle into a proper build showcase.",

  TIMELINE_EMPTY_TITLE: "Timeline coming soon",
  TIMELINE_EMPTY_DESCRIPTION:
    "Later, you can document build progress, upgrades, and riding moments here.",

  GALLERY_EMPTY_TITLE: "No gallery photos yet",
  GALLERY_EMPTY_DESCRIPTION:
    "Add gallery photos to make this build more inspiring for other riders.",
} as const;

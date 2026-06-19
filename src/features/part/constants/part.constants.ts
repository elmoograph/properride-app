export const PART_TABLE = "parts";

export const PART_SORT_OPTIONS = {
  NEWEST: "newest",
  PRICE_HIGH: "price_high",
  PRICE_LOW: "price_low",
  INSTALL_DATE: "install_date",
} as const;

export const PART_CATEGORIES = [
  "Suspension",
  "Wheel",
  "Brake",
  "Handlebar",
  "Engine",
  "Exhaust",
  "Lighting",
  "Transmission",
  "CVT",
  "Accessories",
  "Body",
  "Frame",
  "Electrical",
  "Oil",
  "Others",
] as const;

export const PART_COPY = {
  SECTION_TITLE: "Parts",
  SECTION_EMPTY_TITLE: "No parts added yet",
  SECTION_EMPTY_DESCRIPTION:
    "Add parts to document your motorcycle modification journey.",
  ADD_BUTTON: "Add Part",

  LOAD_FAILED_TITLE: "Unable to load parts",
  LOAD_FAILED_MESSAGE: "Please try again.",

  DETAIL_TITLE: "Part Detail",
  DETAIL_SUBTITLE: "Part information will be shown here.",

  ADD_SCREEN_TITLE: "Add Part",
  ADD_SCREEN_SUBTITLE: "Document a new part installed on this motorcycle.",

  EDIT_SCREEN_TITLE: "Edit Part",
  EDIT_SCREEN_SUBTITLE: "Update part information.",

  IMAGE_SECTION_TITLE: "Part Photo",
  IMAGE_SECTION_DESCRIPTION:
    "Upload a main photo for this part or modification.",
  BASIC_SECTION_TITLE: "Part Information",
  BASIC_SECTION_DESCRIPTION:
    "Add the main information about the installed part.",
  DETAIL_SECTION_TITLE: "Installation Details",
  DETAIL_SECTION_DESCRIPTION:
    "Optional information about price, workshop, and installation.",

  INFO_PRICE_TITLE: "Price",
  INFO_INSTALL_DATE_TITLE: "Installed",
  INFO_WORKSHOP_TITLE: "Workshop",
  INFO_RATING_TITLE: "Rating",
  RATING_NO_VALUE: "No rating",

  FIELD_MAIN_IMAGE: "Main Image",
  FIELD_CATEGORY: "Category",
  FIELD_BRAND: "Brand",
  FIELD_PRODUCT_NAME: "Product Name",
  FIELD_PRICE: "Price",
  FIELD_PURCHASE_DATE: "Purchase Date",
  FIELD_INSTALL_DATE: "Install Date",
  FIELD_WORKSHOP: "Workshop",
  FIELD_LOCATION: "Location",
  FIELD_RATING: "Rating",
  FIELD_DESCRIPTION: "Description",

  PLACEHOLDER_MAIN_IMAGE: "Tap to choose part photo",
  PLACEHOLDER_CATEGORY: "Example: Suspension",
  PLACEHOLDER_BRAND: "Example: Ohlins",
  PLACEHOLDER_PRODUCT_NAME: "Example: Rear Shock",
  PLACEHOLDER_PRICE: "Example: 2500000",
  PLACEHOLDER_PURCHASE_DATE: "YYYY-MM-DD",
  PLACEHOLDER_INSTALL_DATE: "YYYY-MM-DD",
  PLACEHOLDER_WORKSHOP: "Example: Proper Garage",
  PLACEHOLDER_LOCATION: "Example: Bandung",
  PLACEHOLDER_RATING: "1 - 5",
  PLACEHOLDER_DESCRIPTION: "Tell the story of this part",

  SAVE_BUTTON: "Save Part",
  SAVE_SUCCESS_TITLE: "Part added",
  SAVE_SUCCESS_MESSAGE: "Part has been added to your motorcycle.",
  SAVE_FAILED_TITLE: "Unable to save part",
  SAVE_FAILED_MESSAGE: "Please try again.",

  UPDATE_BUTTON: "Update Part",
  UPDATE_SUCCESS_TITLE: "Part updated",
  UPDATE_SUCCESS_MESSAGE: "Part has been updated.",
  UPDATE_FAILED_TITLE: "Unable to update part",
  UPDATE_FAILED_MESSAGE: "Please try again.",

  IMAGE_PICK_FAILED_TITLE: "Unable to choose image",
  IMAGE_UPLOAD_FAILED_TITLE: "Unable to upload image",

  VALIDATION_CATEGORY_REQUIRED: "Category is required.",
  VALIDATION_PRICE_INVALID: "Price must be a valid number.",
  VALIDATION_RATING_INVALID: "Rating must be between 1 and 5.",
  VALIDATION_DATE_INVALID: "Date must use YYYY-MM-DD format.",

  LABEL_CATEGORY: "Category",
  LABEL_BRAND: "Brand",
  LABEL_PRODUCT_NAME: "Product Name",
  LABEL_PRICE: "Price",
  LABEL_INSTALL_DATE: "Install Date",
  LABEL_WORKSHOP: "Workshop",
  LABEL_RATING: "Rating",

  DETAIL_LOAD_FAILED_TITLE: "Unable to load part",
  DETAIL_LOAD_FAILED_MESSAGE: "Please try again.",
  DETAIL_NOT_FOUND_TITLE: "Part not found",
  DETAIL_NOT_FOUND_DESCRIPTION:
    "This part may have been deleted or is no longer available.",

  DETAIL_EDIT_BUTTON: "Edit Part",
  DELETE_BUTTON: "Delete Part",
  DELETE_CONFIRM_TITLE: "Delete Part",
  DELETE_CONFIRM_MESSAGE:
    "Are you sure you want to delete this part? This action cannot be undone.",
  DELETE_FAILED_TITLE: "Unable to delete part",
  DELETE_FAILED_MESSAGE: "Please try again.",
  DELETE_SUCCESS_TITLE: "Part deleted",
  DELETE_SUCCESS_MESSAGE: "Part has been deleted from this motorcycle.",

  DETAIL_OVERVIEW_TITLE: "Overview",
  DETAIL_INSTALLATION_TITLE: "Installation",
  DETAIL_DESCRIPTION_TITLE: "Description",

  LABEL_PURCHASE_DATE: "Purchase Date",
  LABEL_LOCATION: "Location",
  LABEL_DESCRIPTION: "Description",

  FILTER_ALL: "All",
  SEARCH_PLACEHOLDER: "Search parts, brand, category, workshop...",
  FILTER_EMPTY_TITLE: "No matching parts",
  FILTER_EMPTY_DESCRIPTION:
    "Try another keyword or choose a different category.",

  SORT_LABEL: "Sort By",
  SORT_NEWEST: "Newest",
  SORT_PRICE_HIGH: "Price High",
  SORT_PRICE_LOW: "Price Low",
  SORT_INSTALL_DATE: "Install Date",

  SUMMARY_TITLE: "Build Summary",
  SUMMARY_TOTAL_PARTS: "Total Parts",
  SUMMARY_TOTAL_COST: "Estimated Cost",
  SUMMARY_CATEGORIES: "Categories",

  GROUP_EMPTY_TITLE: "No parts in this category",
  GROUP_TITLE_SUFFIX: "Parts",

  RATING_EMPTY: "No rating",
  PRICE_HELPER: "Input number only, example: 2500000",
  DATE_HELPER: "Use YYYY-MM-DD format, example: 2026-06-19",

  EMPTY_VALUE: "-",
} as const;

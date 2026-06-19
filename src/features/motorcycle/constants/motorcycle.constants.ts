export const MOTORCYCLE_TABLE = "motorcycles";

export const MOTORCYCLE_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
} as const;

export const MOTORCYCLE_STATUS = {
  ACTIVE: "active",
  SOLD: "sold",
  ARCHIVED: "archived",
} as const;

export const MOTORCYCLE_BRANDS = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "Kawasaki",
  "Vespa",
  "KTM",
  "Ducati",
  "BMW",
  "Harley-Davidson",
  "Other",
] as const;

export const MOTORCYCLE_COPY = {
  GARAGE_TITLE: "Garage",
  GARAGE_SUBTITLE: "Your motorcycles identity starts here.",
  EMPTY_TITLE: "Your garage is empty",
  EMPTY_DESCRIPTION:
    "Add your first motorcycle and start building your digital rider identity.",
  ADD_BUTTON: "Add Motorcycle",
  LOAD_FAILED_TITLE: "Unable to load garage",
  LOAD_FAILED_MESSAGE: "Please try again.",

  ADD_SCREEN_TITLE: "Add Motorcycle",
  ADD_SCREEN_SUBTITLE:
    "Create your motorcycle identity inside your ProperRide garage.",
  BASIC_SECTION_TITLE: "Basic Information",
  BASIC_SECTION_DESCRIPTION: "Add the main information about your motorcycle.",
  DETAIL_SECTION_TITLE: "Motorcycle Details",
  DETAIL_SECTION_DESCRIPTION:
    "Optional details help other riders understand your build better.",
  SAVE_BUTTON: "Save Motorcycle",
  SAVE_FAILED_TITLE: "Unable to save motorcycle",
  SAVE_SUCCESS_TITLE: "Motorcycle added",
  SAVE_SUCCESS_MESSAGE: "Your motorcycle has been added to your garage.",

  FIELD_BRAND: "Brand",
  FIELD_MODEL: "Model",
  FIELD_VARIANT: "Variant",
  FIELD_YEAR: "Year",
  FIELD_COLOR: "Color",
  FIELD_ENGINE_CC: "Engine CC",
  FIELD_NICKNAME: "Nickname",
  FIELD_MILEAGE: "Mileage",
  FIELD_DESCRIPTION: "Description",

  PLACEHOLDER_BRAND: "Example: Yamaha",
  PLACEHOLDER_MODEL: "Example: NMAX",
  PLACEHOLDER_VARIANT: "Example: Connected ABS",
  PLACEHOLDER_YEAR: "Example: 2023",
  PLACEHOLDER_COLOR: "Example: Matte Black",
  PLACEHOLDER_ENGINE_CC: "Example: 155",
  PLACEHOLDER_NICKNAME: "Example: Black Mamba",
  PLACEHOLDER_MILEAGE: "Example: 12000",
  PLACEHOLDER_DESCRIPTION: "Tell the story of your motorcycle",

  VALIDATION_BRAND_REQUIRED: "Brand is required.",
  VALIDATION_MODEL_REQUIRED: "Model is required.",
  VALIDATION_YEAR_INVALID: "Year must be a valid number.",
  VALIDATION_ENGINE_CC_INVALID: "Engine CC must be a valid number.",
  VALIDATION_MILEAGE_INVALID: "Mileage must be a valid number.",

  DETAIL_LOAD_FAILED_TITLE: "Unable to load motorcycle",
  DETAIL_LOAD_FAILED_MESSAGE: "Please try again.",
  DETAIL_NOT_FOUND_TITLE: "Motorcycle not found",
  DETAIL_NOT_FOUND_DESCRIPTION:
    "This motorcycle may have been deleted or is no longer available.",

  DETAIL_EDIT_BUTTON: "Edit Motorcycle",
  DETAIL_OVERVIEW_TITLE: "Overview",
  DETAIL_SPECIFICATION_TITLE: "Specification",
  DETAIL_DESCRIPTION_TITLE: "Description",

  LABEL_BRAND: "Brand",
  LABEL_MODEL: "Model",
  LABEL_VARIANT: "Variant",
  LABEL_YEAR: "Year",
  LABEL_COLOR: "Color",
  LABEL_ENGINE_CC: "Engine CC",
  LABEL_MILEAGE: "Mileage",
  LABEL_STATUS: "Status",
  LABEL_VISIBILITY: "Visibility",
  LABEL_NICKNAME: "Nickname",

  EDIT_SCREEN_TITLE: "Edit Motorcycle",
  EDIT_SCREEN_SUBTITLE: "Update your motorcycle information.",
  UPDATE_BUTTON: "Update Motorcycle",
  UPDATE_FAILED_TITLE: "Unable to update motorcycle",
  UPDATE_SUCCESS_TITLE: "Motorcycle updated",
  UPDATE_SUCCESS_MESSAGE: "Your motorcycle has been updated.",

  DELETE_BUTTON: "Delete Motorcycle",
  DELETE_CONFIRM_TITLE: "Delete Motorcycle",
  DELETE_CONFIRM_MESSAGE:
    "Are you sure you want to delete this motorcycle? This action cannot be undone.",
  DELETE_FAILED_TITLE: "Unable to delete motorcycle",
  DELETE_FAILED_MESSAGE: "Please try again.",
  DELETE_SUCCESS_TITLE: "Motorcycle deleted",
  DELETE_SUCCESS_MESSAGE: "Motorcycle has been deleted from your garage.",

  IMAGE_SECTION_TITLE: "Motorcycle Photo",
  IMAGE_SECTION_DESCRIPTION:
    "Upload a hero photo that represents your motorcycle.",
  FIELD_HERO_IMAGE: "Hero Image",
  PLACEHOLDER_HERO_IMAGE: "Tap to choose motorcycle photo",
  IMAGE_PERMISSION_TITLE: "Permission required",
  IMAGE_PERMISSION_MESSAGE:
    "Please allow photo access to choose motorcycle image.",
  IMAGE_PICK_FAILED_TITLE: "Unable to choose image",
  IMAGE_UPLOAD_FAILED_TITLE: "Unable to upload image",

  EMPTY_VALUE: "-",
} as const;

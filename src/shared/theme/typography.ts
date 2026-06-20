export const fontFamily = {
  headingRegular: "PlusJakartaSans-Regular",
  headingMedium: "PlusJakartaSans-Medium",
  headingSemiBold: "PlusJakartaSans-SemiBold",
  headingBold: "PlusJakartaSans-Bold",
  headingExtraBold: "PlusJakartaSans-ExtraBold",

  bodyRegular: "Inter-Regular",
  bodyMedium: "Inter-Medium",
  bodySemiBold: "Inter-SemiBold",
  bodyBold: "Inter-Bold",
  bodyExtraBold: "Inter-ExtraBold",
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 22,
  "3xl": 28,
  "4xl": 34,
} as const;

export const lineHeight = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 22,
  xl: 24,
  "2xl": 28,
  "3xl": 34,
  "4xl": 40,
} as const;

export const typography = {
  heroTitle: {
    fontFamily: fontFamily.headingExtraBold,
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
  },

  screenTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
  },

  sectionTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
  },

  cardTitle: {
    fontFamily: fontFamily.headingSemiBold,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
  },

  body: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },

  bodyMedium: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
  },

  caption: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },

  badge: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
} as const;

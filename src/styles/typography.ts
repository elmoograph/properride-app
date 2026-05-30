export const fontFamily = {
  pjs: {
    regular: "PlusJakartaSans-Regular",
    medium: "PlusJakartaSans-Medium",
    semibold: "PlusJakartaSans-SemiBold",
    bold: "PlusJakartaSans-Bold",
    extrabold: "PlusJakartaSans-ExtraBold",
  },

  inter: {
    light: "Inter-Light",
    regular: "Inter-Regular",
    medium: "Inter-Medium",
    semibold: "Inter-SemiBold",
    bold: "Inter-Bold",
  },
};

export const fontSize = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
};

export const typography = {
  display: {
    hero: {
      fontFamily: fontFamily.pjs.extrabold,
      fontSize: fontSize["3xl"],
      lineHeight: 38,
      letterSpacing: -1,
    },

    title: {
      fontFamily: fontFamily.pjs.bold,
      fontSize: fontSize["2xl"],
      lineHeight: 30,
      letterSpacing: -0.5,
    },
  },

  heading: {
    xl: {
      fontFamily: fontFamily.pjs.bold,
      fontSize: fontSize.xl,
      lineHeight: 26,
    },

    lg: {
      fontFamily: fontFamily.pjs.semibold,
      fontSize: fontSize.lg,
      lineHeight: 24,
    },

    md: {
      fontFamily: fontFamily.pjs.semibold,
      fontSize: fontSize.md,
      lineHeight: 22,
    },
  },

  body: {
    lg: {
      fontFamily: fontFamily.inter.regular,
      fontSize: fontSize.md,
      lineHeight: 24,
    },

    md: {
      fontFamily: fontFamily.inter.regular,
      fontSize: fontSize.base,
      lineHeight: 22,
    },

    sm: {
      fontFamily: fontFamily.inter.regular,
      fontSize: fontSize.sm,
      lineHeight: 18,
    },
  },

  label: {
    lg: {
      fontFamily: fontFamily.pjs.medium,
      fontSize: fontSize.base,
      lineHeight: 18,
    },

    md: {
      fontFamily: fontFamily.pjs.medium,
      fontSize: fontSize.sm,
      lineHeight: 16,
    },

    sm: {
      fontFamily: fontFamily.pjs.medium,
      fontSize: fontSize.xs,
      lineHeight: 14,
    },
  },

  caption: {
    md: {
      fontFamily: fontFamily.inter.light,
      fontSize: fontSize.sm,
      lineHeight: 16,
    },

    sm: {
      fontFamily: fontFamily.inter.light,
      fontSize: fontSize.xs,
      lineHeight: 14,
    },
  },
};

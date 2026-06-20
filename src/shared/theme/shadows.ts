export const shadows = {
  none: {
    elevation: 0,
  },

  sm: {
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  md: {
    elevation: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  lg: {
    elevation: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.26,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
} as const;

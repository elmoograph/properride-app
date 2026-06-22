const { withNativeWind } = require("nativewind/metro");

module.exports = {
  expo: {
    name: "ProperRide",
    slug: "properride",
    scheme: "properride",
    version: "1.0.0",
    orientation: "portrait",
    platforms: ["android"],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#0D0D0D",
      },
      package: "com.properride.app",
    },
    plugins: ["expo-router", "expo-status-bar", "expo-video"],
  },
};

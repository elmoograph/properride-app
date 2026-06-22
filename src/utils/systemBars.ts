import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden, setStatusBarStyle } from "expo-status-bar";

export async function enableImmersiveMode(): Promise<void> {
  setStatusBarStyle("light");
  setStatusBarHidden(true, "none");

  if (Platform.OS !== "android") {
    return;
  }

  try {
    await NavigationBar.setVisibilityAsync("hidden");
  } catch (error) {
    console.warn("Unable to hide Android navigation bar:", error);
  }
}

export async function disableImmersiveMode(): Promise<void> {
  setStatusBarStyle("light");
  setStatusBarHidden(false, "none");

  if (Platform.OS !== "android") {
    return;
  }

  try {
    await NavigationBar.setVisibilityAsync("visible");
  } catch (error) {
    console.warn("Unable to show Android navigation bar:", error);
  }
}

import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden, setStatusBarStyle } from "expo-status-bar";

export async function enableImmersiveMode(): Promise<void> {
  setStatusBarHidden(true, "fade");
  setStatusBarStyle("light");

  if (Platform.OS !== "android") {
    return;
  }

  await NavigationBar.setVisibilityAsync("hidden");
}

export async function disableImmersiveMode(): Promise<void> {
  setStatusBarHidden(false, "fade");
  setStatusBarStyle("light");

  if (Platform.OS !== "android") {
    return;
  }

  await NavigationBar.setVisibilityAsync("visible");
}

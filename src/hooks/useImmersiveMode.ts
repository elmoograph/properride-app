import { useCallback, useEffect } from "react";
import { AppState, Platform } from "react-native";
import { usePathname } from "expo-router";

import { enableImmersiveMode } from "@/src/utils/systemBars";

export function useImmersiveMode(): void {
  const pathname = usePathname();

  const applyImmersiveMode = useCallback(() => {
    if (Platform.OS !== "android") {
      return;
    }

    void enableImmersiveMode();

    requestAnimationFrame(() => {
      void enableImmersiveMode();
    });

    setTimeout(() => {
      void enableImmersiveMode();
    }, 150);
  }, []);

  useEffect(() => {
    applyImmersiveMode();
  }, [pathname, applyImmersiveMode]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        applyImmersiveMode();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [applyImmersiveMode]);
}

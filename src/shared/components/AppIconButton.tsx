import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, radius, spacing } from "@/src/shared/theme";

type AppIconButtonVariant = "default" | "soft" | "brand";

type AppIconButtonProps = PressableProps & {
  icon: ReactNode;
  variant?: AppIconButtonVariant;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function AppIconButton({
  icon,
  variant = "default",
  size = 40,
  style,
  ...props
}: AppIconButtonProps) {
  const backgroundColor =
    variant === "brand"
      ? colors.brand.lime
      : variant === "soft"
        ? colors.surface.soft
        : "rgba(255,255,255,0.08)";

  return (
    <Pressable
      {...props}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.default,
  },
});

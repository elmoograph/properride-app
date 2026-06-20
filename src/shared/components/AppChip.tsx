import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, radius, spacing } from "@/src/shared/theme";
import { AppText } from "./AppText";

type AppChipVariant = "default" | "active" | "outline";

type AppChipProps = PressableProps & {
  label: string;
  variant?: AppChipVariant;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppChip({
  label,
  variant = "default",
  leftIcon,
  style,
  ...props
}: AppChipProps) {
  const isActive = variant === "active";
  const isOutline = variant === "outline";

  return (
    <Pressable
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: isActive
            ? colors.brand.lime
            : isOutline
              ? colors.transparent
              : colors.surface.soft,
          borderColor: isActive ? colors.brand.lime : colors.border.default,
        },
        style,
      ]}
    >
      {leftIcon}
      <AppText variant="badge" color={isActive ? "inverse" : "secondary"}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
});

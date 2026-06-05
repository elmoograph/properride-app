import { Text, TouchableOpacity } from "react-native";

import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { button } from "@/constants/button";
import { typography } from "@/styles/typography";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type Size = "sm" | "md" | "lg";

type Props = {
  title: string;

  variant?: Variant;

  size?: Size;

  onPress?: () => void;

  disabled?: boolean;
};

export function Button({
  title,
  variant = "primary",
  size = "md",
  onPress,
  disabled = false,
}: Props) {
  const backgroundColor = {
    primary: colors.primary,

    secondary: colors.surface,

    ghost: "transparent",

    danger: "transparent",
  }[variant];

  const textColor = {
    primary: colors.background,

    secondary: colors.textPrimary,

    ghost: colors.textSecondary,

    danger: colors.danger,
  }[variant];

  const borderColor = {
    primary: "transparent",

    secondary: colors.border,

    ghost: "transparent",

    danger: colors.danger,
  }[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={{
        height: button.height[size],

        borderRadius: radius.lg,

        paddingHorizontal: 20,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor,

        borderWidth: variant === "secondary" || variant === "danger" ? 1 : 0,

        borderColor,

        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Text
        style={{
          ...typography.button.md,

          color: textColor,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

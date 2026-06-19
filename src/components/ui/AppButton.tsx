import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type ViewStyle,
} from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";

type AppButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type AppButtonProps = PressableProps & {
  title: string;
  loading?: boolean;
  variant?: AppButtonVariant;
  fullWidth?: boolean;
};

export function AppButton({
  title,
  loading = false,
  variant = "primary",
  fullWidth = true,
  disabled,
  style,
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style as ViewStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor(variant)} />
      ) : (
        <Text style={[styles.text, { color: getTextColor(variant) }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

function getTextColor(variant: AppButtonVariant) {
  if (variant === "secondary") return colors.textPrimary;
  if (variant === "ghost") return colors.primary;

  return colors.white;
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 15,
  },
});

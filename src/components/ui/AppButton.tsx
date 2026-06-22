import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type AppButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type AppButtonTheme = "default" | "dark";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: AppButtonVariant;
  theme?: AppButtonTheme;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  theme = "default",
  style,
}: AppButtonProps) {
  const isDark = theme === "dark";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        stylesByVariant[variant],
        isDark ? darkStylesByVariant[variant] : null,
        pressed && !disabled && !loading ? styles.pressed : null,
        disabled || loading ? styles.disabled : null,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={
            isDark && variant === "primary"
              ? MOTORCYCLE_SHOWCASE_COLORS.background
              : colors.white
          }
        />
      ) : (
        <Text
          style={[
            styles.text,
            textStylesByVariant[variant],
            isDark ? darkTextStylesByVariant[variant] : null,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.86,
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 14,
  },
});

const stylesByVariant = StyleSheet.create({
  primary: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  secondary: {
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  ghost: {
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  danger: {
    borderColor: colors.danger,
    backgroundColor: colors.danger,
  },
});

const darkStylesByVariant = StyleSheet.create({
  primary: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  secondary: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  ghost: {
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  danger: {
    borderColor: colors.danger,
    backgroundColor: colors.danger,
  },
});

const textStylesByVariant = StyleSheet.create({
  primary: {
    color: colors.white,
  },
  secondary: {
    color: colors.textPrimary,
  },
  ghost: {
    color: colors.textPrimary,
  },
  danger: {
    color: colors.white,
  },
});

const darkTextStylesByVariant = StyleSheet.create({
  primary: {
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  secondary: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  ghost: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  danger: {
    color: colors.white,
  },
});

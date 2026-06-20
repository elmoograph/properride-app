import type { ReactNode } from "react";
import { Text, type TextProps, StyleSheet } from "react-native";

import { colors, typography } from "@/src/shared/theme";

type AppTextVariant =
  | "heroTitle"
  | "screenTitle"
  | "sectionTitle"
  | "cardTitle"
  | "body"
  | "bodyMedium"
  | "caption"
  | "badge";

type AppTextColor = "primary" | "secondary" | "muted" | "inverse" | "brand";

type AppTextProps = TextProps & {
  children: ReactNode;
  variant?: AppTextVariant;
  color?: AppTextColor;
};

const colorMap: Record<AppTextColor, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  muted: colors.text.muted,
  inverse: colors.text.inverse,
  brand: colors.brand.lime,
};

export function AppText({
  children,
  variant = "body",
  color = "primary",
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        typography[variant],
        {
          color: colorMap[color],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});

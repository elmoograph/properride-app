import type { ReactNode } from "react";
import {
  View,
  type ViewProps,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, radius, spacing } from "@/src/shared/theme";

type AppCardVariant = "default" | "soft" | "elevated";

type AppCardProps = ViewProps & {
  children: ReactNode;
  variant?: AppCardVariant;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
};

const backgroundMap: Record<AppCardVariant, string> = {
  default: colors.surface.default,
  soft: colors.surface.soft,
  elevated: colors.surface.elevated,
};

export function AppCard({
  children,
  variant = "default",
  padded = true,
  style,
  ...props
}: AppCardProps) {
  return (
    <View
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: backgroundMap[variant],
          padding: padded ? spacing.lg : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
});

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type AppInputVariant = "default" | "dark";

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  variant?: AppInputVariant;
};

export function AppInput({
  variant = "default",
  label,
  error,
  style,
  multiline,
  ...props
}: AppInputProps) {
  const isDark = variant === "dark";

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[styles.label, isDark ? styles.labelDark : null]}>
          {label}
        </Text>
      ) : null}

      <TextInput
        {...props}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        placeholderTextColor={
          isDark ? MOTORCYCLE_SHOWCASE_COLORS.textMuted : colors.textMuted
        }
        style={[
          styles.input,
          isDark ? styles.inputDark : null,
          multiline ? styles.inputMultiline : null,
          error ? styles.inputError : null,
          style,
        ]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  labelDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontFamily: fontFamily.body.regular,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  inputDark: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    color: colors.danger,
  },
});

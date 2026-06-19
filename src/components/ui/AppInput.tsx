import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function AppInput({
  label,
  error,
  style,
  multiline,
  ...props
}: AppInputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        {...props}
        multiline={multiline}
        placeholderTextColor={colors.textMuted}
        textAlignVertical={multiline ? "top" : "center"}
        style={[
          styles.input,
          multiline && styles.textArea,
          error && styles.inputError,
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
  textArea: {
    height: 120,
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

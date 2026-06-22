import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ImagePlus } from "lucide-react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type ImagePickerBoxVariant = "default" | "dark";

type ImagePickerBoxProps = {
  variant?: ImagePickerBoxVariant;
  imageUri?: string | null;
  title?: string;
  description?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onPress: () => void | Promise<void>;
};

export function ImagePickerBox({
  variant = "default",
  imageUri,
  title,
  description,
  label,
  placeholder,
  disabled = false,
  onPress,
}: ImagePickerBoxProps) {
  const isDark = variant === "dark";

  const displayTitle = title || label || "Add image";
  const displayDescription =
    description || placeholder || "Upload a clear photo for this showcase.";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isDark ? styles.containerDark : null,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={[styles.iconBox, isDark ? styles.iconBoxDark : null]}>
            <ImagePlus
              size={24}
              color={
                isDark
                  ? MOTORCYCLE_SHOWCASE_COLORS.background
                  : colors.textPrimary
              }
            />
          </View>

          <Text style={[styles.title, isDark ? styles.titleDark : null]}>
            {displayTitle}
          </Text>

          <Text
            style={[styles.description, isDark ? styles.descriptionDark : null]}
          >
            {displayDescription}
          </Text>
        </View>
      )}

      {imageUri ? (
        <View style={styles.overlay}>
          <View
            style={[
              styles.changeButton,
              isDark ? styles.changeButtonDark : null,
            ]}
          >
            <ImagePlus size={16} color={colors.white} />
            <Text style={styles.changeButtonText}>Change Photo</Text>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  containerDark: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  pressed: {
    opacity: 0.86,
  },
  disabled: {
    opacity: 0.6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  iconBox: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    backgroundColor: colors.black,
  },
  iconBoxDark: {
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  title: {
    marginTop: spacing.md,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: "center",
  },
  titleDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  description: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
  },
  descriptionDark: {
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  overlay: {
    position: "absolute",
    right: spacing.md,
    bottom: spacing.md,
  },
  changeButton: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.62)",
  },
  changeButtonDark: {
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },
  changeButtonText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: colors.white,
  },
});

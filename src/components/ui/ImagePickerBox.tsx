import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ImagePlus } from "lucide-react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";

type ImagePickerBoxProps = {
  label?: string;
  imageUri?: string | null;
  placeholder: string;
  onPress: () => void;
};

export function ImagePickerBox({
  label,
  imageUri,
  placeholder,
  onPress,
}: ImagePickerBoxProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable style={styles.box} onPress={onPress}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <ImagePlus color={colors.textMuted} size={28} />
            <Text style={styles.placeholderText}>{placeholder}</Text>
          </View>
        )}
      </Pressable>
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
  box: {
    height: 180,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  placeholderText: {
    fontFamily: fontFamily.body.medium,
    fontSize: 14,
    color: colors.textSecondary,
  },
});

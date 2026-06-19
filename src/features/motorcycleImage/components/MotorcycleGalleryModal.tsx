import { Image, Modal, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { colors, fontFamily, spacing } from "@/src/theme";
import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import type { MotorcycleImage } from "@/src/features/motorcycleImage/types/motorcycleImage.types";

type MotorcycleGalleryModalProps = {
  visible: boolean;
  image: MotorcycleImage | null;
  deleting?: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export function MotorcycleGalleryModal({
  visible,
  image,
  deleting = false,
  onClose,
  onDelete,
}: MotorcycleGalleryModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {MOTORCYCLE_IMAGE_COPY.IMAGE_DETAIL_TITLE}
          </Text>
        </View>

        <View style={styles.imageWrapper}>
          {image ? (
            <Image
              source={{ uri: image.image_url }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : null}
        </View>

        <View style={styles.actions}>
          <AppButton
            title={MOTORCYCLE_IMAGE_COPY.DELETE_BUTTON}
            variant="danger"
            loading={deleting}
            onPress={onDelete}
          />

          <AppButton
            title={COMMON_COPY.BACK}
            variant="secondary"
            disabled={deleting}
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.black,
    padding: spacing.xl,
    justifyContent: "space-between",
  },
  header: {
    paddingTop: spacing.xl,
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 18,
    color: colors.white,
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
});

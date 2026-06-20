import type { ReactNode } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";

export type ActionSheetItemVariant = "default" | "danger";

export type ActionSheetItem = {
  label: string;
  icon?: ReactNode;
  variant?: ActionSheetItemVariant;
  onPress: () => void;
};

type ActionSheetModalProps = {
  visible: boolean;
  title: string;
  description?: string;
  items: ActionSheetItem[];
  cancelLabel: string;
  onClose: () => void;
};

export function ActionSheetModal({
  visible,
  title,
  description,
  items,
  cancelLabel,
  onClose,
}: ActionSheetModalProps) {
  function handlePressItem(item: ActionSheetItem) {
    onClose();
    item.onPress();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            {description ? (
              <Text style={styles.description}>{description}</Text>
            ) : null}
          </View>

          <View style={styles.items}>
            {items.map((item) => {
              const isDanger = item.variant === "danger";

              return (
                <Pressable
                  key={item.label}
                  style={styles.item}
                  onPress={() => handlePressItem(item)}
                >
                  {item.icon ? (
                    <View style={styles.icon}>{item.icon}</View>
                  ) : null}

                  <Text
                    style={[
                      styles.itemLabel,
                      isDanger && styles.itemLabelDanger,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>{cancelLabel}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    padding: spacing.xl,
    borderTopLeftRadius: radius["2xl"],
    borderTopRightRadius: radius["2xl"],
    backgroundColor: colors.white,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 20,
    color: colors.textPrimary,
  },
  description: {
    fontFamily: fontFamily.body.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  items: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  item: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  icon: {
    width: 24,
    alignItems: "center",
  },
  itemLabel: {
    flex: 1,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  itemLabelDanger: {
    color: colors.danger,
  },
  cancelButton: {
    marginTop: spacing.lg,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: colors.black,
  },
  cancelText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 15,
    color: colors.white,
  },
});

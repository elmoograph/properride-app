import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Check, X } from "lucide-react-native";

import { spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

type MotorcycleSwitcherModalProps = {
  visible: boolean;
  motorcycles: Motorcycle[];
  activeMotorcycleId: string;
  onClose: () => void;
  onSelectMotorcycle: (motorcycleId: string) => void;
};

function getMotorcycleTitle(motorcycle: Motorcycle): string {
  const brand = motorcycle.brand?.trim();
  const model = motorcycle.model?.trim();
  const variant = motorcycle.variant?.trim();

  return (
    [brand, model, variant].filter(Boolean).join(" ") || "Unknown Motorcycle"
  );
}

function getMotorcycleSubtitle(motorcycle: Motorcycle): string {
  const year = motorcycle.year ? String(motorcycle.year) : null;
  const engine = motorcycle.engine_cc ? `${motorcycle.engine_cc} cc` : null;
  const nickname = motorcycle.nickname?.trim() || null;

  return [nickname, year, engine].filter(Boolean).join(" • ");
}

export function MotorcycleSwitcherModal({
  visible,
  motorcycles,
  activeMotorcycleId,
  onClose,
  onSelectMotorcycle,
}: MotorcycleSwitcherModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Switch Motorcycle</Text>
              <Text style={styles.description}>
                Choose another build from this garage.
              </Text>
            </View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
            </Pressable>
          </View>

          <View style={styles.list}>
            {motorcycles.map((motorcycle) => {
              const isActive = motorcycle.id === activeMotorcycleId;

              return (
                <Pressable
                  key={motorcycle.id}
                  style={[styles.item, isActive ? styles.itemActive : null]}
                  onPress={() => onSelectMotorcycle(motorcycle.id)}
                >
                  {motorcycle.hero_image_url ? (
                    <Image
                      source={{ uri: motorcycle.hero_image_url }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.thumbnailPlaceholder}>
                      <Text style={styles.thumbnailText}>
                        {motorcycle.brand?.charAt(0)?.toUpperCase() || "M"}
                      </Text>
                    </View>
                  )}

                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {getMotorcycleTitle(motorcycle)}
                    </Text>

                    <Text style={styles.itemSubtitle} numberOfLines={1}>
                      {getMotorcycleSubtitle(motorcycle)}
                    </Text>
                  </View>

                  {isActive ? (
                    <View style={styles.activeIcon}>
                      <Check
                        size={16}
                        color={MOTORCYCLE_SHOWCASE_COLORS.background}
                      />
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.68)",
  },
  sheet: {
    padding: spacing.xl,
    paddingBottom: spacing["3xl"],
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  description: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  closeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  list: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  item: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  itemActive: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
  thumbnailPlaceholder: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  thumbnailText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  itemSubtitle: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  activeIcon: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
});

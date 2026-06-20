import { Image, Pressable, StyleSheet, View } from "react-native";
import { Tag } from "lucide-react-native";

import { AppText } from "@/src/shared/components";
import { colors, radius, spacing } from "@/src/shared/theme";
import { formatCurrency } from "@/src/shared/utils/formatCurrency";

import type { GaragePart } from "../types/garage.types";

type PartListItemProps = {
  part: GaragePart;
  onPress?: (part: GaragePart) => void;
  onProductPress?: (part: GaragePart) => void;
};

export function PartListItem({
  part,
  onPress,
  onProductPress,
}: PartListItemProps) {
  const priceLabel = part.price ? formatCurrency(part.price) : undefined;

  return (
    <Pressable onPress={() => onPress?.(part)} style={styles.container}>
      <View style={styles.activeDot} />

      <Image
        source={{ uri: part.imageUrl }}
        resizeMode="cover"
        style={styles.thumbnail}
      />

      <View style={styles.content}>
        <AppText variant="cardTitle" numberOfLines={1}>
          {part.name}
        </AppText>

        <View style={styles.metaRow}>
          <AppText variant="caption" color="secondary" numberOfLines={1}>
            {part.brand}
          </AppText>

          <View style={styles.metaDot} />

          <AppText variant="caption" color="brand" numberOfLines={1}>
            {part.categoryLabel}
          </AppText>
        </View>

        <AppText variant="caption" color="muted" numberOfLines={1}>
          {part.area}
        </AppText>
      </View>

      <View style={styles.rightContent}>
        {priceLabel ? (
          <AppText variant="caption" color="secondary" numberOfLines={1}>
            {priceLabel}
          </AppText>
        ) : null}

        <Pressable
          onPress={() => onProductPress?.(part)}
          hitSlop={8}
          style={styles.tagButton}
        >
          <Tag size={16} color={colors.brand.lime} strokeWidth={2.4} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.brand.lime,
  },
  thumbnail: {
    width: 58,
    height: 58,
    borderRadius: radius.md,
    backgroundColor: colors.surface.soft,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.text.muted,
  },
  rightContent: {
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  tagButton: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: colors.brand.limeSubtle,
    borderWidth: 1,
    borderColor: colors.brand.limeSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});

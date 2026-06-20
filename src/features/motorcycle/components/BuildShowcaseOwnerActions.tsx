import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ImagePlus, MoreHorizontal, Pencil, Wrench } from "lucide-react-native";

import { spacing } from "@/src/theme";
import {
  MOTORCYCLE_SHOWCASE_COLORS,
  MOTORCYCLE_SHOWCASE_COPY,
} from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type BuildShowcaseOwnerActionsProps = {
  onPressEditBuild: () => void;
  onPressAddPart: () => void;
  onPressAddGallery: () => void;
  onPressMore?: () => void;
};

export function BuildShowcaseOwnerActions({
  onPressEditBuild,
  onPressAddPart,
  onPressAddGallery,
  onPressMore,
}: BuildShowcaseOwnerActionsProps) {
  return (
    <View style={styles.container}>
      <OwnerActionButton
        label={MOTORCYCLE_SHOWCASE_COPY.OWNER_ACTION_EDIT_BUILD}
        icon={
          <Pencil size={16} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        }
        onPress={onPressEditBuild}
      />

      <OwnerActionButton
        label={MOTORCYCLE_SHOWCASE_COPY.OWNER_ACTION_ADD_PART}
        icon={
          <Wrench size={16} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        }
        onPress={onPressAddPart}
      />

      <OwnerActionButton
        label={MOTORCYCLE_SHOWCASE_COPY.OWNER_ACTION_ADD_GALLERY}
        icon={
          <ImagePlus size={16} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        }
        onPress={onPressAddGallery}
      />

      <OwnerActionButton
        label={MOTORCYCLE_SHOWCASE_COPY.OWNER_ACTION_MORE}
        icon={
          <MoreHorizontal
            size={16}
            color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
          />
        }
        onPress={onPressMore}
      />
    </View>
  );
}

type OwnerActionButtonProps = {
  label: string;
  icon: ReactNode;
  onPress?: () => void;
};

function OwnerActionButton({ label, icon, onPress }: OwnerActionButtonProps) {
  return (
    <Pressable style={styles.action} onPress={onPress}>
      <View style={styles.iconBox}>{icon}</View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing["2xl"],
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  action: {
    flex: 1,
    minHeight: 72,
    padding: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
});

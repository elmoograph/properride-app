import { StyleSheet, View } from "react-native";
import { Image, Settings, Wallet } from "lucide-react-native";

import { AppText } from "@/src/shared/components";
import { colors, radius, spacing } from "@/src/shared/theme";

import type { GarageSummaryItem as GarageSummaryItemType } from "../types/garage.types";

type GarageSummaryItemProps = {
  item: GarageSummaryItemType;
};

function getSummaryIcon(icon: GarageSummaryItemType["icon"]) {
  const iconProps = {
    size: 18,
    color: colors.brand.lime,
    strokeWidth: 2.4,
  };

  switch (icon) {
    case "wallet":
      return <Wallet {...iconProps} />;
    case "image":
      return <Image {...iconProps} />;
    case "settings":
    case "calendar":
    default:
      return <Settings {...iconProps} />;
  }
}

export function GarageSummaryItem({ item }: GarageSummaryItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>{getSummaryIcon(item.icon)}</View>

      <View style={styles.content}>
        <AppText variant="caption" color="secondary">
          {item.label}
        </AppText>
        <AppText variant="sectionTitle" color="brand" numberOfLines={1}>
          {item.value}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.lg,
    backgroundColor: colors.brand.limeSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
});

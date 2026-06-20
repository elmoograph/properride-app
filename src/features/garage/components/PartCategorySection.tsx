import { Pressable, StyleSheet, View } from "react-native";
import {
  ChevronDown,
  Gauge,
  Settings,
  Shield,
  SlidersHorizontal,
} from "lucide-react-native";

import { AppCard, AppText } from "@/src/shared/components";
import { colors, spacing } from "@/src/shared/theme";

import { GARAGE_COPY } from "../constants/garage.copy";
import { GARAGE_PART_PREVIEW_LIMIT } from "../constants/garage.constants";
import type {
  GaragePart,
  GaragePartCategoryKey,
  GaragePartSection,
} from "../types/garage.types";
import { PartListItem } from "./PartListItem";

type PartCategorySectionProps = {
  section: GaragePartSection;
  onPartPress?: (part: GaragePart) => void;
  onProductPress?: (part: GaragePart) => void;
  onShowMorePress?: (section: GaragePartSection) => void;
};

function getCategoryIcon(category: GaragePartCategoryKey) {
  const iconProps = {
    size: 18,
    color: colors.brand.lime,
    strokeWidth: 2.3,
  };

  switch (category) {
    case "cockpit":
      return <Gauge {...iconProps} />;
    case "suspension":
      return <SlidersHorizontal {...iconProps} />;
    case "exterior":
      return <Shield {...iconProps} />;
    case "engine":
    case "brake":
    case "wheel":
    case "cvt":
    case "other":
    default:
      return <Settings {...iconProps} />;
  }
}

export function PartCategorySection({
  section,
  onPartPress,
  onProductPress,
  onShowMorePress,
}: PartCategorySectionProps) {
  const visibleParts = section.parts.slice(0, GARAGE_PART_PREVIEW_LIMIT);
  const hasMore = section.parts.length > GARAGE_PART_PREVIEW_LIMIT;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerDot} />
          {getCategoryIcon(section.category)}
          <AppText variant="sectionTitle">{section.title}</AppText>
        </View>

        <ChevronDown
          size={18}
          color={colors.text.secondary}
          strokeWidth={2.4}
        />
      </View>

      <AppCard style={styles.card}>
        {visibleParts.map((part, index) => (
          <View key={part.id}>
            <PartListItem
              part={part}
              onPress={onPartPress}
              onProductPress={onProductPress}
            />

            {index < visibleParts.length - 1 ? (
              <View style={styles.divider} />
            ) : null}
          </View>
        ))}

        {hasMore ? (
          <Pressable
            onPress={() => onShowMorePress?.(section)}
            style={styles.showMoreButton}
          >
            <AppText variant="bodyMedium" color="brand">
              {GARAGE_COPY.setup.showMore}
            </AppText>
            <ChevronDown
              size={16}
              color={colors.brand.lime}
              strokeWidth={2.4}
            />
          </Pressable>
        ) : null}
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    paddingHorizontal: spacing.screenX,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.brand.lime,
  },
  card: {
    marginHorizontal: spacing.screenX,
    paddingVertical: spacing.sm,
  },
  divider: {
    height: 1,
    marginLeft: 78,
    backgroundColor: colors.border.subtle,
  },
  showMoreButton: {
    minHeight: 42,
    borderTopWidth: 1,
    borderTopColor: colors.border.subtle,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
});

import { StyleSheet, View } from "react-native";

import { AppText } from "@/src/shared/components";
import { spacing } from "@/src/shared/theme";

import { GARAGE_COPY } from "../constants/garage.copy";
import type { GaragePart, GaragePartSection } from "../types/garage.types";
import { PartCategorySection } from "./PartCategorySection";

type GarageSetupTabProps = {
  sections: GaragePartSection[];
  onPartPress?: (part: GaragePart) => void;
  onProductPress?: (part: GaragePart) => void;
  onShowMorePress?: (section: GaragePartSection) => void;
};

export function GarageSetupTab({
  sections,
  onPartPress,
  onProductPress,
  onShowMorePress,
}: GarageSetupTabProps) {
  if (sections.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AppText variant="sectionTitle">{GARAGE_COPY.setup.emptyTitle}</AppText>
        <AppText
          variant="body"
          color="secondary"
          style={styles.emptyDescription}
        >
          {GARAGE_COPY.setup.emptyDescription}
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <PartCategorySection
          key={section.id}
          section={section}
          onPartPress={onPartPress}
          onProductPress={onProductPress}
          onShowMorePress={onShowMorePress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["2xl"],
    marginTop: spacing["2xl"],
  },
  emptyContainer: {
    marginHorizontal: spacing.screenX,
    marginTop: spacing["3xl"],
  },
  emptyDescription: {
    marginTop: spacing.sm,
  },
});

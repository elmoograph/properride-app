import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "@/src/theme";
import { PartCard } from "@/src/features/part/components/PartCard";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";

type PartCategoryGroupSectionProps = {
  category: string;
  parts: Part[];
  onPressPart: (partId: string) => void;
};

export function PartCategoryGroupSection({
  category,
  parts,
  onPressPart,
}: PartCategoryGroupSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{category}</Text>

        <Text style={styles.count}>
          {parts.length} {PART_COPY.GROUP_TITLE_SUFFIX}
        </Text>
      </View>

      <View style={styles.list}>
        {parts.map((part) => (
          <PartCard
            key={part.id}
            part={part}
            onPress={() => onPressPart(part.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  count: {
    fontFamily: fontFamily.body.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  list: {
    gap: spacing.md,
  },
});

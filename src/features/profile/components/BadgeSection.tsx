import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { badgesData } from "../data/badges.data";

import { BadgeCard } from "./BadgeCard";

export function BadgeSection() {
  const unlockedBadges = badgesData.filter((badge) => badge.unlocked).length;

  return (
    <View
      style={{
        marginTop: spacing.xl,

        paddingHorizontal: spacing.screen,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          ...typography.heading.lg,

          color: colors.textPrimary,
        }}
      >
        Badges
        <Text
          style={{
            color: colors.primary,
          }}
        >
          ({unlockedBadges}/{badgesData.length})
        </Text>
      </Text>

      {/* GRID */}
      <View
        style={{
          marginTop: spacing.lg,

          flexDirection: "row",
          flexWrap: "wrap",

          gap: spacing.sm,
        }}
      >
        {badgesData.map((badge) => (
          <BadgeCard
            key={badge.id}
            title={badge.title}
            icon={badge.icon}
            unlocked={badge.unlocked}
          />
        ))}
      </View>
    </View>
  );
}

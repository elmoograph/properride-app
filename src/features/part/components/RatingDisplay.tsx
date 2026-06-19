import { StyleSheet, Text, View } from "react-native";
import { Star } from "lucide-react-native";

import { colors, fontFamily, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";

type RatingDisplayProps = {
  rating?: number | null;
};

const MAX_RATING = 5;

export function RatingDisplay({ rating }: RatingDisplayProps) {
  if (!rating) {
    return <Text style={styles.empty}>{PART_COPY.RATING_NO_VALUE}</Text>;
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: MAX_RATING }).map((_, index) => {
        const starNumber = index + 1;
        const isActive = starNumber <= rating;

        return (
          <Star
            key={starNumber}
            size={16}
            color={isActive ? colors.warning : colors.textMuted}
            fill={isActive ? colors.warning : "transparent"}
          />
        );
      })}

      <Text style={styles.value}>
        {rating}/{MAX_RATING}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  value: {
    marginLeft: spacing.xs,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  empty: {
    fontFamily: fontFamily.body.medium,
    fontSize: 13,
    color: colors.textMuted,
  },
});

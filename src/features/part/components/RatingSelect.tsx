import { Pressable, StyleSheet, Text, View } from "react-native";
import { Star } from "lucide-react-native";

import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";

type RatingSelectProps = {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

const RATING_OPTIONS = ["", "1", "2", "3", "4", "5"] as const;

export function RatingSelect({
  label,
  value,
  error,
  onChange,
}: RatingSelectProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {RATING_OPTIONS.map((rating) => {
          const isActive = rating === value;
          const isEmpty = rating === "";

          return (
            <Pressable
              key={rating || "empty"}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => onChange(rating)}
            >
              {isEmpty ? (
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {PART_COPY.RATING_EMPTY}
                </Text>
              ) : (
                <View style={styles.ratingContent}>
                  <Star
                    size={14}
                    color={isActive ? colors.white : colors.textSecondary}
                    fill={isActive ? colors.white : "transparent"}
                  />

                  <Text
                    style={[styles.chipText, isActive && styles.chipTextActive]}
                  >
                    {rating}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    marginBottom: spacing.sm,
    fontFamily: fontFamily.body.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  ratingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  chipText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  error: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    color: colors.danger,
  },
});

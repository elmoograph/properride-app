import { StyleSheet, Text, View } from "react-native";

import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type ProfileStatsProps = {
  buildCount: number;
  followerCount: number;
  followingCount: number;
};

type ProfileStatItemProps = {
  value: number;
  label: string;
};

function ProfileStatItem({ value, label }: ProfileStatItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.value}>{value}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export function ProfileStats({
  buildCount,
  followerCount,
  followingCount,
}: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <ProfileStatItem value={buildCount} label={PROFILE_COPY.BUILDS_LABEL} />

      <View style={styles.divider} />

      <ProfileStatItem
        value={followerCount}
        label={PROFILE_COPY.FOLLOWERS_LABEL}
      />

      <View style={styles.divider} />

      <ProfileStatItem
        value={followingCount}
        label={PROFILE_COPY.FOLLOWING_LABEL}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
  },
  value: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  label: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
});

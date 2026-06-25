import { StyleSheet, Text, View, Pressable } from "react-native";

import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type ProfileStatsProps = {
  buildCount: number;
  followerCount: number;
  followingCount: number;
  onPressBuilds?: () => void;
  onPressFollowers?: () => void;
  onPressFollowing?: () => void;
};

type ProfileStatItemProps = {
  value: number;
  label: string;
  onPress?: () => void;
};

function ProfileStatItem({ value, label, onPress }: ProfileStatItemProps) {
  const content = (
    <>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </>
  );

  if (!onPress) {
    return <View style={styles.item}>{content}</View>;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed ? styles.itemPressed : null,
      ]}
      onPress={onPress}
    >
      {content}
    </Pressable>
  );
}

export function ProfileStats({
  buildCount,
  followerCount,
  followingCount,
  onPressBuilds,
  onPressFollowers,
  onPressFollowing,
}: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <ProfileStatItem
        value={buildCount}
        label={PROFILE_COPY.BUILDS_LABEL}
        onPress={onPressBuilds}
      />

      <View style={styles.divider} />

      <ProfileStatItem
        value={followerCount}
        label={PROFILE_COPY.FOLLOWERS_LABEL}
        onPress={onPressFollowers}
      />

      <View style={styles.divider} />

      <ProfileStatItem
        value={followingCount}
        label={PROFILE_COPY.FOLLOWING_LABEL}
        onPress={onPressFollowing}
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
  itemPressed: {
    opacity: 0.68,
  },
});

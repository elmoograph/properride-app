import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronRight, UserRound } from "lucide-react-native";

import { AppButton } from "@/src/components/ui";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import type { FollowProfile } from "@/src/features/profile/types/follow.types";
import { radius, spacing } from "@/src/theme";

type RiderListItemProps = {
  profile: FollowProfile;
  isOwner: boolean;
  isFollowing: boolean;
  loading?: boolean;
  onPress: () => void;
  onFollow: () => void;
  onUnfollow: () => void;
};

export function RiderListItem({
  profile,
  isOwner,
  isFollowing,
  loading = false,
  onPress,
  onFollow,
  onUnfollow,
}: RiderListItemProps) {
  const fullName = profile.full_name?.trim() || "Rider ProperRide";

  const username = profile.username?.trim()
    ? `@${profile.username.trim()}`
    : "Username belum tersedia";

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.profileButton,
          pressed ? styles.pressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.avatarWrapper}>
          {profile.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarFallback}>
              <UserRound
                size={24}
                color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary}
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.fullName} numberOfLines={1}>
            {fullName}
          </Text>

          <Text style={styles.username} numberOfLines={1}>
            {username}
          </Text>

          {profile.bio?.trim() ? (
            <Text style={styles.bio} numberOfLines={1}>
              {profile.bio.trim()}
            </Text>
          ) : null}
        </View>

        <ChevronRight size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />
      </Pressable>

      {!isOwner ? (
        <View style={styles.action}>
          <AppButton
            theme="dark"
            variant={isFollowing ? "secondary" : "primary"}
            title={
              isFollowing
                ? PROFILE_COPY.FOLLOW_LIST.FOLLOWING_BUTTON
                : PROFILE_COPY.FOLLOW_LIST.FOLLOW_BUTTON
            }
            loading={loading}
            disabled={loading}
            onPress={isFollowing ? onUnfollow : onFollow}
            style={styles.followButton}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  pressed: {
    opacity: 0.78,
  },
  avatarWrapper: {
    width: 52,
    height: 52,
    overflow: "hidden",
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  fullName: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  username: {
    marginTop: 2,
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  bio: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  action: {
    alignItems: "flex-end",
  },
  followButton: {
    minWidth: 120,
    minHeight: 42,
  },
});

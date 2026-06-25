import { StyleSheet, View } from "react-native";

import { AppButton } from "@/src/components/ui";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { spacing } from "@/src/theme";

type PublicProfileActionsProps = {
  isOwner: boolean;
  isFollowing: boolean;
  loading?: boolean;
  onEditProfile: () => void;
  onFollow: () => void;
  onUnfollow: () => void;
};

export function PublicProfileActions({
  isOwner,
  isFollowing,
  loading = false,
  onEditProfile,
  onFollow,
  onUnfollow,
}: PublicProfileActionsProps) {
  if (isOwner) {
    return (
      <AppButton
        theme="dark"
        title={PROFILE_COPY.PUBLIC.EDIT_PROFILE_BUTTON}
        disabled={loading}
        onPress={onEditProfile}
      />
    );
  }

  return (
    <View style={styles.container}>
      <AppButton
        theme="dark"
        variant={isFollowing ? "secondary" : "primary"}
        title={
          isFollowing
            ? PROFILE_COPY.PUBLIC.FOLLOWING_BUTTON
            : PROFILE_COPY.PUBLIC.FOLLOW_BUTTON
        }
        loading={loading}
        disabled={loading}
        onPress={isFollowing ? onUnfollow : onFollow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});

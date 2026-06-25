import { Image, StyleSheet, Text, View } from "react-native";
import { MapPin } from "lucide-react-native";

import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import type { Profile } from "@/src/features/profile/types/profile.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type ProfileHeroProps = {
  profile: Profile | null;
};

function getProfileInitials(profile: Profile | null): string {
  const fullName = profile?.full_name?.trim();

  if (fullName) {
    return fullName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }

  const username = profile?.username?.trim();

  if (username) {
    return username.charAt(0).toUpperCase();
  }

  return "R";
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const fullName = profile?.full_name?.trim() || PROFILE_COPY.FULL_NAME_EMPTY;

  const username = profile?.username?.trim()
    ? `@${profile.username.trim()}`
    : PROFILE_COPY.USERNAME_EMPTY;

  const bio = profile?.bio?.trim() || PROFILE_COPY.BIO_EMPTY;

  const location = profile?.location?.trim() || PROFILE_COPY.LOCATION_EMPTY;

  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        {profile?.cover_url ? (
          <Image
            source={{ uri: profile.cover_url }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.coverFallback} />
        )}

        <View style={styles.coverOverlay} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarWrapper}>
          {profile?.avatar_url ? (
            <Image
              source={{ uri: profile.avatar_url }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitials}>
                {getProfileInitials(profile)}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.fullName}>{fullName}</Text>

        <Text style={styles.username}>{username}</Text>

        <Text style={styles.bio}>{bio}</Text>

        <View style={styles.locationRow}>
          <MapPin size={15} color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary} />

          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  cover: {
    height: 132,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverFallback: {
    flex: 1,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  coverOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  avatarWrapper: {
    width: 88,
    height: 88,
    marginTop: -44,
    padding: 3,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  avatarFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.background,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  avatarInitials: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 26,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  fullName: {
    marginTop: spacing.md,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
    textAlign: "center",
  },
  username: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  bio: {
    marginTop: spacing.md,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
    textAlign: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  location: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
});

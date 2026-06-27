import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronRight, MapPin, UserRound } from "lucide-react-native";

import { SEARCH_COPY } from "@/src/features/search/constants/search.constants";
import type { SearchProfileResult } from "@/src/features/search/types/search.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type SearchProfileResultCardProps = {
  profile: SearchProfileResult;
  onPress: () => void;
};

function getDisplayName(profile: SearchProfileResult): string {
  return profile.full_name?.trim() || "Rider ProperRide";
}

function getUsername(profile: SearchProfileResult): string {
  return profile.username?.trim()
    ? `@${profile.username.trim()}`
    : "Username belum tersedia";
}

export function SearchProfileResultCard({
  profile,
  onPress,
}: SearchProfileResultCardProps) {
  const location = profile.location?.trim();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
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
              size={22}
              color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary}
            />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>{SEARCH_COPY.RIDER_RESULT_LABEL}</Text>

        <Text style={styles.name} numberOfLines={1}>
          {getDisplayName(profile)}
        </Text>

        <Text style={styles.username} numberOfLines={1}>
          {getUsername(profile)}
        </Text>

        {profile.bio?.trim() ? (
          <Text style={styles.bio} numberOfLines={2}>
            {profile.bio.trim()}
          </Text>
        ) : null}

        {location ? (
          <View style={styles.locationRow}>
            <MapPin size={13} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />

            <Text style={styles.location} numberOfLines={1}>
              {location}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.openButton}>
        <ChevronRight size={18} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 112,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  avatarWrapper: {
    width: 58,
    height: 58,
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
  eyebrow: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  name: {
    marginTop: 2,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 15,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  username: {
    marginTop: 2,
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  bio: {
    marginTop: spacing.sm,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 17,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  location: {
    flex: 1,
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  openButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  pressed: {
    opacity: 0.82,
  },
});

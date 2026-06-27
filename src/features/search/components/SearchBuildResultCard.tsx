import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  ChevronRight,
  Heart,
  ImageIcon,
  Package,
  UserRound,
} from "lucide-react-native";

import { SEARCH_COPY } from "@/src/features/search/constants/search.constants";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_STATUS } from "@/src/features/motorcycle/constants/motorcycle.constants";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type SearchBuildResultCardProps = {
  build: FeedBuild;
  onPressBuild: () => void;
  onPressOwner: () => void;
};

function getBuildTitle(build: FeedBuild): string {
  return (
    build.nickname?.trim() ||
    [build.brand, build.model, build.variant].filter(Boolean).join(" ")
  );
}

function getOwnerName(build: FeedBuild): string {
  return build.owner_full_name?.trim() || "Rider ProperRide";
}

function getStatusLabel(status: FeedBuild["status"]): string {
  switch (status) {
    case MOTORCYCLE_STATUS.SOLD:
      return "Sold";

    case MOTORCYCLE_STATUS.ARCHIVED:
      return "Archived";

    case MOTORCYCLE_STATUS.ACTIVE:
    default:
      return "Active";
  }
}

export function SearchBuildResultCard({
  build,
  onPressBuild,
  onPressOwner,
}: SearchBuildResultCardProps) {
  const title = getBuildTitle(build);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={onPressBuild}
        style={({ pressed }) => [
          styles.buildButton,
          pressed ? styles.pressed : null,
        ]}
      >
        <View style={styles.imageWrapper}>
          {build.hero_image_url ? (
            <Image
              source={{ uri: build.hero_image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imageFallback}>
              <ImageIcon
                size={28}
                color={MOTORCYCLE_SHOWCASE_COLORS.textMuted}
              />
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.eyebrow}>{SEARCH_COPY.BUILD_RESULT_LABEL}</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {getStatusLabel(build.status)}
              </Text>
            </View>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.subtitle} numberOfLines={1}>
            {[build.brand, build.model, build.variant]
              .filter(Boolean)
              .join(" ")}
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={onPressOwner}
            style={({ pressed }) => [
              styles.ownerRow,
              pressed ? styles.pressed : null,
            ]}
          >
            {build.owner_avatar_url ? (
              <Image
                source={{ uri: build.owner_avatar_url }}
                style={styles.ownerAvatar}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.ownerAvatarFallback}>
                <UserRound
                  size={13}
                  color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary}
                />
              </View>
            )}

            <Text style={styles.ownerName} numberOfLines={1}>
              {getOwnerName(build)}
            </Text>
          </Pressable>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Package size={14} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
              <Text style={styles.statText}>{build.part_count}</Text>
            </View>

            <View style={styles.statItem}>
              <ImageIcon size={14} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
              <Text style={styles.statText}>{build.gallery_media_count}</Text>
            </View>

            <View style={styles.statItem}>
              <Heart size={14} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
              <Text style={styles.statText}>{build.like_count}</Text>
            </View>

            <View style={styles.openButton}>
              <ChevronRight
                size={16}
                color={MOTORCYCLE_SHOWCASE_COLORS.background}
              />
            </View>
          </View>
        </View>
      </Pressable>
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
  buildButton: {
    flexDirection: "row",
    minHeight: 156,
  },
  imageWrapper: {
    width: 118,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  eyebrow: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  statusText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  title: {
    marginTop: spacing.sm,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    lineHeight: 21,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  ownerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  ownerAvatar: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
  },
  ownerAvatarFallback: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  ownerName: {
    flex: 1,
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: "auto",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  openButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  pressed: {
    opacity: 0.82,
  },
});

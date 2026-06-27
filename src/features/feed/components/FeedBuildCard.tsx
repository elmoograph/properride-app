import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  ChevronRight,
  ImageIcon,
  Package,
  UserRound,
  Bookmark,
} from "lucide-react-native";

import { FEED_COPY } from "@/src/features/feed/constants/feed.constants";
import type { FeedBuild } from "@/src/features/feed/types/feed.types";
import { MOTORCYCLE_STATUS } from "@/src/features/motorcycle/constants/motorcycle.constants";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type FeedBuildCardProps = {
  build: FeedBuild;
  saved: boolean;
  saving?: boolean;
  onPressBuild: () => void;
  onPressOwner: () => void;
  onPressSave: () => void;
};

function getBuildTitle(build: FeedBuild): string {
  const nickname = build.nickname?.trim();

  if (nickname) {
    return nickname;
  }

  return [build.brand, build.model, build.variant].filter(Boolean).join(" ");
}

function getBuildSubtitle(build: FeedBuild): string {
  return [build.brand, build.model, build.variant].filter(Boolean).join(" ");
}

function getOwnerName(build: FeedBuild): string {
  return build.owner_full_name?.trim() || "Rider ProperRide";
}

function getOwnerUsername(build: FeedBuild): string {
  return build.owner_username?.trim()
    ? `@${build.owner_username.trim()}`
    : "Username belum tersedia";
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

export function FeedBuildCard({
  build,
  saved,
  saving = false,
  onPressBuild,
  onPressOwner,
  onPressSave,
}: FeedBuildCardProps) {
  const title = getBuildTitle(build);
  const subtitle = getBuildSubtitle(build);
  const ownerName = getOwnerName(build);
  const ownerUsername = getOwnerUsername(build);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.ownerRow,
          pressed ? styles.pressed : null,
        ]}
        onPress={onPressOwner}
      >
        <View style={styles.avatarWrapper}>
          {build.owner_avatar_url ? (
            <Image
              source={{ uri: build.owner_avatar_url }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarFallback}>
              <UserRound
                size={20}
                color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary}
              />
            </View>
          )}
        </View>

        <View style={styles.ownerContent}>
          <Text style={styles.ownerLabel}>{FEED_COPY.BUILD_BY_LABEL}</Text>

          <Text style={styles.ownerName} numberOfLines={1}>
            {ownerName}
          </Text>

          <Text style={styles.ownerUsername} numberOfLines={1}>
            {ownerUsername}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={saved ? "Hapus simpanan Build" : "Simpan Build"}
          disabled={saving}
          onPress={onPressSave}
          style={({ pressed }) => [
            styles.saveButton,
            saved ? styles.saveButtonActive : null,
            pressed && !saving ? styles.pressed : null,
            saving ? styles.saveButtonDisabled : null,
          ]}
        >
          <Bookmark
            size={18}
            color={
              saved
                ? MOTORCYCLE_SHOWCASE_COLORS.background
                : MOTORCYCLE_SHOWCASE_COLORS.accent
            }
            fill={saved ? MOTORCYCLE_SHOWCASE_COLORS.background : "transparent"}
          />
        </Pressable>
        <ChevronRight size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.buildButton,
          pressed ? styles.pressed : null,
        ]}
        onPress={onPressBuild}
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
                size={32}
                color={MOTORCYCLE_SHOWCASE_COLORS.textMuted}
              />

              <Text style={styles.imageFallbackText}>
                Foto Build belum tersedia
              </Text>
            </View>
          )}

          <View style={styles.imageOverlay} />

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {getStatusLabel(build.status)}
            </Text>
          </View>

          <View style={styles.imageContent}>
            <Text style={styles.brand} numberOfLines={1}>
              {build.brand}
            </Text>

            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>

            {build.year ? <Text style={styles.year}>{build.year}</Text> : null}
          </View>
        </View>

        <View style={styles.detailContent}>
          {subtitle !== title ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}

          {build.description?.trim() ? (
            <Text style={styles.description} numberOfLines={2}>
              {build.description.trim()}
            </Text>
          ) : null}

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Package size={16} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />

              <Text style={styles.statValue}>{build.part_count}</Text>

              <Text style={styles.statLabel}>{FEED_COPY.PARTS_LABEL}</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <ImageIcon size={16} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />

              <Text style={styles.statValue}>{build.gallery_media_count}</Text>

              <Text style={styles.statLabel}>{FEED_COPY.GALLERY_LABEL}</Text>
            </View>

            <View style={styles.openBuild}>
              <Text style={styles.openBuildText}>Lihat Build</Text>

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
  pressed: {
    opacity: 0.82,
  },
  ownerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
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
  ownerContent: {
    flex: 1,
  },
  ownerLabel: {
    fontFamily: "Inter-Medium",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  ownerName: {
    marginTop: 2,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  ownerUsername: {
    marginTop: 2,
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  buildButton: {
    borderTopWidth: 1,
    borderTopColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
  imageWrapper: {
    height: 250,
    position: "relative",
    overflow: "hidden",
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
    gap: spacing.sm,
  },
  imageFallbackText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.26)",
  },
  statusBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  statusText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  imageContent: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    left: spacing.lg,
  },
  brand: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  title: {
    marginTop: spacing.xs,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 22,
    lineHeight: 28,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  year: {
    marginTop: spacing.sm,
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  detailContent: {
    padding: spacing.lg,
  },
  subtitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  description: {
    marginTop: spacing.sm,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  statsRow: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  statValue: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  statLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 18,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
  openBuild: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginLeft: "auto",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  openBuildText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  saveButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: "transparent",
  },
  saveButtonActive: {
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  saveButtonDisabled: {
    opacity: 0.55,
  },
});

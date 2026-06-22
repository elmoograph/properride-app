import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Images, ImageIcon, LockKeyhole, Play } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type {
  MotorcycleGalleryMedia,
  MotorcycleGalleryPost,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import { radius, spacing } from "@/src/theme";
import { GalleryVideoThumbnail } from "@/src/features/motorcycleImage/components/GalleryVideoThumbnail";

type MotorcycleGalleryPostGridProps = {
  posts: MotorcycleGalleryPost[];
  showVisibility?: boolean;
  onPressPost: (post: MotorcycleGalleryPost) => void;
};

function getCoverMedia(
  post: MotorcycleGalleryPost,
): MotorcycleGalleryMedia | null {
  return post.media[0] ?? null;
}

function hasVideo(post: MotorcycleGalleryPost): boolean {
  return post.media.some((item) => item.media_type === "video");
}

export function MotorcycleGalleryPostGrid({
  posts,
  showVisibility = false,
  onPressPost,
}: MotorcycleGalleryPostGridProps) {
  return (
    <View style={styles.grid}>
      {posts.map((post) => {
        const coverMedia = getCoverMedia(post);
        const containsVideo = hasVideo(post);

        return (
          <Pressable
            key={post.id}
            accessibilityRole="button"
            accessibilityLabel="Buka Gallery Post"
            onPress={() => onPressPost(post)}
            style={({ pressed }) => [
              styles.card,
              pressed ? styles.pressed : null,
            ]}
          >
            {coverMedia?.media_type === "image" ? (
              <Image
                source={{ uri: coverMedia.media_url }}
                style={styles.cover}
                resizeMode="cover"
              />
            ) : coverMedia?.media_type === "video" ? (
              <GalleryVideoThumbnail uri={coverMedia.media_url} />
            ) : (
              <View style={styles.emptyPlaceholder}>
                <ImageIcon
                  size={28}
                  color={MOTORCYCLE_SHOWCASE_COLORS.textMuted}
                />
              </View>
            )}

            <View style={styles.topOverlay}>
              {post.media.length > 1 ? (
                <View style={styles.mediaCountBadge}>
                  <Images
                    size={13}
                    color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                  />

                  <Text style={styles.mediaCountText}>{post.media.length}</Text>
                </View>
              ) : (
                <View />
              )}

              {containsVideo ? (
                <View style={styles.videoBadge}>
                  <Play
                    size={12}
                    fill={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                    color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                  />
                </View>
              ) : null}
            </View>

            {showVisibility && post.visibility === "private" ? (
              <View style={styles.privateBadge}>
                <LockKeyhole
                  size={11}
                  color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                />

                <Text style={styles.privateText}>Private</Text>
              </View>
            ) : null}

            {post.caption?.trim() ? (
              <View style={styles.captionOverlay}>
                <Text style={styles.caption} numberOfLines={2}>
                  {post.caption.trim()}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  card: {
    width: "48.7%",
    aspectRatio: 0.8,
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  emptyPlaceholder: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  topOverlay: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    left: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mediaCountBadge: {
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.62)",
  },
  mediaCountText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  videoBadge: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.62)",
  },
  privateBadge: {
    position: "absolute",
    top: 44,
    left: spacing.sm,
    minHeight: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.62)",
  },
  privateText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  captionOverlay: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    padding: spacing.md,
    backgroundColor: "rgba(0,0,0,0.64)",
  },
  caption: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 17,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  pressed: {
    opacity: 0.74,
  },
});

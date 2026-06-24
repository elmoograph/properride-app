import { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { Images, LockKeyhole, Trash2, X } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { GalleryVideoMedia } from "@/src/features/motorcycleImage/components/GalleryVideoMedia";
import type {
  MotorcycleGalleryMedia,
  MotorcycleGalleryPost,
} from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import { radius, spacing } from "@/src/theme";
import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import { ZoomableGalleryImage } from "@/src/features/motorcycleImage/components/ZoomableGalleryImage";

type MotorcycleGalleryPostViewerProps = {
  visible: boolean;
  posts: MotorcycleGalleryPost[];
  initialPostId?: string | null;
  canDelete?: boolean;
  deleting?: boolean;
  onClose: () => void;
  onDeletePost?: (post: MotorcycleGalleryPost) => void;
};

export function MotorcycleGalleryPostViewer({
  visible,
  posts,
  initialPostId,
  canDelete = false,
  deleting = false,
  onClose,
  onDeletePost,
}: MotorcycleGalleryPostViewerProps) {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  const width = viewport.width;
  const height = viewport.height;
  const verticalListRef = useRef<FlatList<MotorcycleGalleryPost>>(null);

  const initialPostIndex = useMemo(() => {
    if (!initialPostId) {
      return 0;
    }

    const foundIndex = posts.findIndex((post) => post.id === initialPostId);

    return foundIndex >= 0 ? foundIndex : 0;
  }, [initialPostId, posts]);

  const [activePostIndex, setActivePostIndex] = useState(initialPostIndex);
  const [activeImageZoomed, setActiveImageZoomed] = useState(false);
  useEffect(() => {
    if (!visible || width <= 0 || height <= 0) {
      return;
    }

    setActivePostIndex(initialPostIndex);

    const timeout = setTimeout(() => {
      verticalListRef.current?.scrollToOffset({
        offset: initialPostIndex * height,
        animated: false,
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [height, initialPostIndex, visible, width]);
  useEffect(() => {
    if (visible) {
      return;
    }

    setViewport({
      width: 0,
      height: 0,
    });
  }, [visible]);

  function handleVerticalScrollEnd(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.y / height);

    if (nextIndex < 0 || nextIndex >= posts.length) {
      return;
    }

    setActivePostIndex(nextIndex);
  }
  function handleOverlayLayout(event: LayoutChangeEvent) {
    const { width: nextWidth, height: nextHeight } = event.nativeEvent.layout;

    setViewport((current) => {
      if (current.width === nextWidth && current.height === nextHeight) {
        return current;
      }

      return {
        width: nextWidth,
        height: nextHeight,
      };
    });
  }

  function getPostLayout(
    _: ArrayLike<MotorcycleGalleryPost> | null | undefined,
    index: number,
  ) {
    return {
      length: height,
      offset: height * index,
      index,
    };
  }

  if (!visible || posts.length === 0) {
    return null;
  }

  return (
    <View style={styles.overlay} onLayout={handleOverlayLayout}>
      {width > 0 && height > 0 ? (
        <FlatList
          style={styles.verticalList}
          ref={verticalListRef}
          scrollEnabled={!activeImageZoomed && !deleting}
          data={posts}
          key={`${width}-${height}-${initialPostIndex}`}
          keyExtractor={(post) => post.id}
          pagingEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={initialPostIndex}
          getItemLayout={getPostLayout}
          onMomentumScrollEnd={handleVerticalScrollEnd}
          renderItem={({ item, index }) => (
            <GalleryPostSlide
              post={item}
              width={width}
              height={height}
              active={index === activePostIndex}
              canDelete={canDelete}
              deleting={deleting}
              onClose={onClose}
              onDeletePost={onDeletePost}
              onZoomChange={setActiveImageZoomed}
            />
          )}
        />
      ) : null}

      {deleting ? (
        <View style={styles.deletingOverlay}>
          <Text style={styles.deletingText}>
            {MOTORCYCLE_IMAGE_COPY.DELETING_POST_LABEL}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

type GalleryPostSlideProps = {
  post: MotorcycleGalleryPost;
  width: number;
  height: number;
  active: boolean;
  canDelete: boolean;
  deleting: boolean;
  onClose: () => void;
  onDeletePost?: (post: MotorcycleGalleryPost) => void;
  onZoomChange: (zoomed: boolean) => void;
};

function GalleryPostSlide({
  post,
  width,
  height,
  active,
  canDelete,
  deleting,
  onClose,
  onDeletePost,
  onZoomChange,
}: GalleryPostSlideProps) {
  const horizontalListRef = useRef<FlatList<MotorcycleGalleryMedia>>(null);

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const [imageZoomed, setImageZoomed] = useState(false);

  function handleImageZoomChange(zoomed: boolean) {
    setImageZoomed(zoomed);

    if (active) {
      onZoomChange(zoomed);
    }
  }

  useEffect(() => {
    if (active) {
      return;
    }

    setActiveMediaIndex(0);
    setImageZoomed(false);
    onZoomChange(false);

    horizontalListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [active, onZoomChange]);

  function handleHorizontalScrollEnd(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);

    if (nextIndex < 0 || nextIndex >= post.media.length) {
      return;
    }

    setActiveMediaIndex(nextIndex);
    setImageZoomed(false);
  }

  function getMediaLayout(
    _: ArrayLike<MotorcycleGalleryMedia> | null | undefined,
    index: number,
  ) {
    return {
      length: width,
      offset: width * index,
      index,
    };
  }

  return (
    <View
      style={[
        styles.postSlide,
        {
          width,
          height,
        },
      ]}
    >
      <FlatList
        style={styles.verticalList}
        ref={horizontalListRef}
        data={post.media}
        horizontal
        pagingEnabled={!imageZoomed}
        scrollEnabled={!imageZoomed}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(media) => media.id}
        getItemLayout={getMediaLayout}
        onMomentumScrollEnd={handleHorizontalScrollEnd}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.mediaSlide,
              {
                width,
                height,
              },
            ]}
          >
            {item.media_type === "video" ? (
              <GalleryVideoMedia
                uri={item.media_url}
                active={active && index === activeMediaIndex}
              />
            ) : (
              <ZoomableGalleryImage
                uri={item.media_url}
                active={active && index === activeMediaIndex}
                onZoomChange={handleImageZoomChange}
              />
            )}
          </View>
        )}
      />

      <View style={styles.topOverlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tutup Gallery"
          disabled={deleting}
          onPress={onClose}
          style={({ pressed }) => [
            styles.iconButton,
            pressed ? styles.pressed : null,
            deleting ? styles.disabled : null,
          ]}
        >
          <X size={24} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.postCounter}>
          <Text style={styles.postCounterText}>
            {activeMediaIndex + 1}/{post.media.length}
          </Text>
        </View>

        {canDelete && onDeletePost ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Hapus Gallery Post"
            disabled={deleting}
            onPress={() => onDeletePost(post)}
            style={({ pressed }) => [
              styles.iconButton,
              styles.deleteButton,
              pressed ? styles.pressed : null,
              deleting ? styles.disabled : null,
            ]}
          >
            <Trash2 size={21} color="#FF5A5F" />
          </Pressable>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>

      {post.media.length > 1 ? (
        <View style={styles.mediaIndicator}>
          <Images size={13} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />

          <Text style={styles.mediaIndicatorText}>
            Geser untuk melihat media lainnya
          </Text>
        </View>
      ) : null}

      <View style={styles.bottomOverlay}>
        {post.visibility === "private" ? (
          <View style={styles.privateBadge}>
            <LockKeyhole
              size={12}
              color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
            />

            <Text style={styles.privateText}>Private</Text>
          </View>
        ) : null}

        {post.caption?.trim() ? (
          <Text style={styles.caption}>{post.caption.trim()}</Text>
        ) : null}

        <View style={styles.pagination}>
          {post.media.map((media, index) => (
            <View
              key={media.id}
              style={[
                styles.dot,
                index === activeMediaIndex ? styles.dotActive : null,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    elevation: 9999,
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  verticalList: {
    flex: 1,
  },
  postSlide: {
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  mediaSlide: {
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: spacing.lg,
    right: spacing.lg,
    left: spacing.lg,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  deleteButton: {
    backgroundColor: "rgba(0,0,0,0.68)",
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
  },
  postCounter: {
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  postCounterText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  mediaIndicator: {
    position: "absolute",
    top: 82,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  mediaIndicatorText: {
    fontFamily: "Inter-Medium",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  bottomOverlay: {
    position: "absolute",
    right: spacing.xl,
    bottom: spacing["2xl"],
    left: spacing.xl,
    gap: spacing.md,
  },
  privateBadge: {
    alignSelf: "flex-start",
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  privateText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  caption: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 21,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.34)",
  },
  dotActive: {
    width: 20,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  deletingOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.68)",
  },
  deletingText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.5,
  },
});

import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEvent } from "expo";
import { useVideoPlayer, type VideoThumbnail } from "expo-video";
import { Image } from "expo-image";
import { Play } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type GalleryVideoThumbnailProps = {
  uri: string;
};

export function GalleryVideoThumbnail({ uri }: GalleryVideoThumbnailProps) {
  const [thumbnail, setThumbnail] = useState<VideoThumbnail | null>(null);

  const [failed, setFailed] = useState(false);
  const generatedRef = useRef(false);

  const player = useVideoPlayer(
    {
      uri,
      useCaching: true,
    },
    (createdPlayer) => {
      createdPlayer.muted = true;
      createdPlayer.pause();
    },
  );

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  useEffect(() => {
    generatedRef.current = false;
    setThumbnail(null);
    setFailed(false);
  }, [uri]);

  useEffect(() => {
    if (status !== "readyToPlay" || generatedRef.current) {
      return;
    }

    generatedRef.current = true;

    let cancelled = false;

    async function generateThumbnail() {
      try {
        const thumbnails = await player.generateThumbnailsAsync(0.25, {
          maxWidth: 720,
          maxHeight: 1280,
        });

        if (cancelled) {
          return;
        }

        setThumbnail(thumbnails[0] ?? null);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.warn("Gagal membuat thumbnail video Gallery:", error);

        setFailed(true);
      }
    }

    void generateThumbnail();

    return () => {
      cancelled = true;
    };
  }, [player, status]);

  if (thumbnail) {
    return (
      <View style={styles.container}>
        <Image
          source={thumbnail}
          style={styles.image}
          contentFit="cover"
          transition={150}
        />

        <View style={styles.playBadge}>
          <Play
            size={20}
            fill={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
            color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.placeholder}>
      {failed ? (
        <>
          <View style={styles.playBadge}>
            <Play
              size={20}
              fill={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
              color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
            />
          </View>

          <Text style={styles.placeholderText}>Video</Text>
        </>
      ) : (
        <>
          <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />

          <Text style={styles.placeholderText}>Memuat preview...</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  placeholderText: {
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  playBadge: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    width: 48,
    height: 48,
    marginTop: -24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
});

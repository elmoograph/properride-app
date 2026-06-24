import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Play, Volume2, VolumeX } from "lucide-react-native";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type GalleryVideoMediaProps = {
  uri: string;
  active: boolean;
};

export function GalleryVideoMedia({ uri, active }: GalleryVideoMediaProps) {
  const [muted, setMuted] = useState(false);

  const player = useVideoPlayer(
    {
      uri,
      useCaching: true,
    },
    (createdPlayer) => {
      createdPlayer.loop = true;
      createdPlayer.muted = false;
    },
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEffect(() => {
    player.muted = muted;
  }, [muted, player]);

  useEffect(() => {
    if (active) {
      player.play();
      return;
    }

    player.pause();
  }, [active, player]);

  function togglePlayback() {
    if (!active) {
      return;
    }

    if (player.playing) {
      player.pause();
      return;
    }

    player.play();
  }

  function toggleMuted() {
    setMuted((current) => !current);
  }

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls={false}
        contentFit="cover"
        surfaceType="textureView"
        pointerEvents="none"
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? "Jeda video" : "Putar video"}
        onPress={togglePlayback}
        style={styles.playbackLayer}
      >
        {!isPlaying ? (
          <View style={styles.centerPlayButton}>
            <Play
              size={32}
              fill={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
              color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
            />
          </View>
        ) : null}
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={muted ? "Aktifkan suara" : "Matikan suara"}
        onPress={toggleMuted}
        style={({ pressed }) => [
          styles.soundButton,
          pressed ? styles.pressed : null,
        ]}
      >
        {muted ? (
          <VolumeX size={20} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        ) : (
          <Volume2 size={20} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  video: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  playbackLayer: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  centerPlayButton: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  soundButton: {
    position: "absolute",
    right: spacing.lg,
    top: "50%",
    zIndex: 3,
    width: 44,
    height: 44,
    marginTop: -22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  pressed: {
    opacity: 0.72,
  },
});

import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Pause, Play, Volume2, VolumeX } from "lucide-react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type GalleryVideoMediaProps = {
  uri: string;
  active: boolean;
};

export function GalleryVideoMedia({ uri, active }: GalleryVideoMediaProps) {
  const [pausedByUser, setPausedByUser] = useState(false);
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

  useEffect(() => {
    player.muted = muted;
  }, [muted, player]);

  useEffect(() => {
    if (active && !pausedByUser) {
      player.play();
      return;
    }

    player.pause();
  }, [active, pausedByUser, player]);

  useEffect(() => {
    if (!active) {
      setPausedByUser(false);
    }
  }, [active]);

  function togglePlayback() {
    if (!active) {
      return;
    }

    setPausedByUser((current) => !current);
  }

  function toggleMuted() {
    setMuted((current) => !current);
  }

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={pausedByUser ? "Putar video" : "Jeda video"}
        onPress={togglePlayback}
        style={styles.videoPressable}
      >
        <VideoView
          player={player}
          style={styles.video}
          nativeControls={false}
          contentFit="cover"
          surfaceType="textureView"
        />

        {pausedByUser ? (
          <View style={styles.centerControl}>
            <View style={styles.playCircle}>
              <Play
                size={30}
                fill={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
                color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary}
              />
            </View>
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
          <VolumeX size={19} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        ) : (
          <Volume2 size={19} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        )}
      </Pressable>

      {!pausedByUser && active ? (
        <View style={styles.playingIndicator}>
          <Pause size={11} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  videoPressable: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  centerControl: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  playCircle: {
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  soundButton: {
    position: "absolute",
    right: spacing.lg,
    bottom: 150,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.58)",
  },
  playingIndicator: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: "rgba(0,0,0,0.42)",
  },
  pressed: {
    opacity: 0.72,
  },
});

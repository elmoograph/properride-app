import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Bike, ChevronRight, Gauge } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { MOTORCYCLE_STATUS } from "@/src/features/motorcycle/constants/motorcycle.constants";

import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { radius, spacing } from "@/src/theme";

type ProfileBuildCardProps = {
  motorcycle: Motorcycle;
  onPress: () => void;
};

export function ProfileBuildCard({
  motorcycle,
  onPress,
}: ProfileBuildCardProps) {
  const buildName = [motorcycle.brand, motorcycle.model]
    .filter(Boolean)
    .join(" ");

  const nickname = motorcycle.nickname?.trim();
  const yearLabel = motorcycle.year
    ? String(motorcycle.year)
    : PROFILE_COPY.PUBLIC.BUILD_YEAR_EMPTY;

  const statusLabel = getBuildStatusLabel(motorcycle.status);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {motorcycle.hero_image_url ? (
          <Image
            source={{ uri: motorcycle.hero_image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imageFallback}>
            <Bike size={34} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />
          </View>
        )}

        <View style={styles.imageOverlay} />

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{statusLabel}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Text style={styles.buildName} numberOfLines={1}>
            {buildName || "Motorcycle Build"}
          </Text>

          {nickname ? (
            <Text style={styles.nickname} numberOfLines={1}>
              {nickname}
            </Text>
          ) : null}

          <View style={styles.metaRow}>
            <Gauge size={14} color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary} />

            <Text style={styles.metaText}>{yearLabel}</Text>

            {motorcycle.engine_cc ? (
              <>
                <View style={styles.metaDot} />

                <Text style={styles.metaText}>{motorcycle.engine_cc} cc</Text>
              </>
            ) : null}
          </View>
        </View>

        <View style={styles.openButton}>
          <ChevronRight size={20} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
        </View>
      </View>
    </Pressable>
  );
}

function getBuildStatusLabel(status: Motorcycle["status"]): string {
  switch (status) {
    case MOTORCYCLE_STATUS.SOLD:
      return PROFILE_COPY.PUBLIC.BUILD_STATUS_SOLD;

    case MOTORCYCLE_STATUS.ARCHIVED:
      return PROFILE_COPY.PUBLIC.BUILD_STATUS_ARCHIVED;

    case MOTORCYCLE_STATUS.ACTIVE:
    default:
      return PROFILE_COPY.PUBLIC.BUILD_STATUS_ACTIVE;
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  pressed: {
    opacity: 0.88,
  },
  imageContainer: {
    height: 174,
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
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  statusBadge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: "rgba(5, 9, 12, 0.78)",
  },
  statusText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
  },
  mainContent: {
    flex: 1,
  },
  buildName: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  nickname: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  metaText: {
    fontFamily: "Inter-Medium",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  metaDot: {
    width: 3,
    height: 3,
    marginHorizontal: 2,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  openButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
});

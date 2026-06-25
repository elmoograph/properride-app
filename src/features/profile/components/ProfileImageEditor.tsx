import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Camera, ImagePlus, UserRound } from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";
import { fontFamily, radius, spacing } from "@/src/theme";

type ProfileImageEditorProps = {
  avatarUri?: string | null;
  coverUri?: string | null;
  disabled?: boolean;
  onPickAvatar: () => void | Promise<void>;
  onPickCover: () => void | Promise<void>;
  onRemoveAvatar?: () => void;
  onRemoveCover?: () => void;
};

export function ProfileImageEditor({
  avatarUri,
  coverUri,
  disabled = false,
  onPickAvatar,
  onPickCover,
  onRemoveAvatar,
  onRemoveCover,
}: ProfileImageEditorProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.coverContainer,
          pressed && !disabled ? styles.pressed : null,
          disabled ? styles.disabled : null,
        ]}
        disabled={disabled}
        onPress={onPickCover}
      >
        {coverUri ? (
          <Image
            source={{ uri: coverUri }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.coverFallback}>
            <View style={styles.coverIcon}>
              <ImagePlus
                size={24}
                color={MOTORCYCLE_SHOWCASE_COLORS.background}
              />
            </View>

            <Text style={styles.coverTitle}>
              {PROFILE_COPY.EDIT.COVER_TITLE}
            </Text>

            <Text style={styles.coverDescription}>
              {PROFILE_COPY.EDIT.COVER_DESCRIPTION}
            </Text>
          </View>
        )}

        {coverUri ? <View style={styles.coverOverlay} /> : null}

        <View style={styles.coverAction}>
          <Camera size={15} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />

          <Text style={styles.coverActionText}>
            {coverUri ? "Ganti Cover" : "Pilih Cover"}
          </Text>
        </View>
        {coverUri && onRemoveCover ? (
          <Pressable
            style={({ pressed }) => [
              styles.removeCoverButton,
              pressed && !disabled ? styles.removePressed : null,
            ]}
            disabled={disabled}
            onPress={(event) => {
              event.stopPropagation();
              onRemoveCover();
            }}
          >
            <Text style={styles.removeButtonText}>
              {PROFILE_COPY.EDIT.REMOVE_COVER}
            </Text>
          </Pressable>
        ) : null}
      </Pressable>

      <View style={styles.avatarSection}>
        <Pressable
          style={({ pressed }) => [
            styles.avatarPressable,
            pressed && !disabled ? styles.pressed : null,
            disabled ? styles.disabled : null,
          ]}
          disabled={disabled}
          onPress={onPickAvatar}
        >
          <View style={styles.avatarBorder}>
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.avatarFallback}>
                <UserRound
                  size={34}
                  color={MOTORCYCLE_SHOWCASE_COLORS.textSecondary}
                />
              </View>
            )}
          </View>

          <View style={styles.avatarCameraButton}>
            <Camera size={16} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
          </View>
        </Pressable>

        <View style={styles.avatarContent}>
          <Text style={styles.avatarLabel}>
            {PROFILE_COPY.EDIT.AVATAR_LABEL}
          </Text>

          <Text style={styles.avatarDescription}>
            Gunakan foto yang jelas dan mudah dikenali.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.avatarAction,
              pressed && !disabled ? styles.avatarActionPressed : null,
            ]}
            disabled={disabled}
            onPress={onPickAvatar}
          >
            <Text style={styles.avatarActionText}>
              {avatarUri ? PROFILE_COPY.EDIT.AVATAR_ACTION : "Pilih Foto"}
            </Text>
          </Pressable>
          {avatarUri && onRemoveAvatar ? (
            <Pressable
              style={({ pressed }) => [
                styles.removeAvatarAction,
                pressed && !disabled ? styles.removePressed : null,
              ]}
              disabled={disabled}
              onPress={onRemoveAvatar}
            >
              <Text style={styles.removeAvatarText}>
                {PROFILE_COPY.EDIT.REMOVE_AVATAR}
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  coverContainer: {
    height: 190,
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  coverIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  coverTitle: {
    marginTop: spacing.md,
    fontFamily: fontFamily.headline.bold,
    fontSize: 15,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
    textAlign: "center",
  },
  coverDescription: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
    textAlign: "center",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  coverAction: {
    position: "absolute",
    right: spacing.md,
    bottom: spacing.md,
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: "rgba(5, 9, 12, 0.78)",
  },
  coverActionText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  avatarPressable: {
    position: "relative",
  },
  avatarBorder: {
    width: 92,
    height: 92,
    padding: 3,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  avatarImage: {
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
  avatarCameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  avatarContent: {
    flex: 1,
  },
  avatarLabel: {
    fontFamily: fontFamily.headline.bold,
    fontSize: 15,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  avatarDescription: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  avatarAction: {
    alignSelf: "flex-start",
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  avatarActionPressed: {
    opacity: 0.7,
  },
  avatarActionText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.55,
  },
  removeCoverButton: {
    position: "absolute",
    left: spacing.md,
    bottom: spacing.md,
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: "rgba(180, 35, 35, 0.82)",
  },
  removeButtonText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: "#FFFFFF",
  },
  removeAvatarAction: {
    alignSelf: "flex-start",
    marginTop: spacing.xs,
    paddingVertical: spacing.xs,
  },
  removeAvatarText: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 12,
    color: "#EF4444",
  },
  removePressed: {
    opacity: 0.72,
  },
});

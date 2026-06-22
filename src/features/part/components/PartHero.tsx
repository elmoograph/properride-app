import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ArrowLeft, ImageIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { Part } from "@/src/features/part/types/part.types";
import { radius, spacing } from "@/src/theme";

type PartHeroProps = {
  part: Part;
  onPressBack: () => void;
};

function getPartTitle(part: Part): string {
  return (
    part.product_name ||
    part.custom_product_name ||
    part.brand ||
    part.custom_brand ||
    PART_COPY.EMPTY_VALUE
  );
}

function getPartBrand(part: Part): string {
  return part.brand || part.custom_brand || PART_COPY.EMPTY_VALUE;
}

export function PartHero({ part, onPressBack }: PartHeroProps) {
  const visibilityLabel = part.is_public ? "Public Setup" : "Private";

  return (
    <View style={styles.container}>
      {part.main_image_url ? (
        <ImageBackground
          source={{ uri: part.main_image_url }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              "rgba(0,0,0,0.20)",
              "rgba(0,0,0,0.20)",
              "rgba(0,0,0,0.92)",
            ]}
            locations={[0, 0.45, 1]}
            style={styles.gradient}
          >
            <HeroContent
              part={part}
              visibilityLabel={visibilityLabel}
              onPressBack={onPressBack}
            />
          </LinearGradient>
        </ImageBackground>
      ) : (
        <View style={styles.placeholder}>
          <View style={styles.placeholderIcon}>
            <ImageIcon size={30} color={MOTORCYCLE_SHOWCASE_COLORS.textMuted} />
          </View>

          <HeroContent
            part={part}
            visibilityLabel={visibilityLabel}
            onPressBack={onPressBack}
          />
        </View>
      )}
    </View>
  );
}

type HeroContentProps = {
  part: Part;
  visibilityLabel: string;
  onPressBack: () => void;
};

function HeroContent({ part, visibilityLabel, onPressBack }: HeroContentProps) {
  return (
    <View style={styles.content}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Kembali"
          onPress={onPressBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed ? styles.pressed : null,
          ]}
        >
          <ArrowLeft size={22} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
        </Pressable>

        <View style={styles.visibilityBadge}>
          <View
            style={[
              styles.visibilityDot,
              !part.is_public ? styles.visibilityDotPrivate : null,
            ]}
          />

          <Text style={styles.visibilityText}>{visibilityLabel}</Text>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{part.category}</Text>
        </View>

        <Text style={styles.title}>{getPartTitle(part)}</Text>

        <Text style={styles.subtitle}>{getPartBrand(part)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 380,
    overflow: "hidden",
    borderBottomLeftRadius: radius["2xl"],
    borderBottomRightRadius: radius["2xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    borderBottomLeftRadius: radius["2xl"],
    borderBottomRightRadius: radius["2xl"],
  },
  gradient: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  placeholderIcon: {
    position: "absolute",
    top: "38%",
    alignSelf: "center",
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 36,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(0,0,0,0.46)",
  },
  visibilityBadge: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(0,0,0,0.52)",
  },
  visibilityDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  visibilityDotPrivate: {
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  visibilityText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  bottomContent: {
    alignItems: "flex-start",
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  categoryText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  title: {
    marginTop: spacing.md,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 28,
    lineHeight: 35,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.72,
  },
});

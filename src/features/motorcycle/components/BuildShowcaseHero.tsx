import { Image, StyleSheet, Text, View } from "react-native";
import { Plus } from "lucide-react-native";

import { spacing } from "@/src/theme";
import {
  MOTORCYCLE_SHOWCASE_COLORS,
  MOTORCYCLE_SHOWCASE_COPY,
} from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";

type BuildShowcaseHeroProps = {
  motorcycle: Motorcycle;
};

function getMotorcycleName(motorcycle: Motorcycle): string {
  return motorcycle.nickname || motorcycle.model;
}

export function BuildShowcaseHero({ motorcycle }: BuildShowcaseHeroProps) {
  return (
    <View style={styles.container}>
      {motorcycle.hero_image_url ? (
        <Image
          source={{ uri: motorcycle.hero_image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{motorcycle.brand}</Text>
        </View>
      )}

      <View style={styles.overlay} />

      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>
          {MOTORCYCLE_SHOWCASE_COPY.SCREEN_TITLE}
        </Text>

        <View style={styles.addAction}>
          <Plus size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
          <Text style={styles.addActionText}>
            {MOTORCYCLE_SHOWCASE_COPY.ADD_MOTORCYCLE}
          </Text>
        </View>
      </View>

      <View style={styles.identity}>
        <Text style={styles.brand}>{motorcycle.brand}</Text>

        <View style={styles.namePill}>
          <Text style={styles.namePillText}>
            {getMotorcycleName(motorcycle)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 360,
    overflow: "hidden",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  placeholderText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 42,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.blackOverlay,
  },
  topBar: {
    position: "absolute",
    top: spacing["2xl"],
    left: spacing.xl,
    right: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  addAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  addActionText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  identity: {
    position: "absolute",
    left: spacing.xl,
    bottom: spacing["2xl"],
  },
  brand: {
    marginBottom: spacing.sm,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  namePill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  namePillText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
});

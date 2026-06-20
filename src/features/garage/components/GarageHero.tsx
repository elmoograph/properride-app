import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "lucide-react-native";

import { AppText } from "@/src/shared/components";
import { colors, radius, spacing } from "@/src/shared/theme";

import { GARAGE_COPY } from "../constants/garage.copy";
import { GARAGE_HERO_HEIGHT } from "../constants/garage.constants";
import type { GarageMotorcycle } from "../types/garage.types";
import { GarageMotorSelector } from "./GarageMotorSelector";

type GarageHeroProps = {
  motorcycle: GarageMotorcycle;
  onAddMotorcycle?: () => void;
  onSelectMotorcycle?: () => void;
};

export function GarageHero({
  motorcycle,
  onAddMotorcycle,
  onSelectMotorcycle,
}: GarageHeroProps) {
  return (
    <ImageBackground
      source={{ uri: motorcycle.imageUrl }}
      resizeMode="cover"
      style={styles.hero}
      imageStyle={styles.heroImage}
    >
      <LinearGradient
        colors={["rgba(5,6,7,0.72)", "rgba(5,6,7,0.18)", "rgba(5,6,7,0.86)"]}
        locations={[0, 0.42, 1]}
        style={styles.overlay}
      >
        <View style={styles.header}>
          <View>
            <AppText variant="badge" color="brand">
              PROPER RIDE
            </AppText>
            <AppText variant="screenTitle" style={styles.title}>
              {GARAGE_COPY.screenTitle}
            </AppText>
          </View>

          <Pressable onPress={onAddMotorcycle} style={styles.addButton}>
            <Plus size={15} color={colors.brand.lime} strokeWidth={2.5} />
            <AppText variant="caption">{GARAGE_COPY.addMotorcycle}</AppText>
          </Pressable>
        </View>

        <GarageMotorSelector
          brand={motorcycle.brand}
          model={motorcycle.model}
          year={motorcycle.year}
          onPress={onSelectMotorcycle}
        />
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: GARAGE_HERO_HEIGHT,
    backgroundColor: colors.surface.default,
    overflow: "hidden",
  },
  heroImage: {
    borderBottomLeftRadius: radius["3xl"],
    borderBottomRightRadius: radius["3xl"],
  },
  overlay: {
    flex: 1,
    paddingHorizontal: spacing.screenX,
    paddingTop: spacing["3xl"],
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius["3xl"],
    borderBottomRightRadius: radius["3xl"],
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  title: {
    marginTop: spacing.xs,
  },
  addButton: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: "rgba(0,0,0,0.36)",
    borderWidth: 1,
    borderColor: colors.border.default,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});

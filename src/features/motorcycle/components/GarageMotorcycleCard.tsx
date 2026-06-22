import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Camera, Gauge, Wrench } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { spacing } from "@/src/theme";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import { formatCurrency } from "@/src/utils/format";

type GarageMotorcycleCardProps = {
  motorcycle: Motorcycle;
  partCount?: number;
  photoCount?: number;
  buildValue?: number;
  onPress: (motorcycleId: string) => void;
};

function getTitle(motorcycle: Motorcycle): string {
  return [motorcycle.brand, motorcycle.model, motorcycle.variant]
    .filter(Boolean)
    .join(" ");
}

function getSubtitle(motorcycle: Motorcycle): string {
  return motorcycle.nickname ? `"${motorcycle.nickname}"` : "Untitled build";
}

function getMeta(motorcycle: Motorcycle): string {
  const year = motorcycle.year ? String(motorcycle.year) : null;
  const engine = motorcycle.engine_cc ? `${motorcycle.engine_cc} cc` : null;
  const mileage =
    motorcycle.mileage !== null && motorcycle.mileage !== undefined
      ? `${motorcycle.mileage.toLocaleString("id-ID")} km`
      : null;

  return [year, engine, mileage].filter(Boolean).join(" • ");
}

function getStatusLabel(status?: string | null): string {
  if (status === "completed") return "Completed";
  if (status === "on_hold") return "On Hold";
  return "In Progress";
}

export function GarageMotorcycleCard({
  motorcycle,
  partCount = 0,
  photoCount = 0,
  buildValue = 0,
  onPress,
}: GarageMotorcycleCardProps) {
  const title = getTitle(motorcycle);
  const subtitle = getSubtitle(motorcycle);
  const meta = getMeta(motorcycle);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed ? styles.pressed : null,
      ]}
      onPress={() => onPress(motorcycle.id)}
    >
      <View style={styles.imageWrap}>
        {motorcycle.hero_image_url ? (
          <Image
            source={{ uri: motorcycle.hero_image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {motorcycle.brand?.charAt(0)?.toUpperCase() || "M"}
            </Text>
            <Text style={styles.placeholderLabel}>No hero photo</Text>
          </View>
        )}

        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.78)"]}
          locations={[0, 0.45, 1]}
          style={styles.gradient}
        />

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {getStatusLabel(motorcycle.status)}
          </Text>
        </View>

        <View style={styles.imageTextContent}>
          <Text style={styles.title} numberOfLines={1}>
            {title || "Unknown Motorcycle"}
          </Text>

          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>

          {meta ? (
            <Text style={styles.meta} numberOfLines={1}>
              {meta}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Wrench size={14} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
            <Text style={styles.statText}>{partCount} Parts</Text>
          </View>

          <View style={styles.statItem}>
            <Camera size={14} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
            <Text style={styles.statText}>{photoCount} Photos</Text>
          </View>
        </View>

        <View style={styles.valueBox}>
          <View>
            <Text style={styles.valueLabel}>Build Value</Text>
            <Text style={styles.valueText}>{formatCurrency(buildValue)}</Text>
          </View>

          <View style={styles.valueIcon}>
            <Gauge size={16} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  imageWrap: {
    height: 210,
    overflow: "hidden",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  placeholderText: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 48,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  placeholderLabel: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  statusBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.66)",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  statusText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  imageTextContent: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    left: spacing.lg,
  },
  title: {
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  meta: {
    marginTop: spacing.sm,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  content: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  statItem: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  statText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  valueBox: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  valueLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  valueText: {
    marginTop: 3,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 15,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  valueIcon: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
});

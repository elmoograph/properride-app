import { Pressable, StyleSheet, View } from "react-native";
import { ChevronDown } from "lucide-react-native";

import { AppText } from "@/src/shared/components";
import { colors, radius, spacing } from "@/src/shared/theme";

type GarageMotorSelectorProps = {
  brand: string;
  model: string;
  year: number;
  onPress?: () => void;
};

export function GarageMotorSelector({
  brand,
  model,
  year,
  onPress,
}: GarageMotorSelectorProps) {
  return (
    <View style={styles.container}>
      <View>
        <AppText variant="bodyMedium">{brand}</AppText>

        <Pressable onPress={onPress} style={styles.selector}>
          <AppText variant="cardTitle" color="inverse">
            {model}
          </AppText>

          <ChevronDown
            size={16}
            color={colors.text.inverse}
            strokeWidth={2.5}
          />
        </Pressable>
      </View>

      <View style={styles.yearBadge}>
        <View style={styles.yearDot} />
        <AppText variant="bodyMedium">{year}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  selector: {
    marginTop: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.brand.lime,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  yearBadge: {
    minHeight: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: "rgba(0,0,0,0.38)",
    borderWidth: 1,
    borderColor: colors.border.default,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  yearDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand.lime,
  },
});

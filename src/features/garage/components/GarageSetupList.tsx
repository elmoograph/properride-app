import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { useParts } from "@/features/parts/hooks/useParts";
import { groupPartsByCategory } from "@/features/parts/utils/groupParts";

import { TouchableOpacity } from "react-native";
import { radius } from "../../../constants/radius";
import { GarageSetupSection } from "./GarageSetupSection";
import { MotorcyclePart } from "@/features/parts/types/part.types";

import { router } from "expo-router";

type Props = {
  parts: MotorcyclePart[];
  loading: boolean;
};

export function GarageSetupList({ parts, loading }: Props) {
  const sections = groupPartsByCategory(parts);
  if (loading) {
    return (
      <Text
        style={{
          textAlign: "center",
        }}
      >
        Loading Parts...
      </Text>
    );
  }
  return (
    <View
      style={{
        marginTop: spacing.md,

        paddingHorizontal: spacing.screen,
      }}
    >
      {sections.map((section) => (
        <GarageSetupSection key={section.title} section={section} />
      ))}
      {/* ADD PART BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/parts/add")}
        style={{
          width: "100%",

          backgroundColor: colors.primary,

          alignItems: "center",
          justifyContent: "center",

          paddingVertical: 10,

          borderRadius: radius.sm,
          marginBottom: spacing.lg,
        }}
      >
        <Text
          style={{
            ...typography.button.md,
            color: colors.background,
          }}
        >
          + Add Part
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { setupData } from "../data/setup.data";

import { TouchableOpacity } from "react-native";
import { radius } from "../../../constants/radius";
import { GarageSetupSection } from "./GarageSetupSection";

export function GarageSetupList() {
  return (
    <View
      style={{
        marginTop: 15,

        paddingHorizontal: spacing.screen,
      }}
    >
      {setupData.map((section) => (
        <GarageSetupSection key={section.title} section={section} />
      ))}
      {/* ADD PART BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: "100%",

          marginTop: 4,

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
            ...typography.heading.md,
            color: colors.background,
          }}
        >
          + Add Part
        </Text>
      </TouchableOpacity>
    </View>
  );
}

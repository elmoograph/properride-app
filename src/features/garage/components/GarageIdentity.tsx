import { Text, TouchableOpacity, View } from "react-native";

import { Plus } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { radius } from "../../../constants/radius";

export function GarageIdentity() {
  return (
    <View
      style={{
        width: "100%",

        marginTop: 10,

        paddingHorizontal: spacing.screen,
      }}
    >
      {/* NAME */}
      <Text
        style={{
          ...typography.display.title,
          color: colors.white,
        }}
      >
        Ryan Kusuma
      </Text>

      {/* NICKNAME 
      <Text
        style={{
          ...typography.heading.lg,
          color: colors.lime,

          marginTop: 2,
        }}
      >
        “Scream Machine”
      </Text>*/}

      {/* USERNAME */}
      <Text
        style={{
          ...typography.body.sm,
          color: colors.mute,

          marginTop: 4,
        }}
      >
        @ryan_nmax2024 · Jakarta Selatan
      </Text>

      {/* BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          marginTop: 14,

          alignSelf: "flex-start",

          flexDirection: "row",
          alignItems: "center",
          gap: 6,

          backgroundColor: colors.lime,

          paddingHorizontal: 14,
          paddingVertical: 10,

          borderRadius: radius.md,
        }}
      >
        <Plus size={14} color={colors.primarytext} />

        <Text
          style={{
            ...typography.label.md,
            color: colors.primarytext,
          }}
        >
          Add Part
        </Text>
      </TouchableOpacity>
    </View>
  );
}

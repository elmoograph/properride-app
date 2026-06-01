import { Text, View } from "react-native";

import { MapPin } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

export function RidingAreaCard() {
  return (
    <View
      style={{
        marginTop: spacing.xl,

        marginHorizontal: spacing.screen,

        backgroundColor: "#050505",

        borderWidth: 1,
        borderColor: "#111111",

        borderRadius: radius.lg,

        padding: spacing.lg,
      }}
    >
      {/* TITLE */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          gap: spacing.sm,
        }}
      >
        <MapPin size={16} color={colors.lime} />

        <Text
          style={{
            ...typography.heading.md,

            color: colors.white,
          }}
        >
          Riding Area
        </Text>
      </View>

      {/* AREA */}
      <View
        style={{
          marginTop: spacing.lg,

          alignSelf: "flex-start",

          borderRadius: 999,

          borderWidth: 1,
          borderColor: "#3F6900",

          paddingHorizontal: spacing.md,

          paddingVertical: 6,
        }}
      >
        <Text
          style={{
            ...typography.label.md,

            color: colors.lime,
          }}
        >
          Jakarta Selatan
        </Text>
      </View>

      {/* DESC */}
      <Text
        style={{
          ...typography.body.md,

          color: colors.mute,

          marginTop: spacing.md,
        }}
      >
        Terhubung dengan 51 rider di area kamu
      </Text>
    </View>
  );
}

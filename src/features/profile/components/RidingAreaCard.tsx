import { Text, View } from "react-native";

import { MapPin } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";

export function RidingAreaCard() {
  return (
    <View
      style={{
        marginTop: spacing.xl,

        marginHorizontal: spacing.screen,

        backgroundColor: "#050505",

        borderWidth: 1,
        borderColor: colors.mute,

        borderRadius: radius.sm,

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
        <MapPin size={icons.sm} color={colors.primary} />

        <Text
          style={{
            ...typography.heading.sm,

            color: colors.textPrimary,
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

          borderRadius: radius.full,

          borderWidth: 1,
          borderColor: colors.primary,

          paddingHorizontal: spacing.md,

          paddingVertical: 6,
        }}
      >
        <Text
          style={{
            ...typography.caption.md,

            color: colors.primary,
          }}
        >
          Jakarta Selatan
        </Text>
      </View>

      {/* DESC */}
      <Text
        style={{
          ...typography.body.sm,

          color: colors.textSecondary,

          marginTop: spacing.md,
        }}
      >
        Terhubung dengan 51 rider di area kamu
      </Text>
    </View>
  );
}

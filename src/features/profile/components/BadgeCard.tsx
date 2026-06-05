import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

type Props = {
  title: string;

  icon: string;

  unlocked: boolean;
};

export function BadgeCard({ title, icon, unlocked }: Props) {
  return (
    <View
      style={{
        width: "23.3%",

        backgroundColor: unlocked ? "#071100" : "#050505",

        borderWidth: 1,

        borderColor: unlocked ? "#2D4D00" : "#111111",

        borderRadius: radius.lg,

        paddingVertical: spacing.sm,

        alignItems: "center",
        justifyContent: "center",

        gap: spacing.sm,
      }}
    >
      {/* ICON */}
      <View
        style={{
          width: 32,
          height: 32,

          borderRadius: radius.full,

          backgroundColor: unlocked ? "#132400" : "#0A0A0A",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {icon}
        </Text>
      </View>

      {/* TITLE */}
      <Text
        style={{
          ...typography.caption.md,

          color: unlocked ? colors.textPrimary : "#5A5A5A",

          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {/* DOT */}
      {unlocked && (
        <View
          style={{
            width: 7,
            height: 7,

            borderRadius: radius.full,

            backgroundColor: colors.primary,
          }}
        />
      )}
    </View>
  );
}

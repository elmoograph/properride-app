import { Text, TouchableOpacity } from "react-native";

import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { colors } from "@/constants/colors";

export function LogoutButton() {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        marginTop: spacing.xl,

        marginHorizontal: spacing.screen,
        backgroundColor: "#ff4d4d",

        borderRadius: radius.sm,

        paddingVertical: spacing.md,

        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...typography.heading.sm,

          color: colors.background,
        }}
      >
        Keluar
      </Text>
    </TouchableOpacity>
  );
}

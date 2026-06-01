import { Text, TouchableOpacity } from "react-native";

import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

export function LogoutButton() {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        marginTop: spacing.xl,

        marginHorizontal: spacing.screen,

        borderWidth: 1,
        borderColor: "#111111",

        borderRadius: radius.xl,

        paddingVertical: spacing.lg,

        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...typography.heading.md,

          color: "#FF4D4D",
        }}
      >
        Keluar
      </Text>
    </TouchableOpacity>
  );
}

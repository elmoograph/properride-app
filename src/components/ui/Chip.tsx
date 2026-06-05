import { Text, TouchableOpacity } from "react-native";

import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";

type Props = {
  label: string;

  active?: boolean;

  onPress?: () => void;
};

export function Chip({ label, active = false, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        paddingHorizontal: spacing.lg,

        height: 40,

        borderRadius: radius.full,

        justifyContent: "center",

        backgroundColor: active ? colors.primary : colors.surface,
      }}
    >
      <Text
        style={{
          color: active ? colors.background : colors.textPrimary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

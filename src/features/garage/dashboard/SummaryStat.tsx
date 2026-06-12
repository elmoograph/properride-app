import { Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { typography } from "@/styles/typography";

type Props = {
  value: string | number;
  label: string;
};

export function SummaryStat({ value, label }: Props) {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...typography.heading.sm,
          color: colors.textPrimary,
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          ...typography.caption.md,
          color: colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

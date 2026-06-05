import { Text, View } from "react-native";

import { Bike } from "lucide-react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";

import { Button } from "./Button";
import { typography } from "@/styles/typography";

type Props = {
  title: string;

  description?: string;

  actionLabel?: string;

  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View
      style={{
        paddingVertical: spacing["4xl"],

        alignItems: "center",
      }}
    >
      <Bike size={48} color={colors.primary} />

      <Text
        style={{
          ...typography.heading.sm,

          color: colors.textPrimary,

          marginTop: spacing.lg,
        }}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={{
            ...typography.body.sm,

            color: colors.textSecondary,

            textAlign: "center",

            marginTop: spacing.sm,

            maxWidth: 280,
          }}
        >
          {description}
        </Text>
      )}

      {actionLabel && (
        <View
          style={{
            marginTop: spacing.xl,

            width: 180,
          }}
        >
          <Button title={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}

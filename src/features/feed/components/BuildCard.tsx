import { Image, Text, View } from "react-native";

import { Button, Card } from "@/components/ui";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/styles/typography";

import { Build } from "../types/build.types";

type Props = {
  build: Build;
};

export function BuildCard({ build }: Props) {
  return (
    <Card radius="lg" padding="sm">
      <Image
        source={build.image}
        resizeMode="cover"
        style={{
          width: "100%",

          height: 220,

          borderRadius: 20,
        }}
      />

      <View
        style={{
          padding: spacing.md,
        }}
      >
        <Text
          style={{
            ...typography.heading.sm,

            color: colors.textPrimary,
          }}
        >
          {build.bikeName}
        </Text>

        <Text
          style={{
            ...typography.body.sm,

            color: colors.textSecondary,

            marginTop: 4,
          }}
        >
          @{build.owner}
        </Text>

        <Text
          style={{
            ...typography.caption.md,

            color: colors.textMuted,

            marginTop: 2,
          }}
        >
          {build.location}
        </Text>

        <Text
          style={{
            ...typography.body.sm,

            color: colors.primary,

            marginTop: spacing.md,
          }}
        >
          {build.parts} Parts
        </Text>

        <View
          style={{
            marginTop: spacing.lg,
          }}
        >
          <Button title="View Build" variant="secondary" />
        </View>
      </View>
    </Card>
  );
}

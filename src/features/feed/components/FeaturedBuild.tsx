import { Image, Text, View } from "react-native";

import { Button, Card } from "@/components/ui";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";

import { featuredBuild } from "../data/featured.data";
import { typography } from "@/styles/typography";
import { radius } from "@/constants/radius";

export function FeaturedBuild() {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,
      }}
    >
      <Card radius="sm" padding="md">
        <Image
          source={featuredBuild.image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 240,

            borderRadius: radius.sm,
          }}
        />

        <View
          style={{
            marginTop: spacing.lg,
          }}
        >
          <Text
            style={{
              ...typography.heading.md,

              color: colors.textPrimary,
            }}
          >
            {featuredBuild.bikeName}
          </Text>

          <Text
            style={{
              ...typography.body.sm,

              color: colors.textSecondary,

              marginTop: 4,
            }}
          >
            @{featuredBuild.owner}
          </Text>

          <Text
            style={{
              ...typography.caption.md,

              color: colors.textMuted,

              marginTop: 2,
            }}
          >
            {featuredBuild.location}
          </Text>
        </View>

        <View
          style={{
            marginTop: spacing.lg,
          }}
        >
          <Button title="View Build" />
        </View>
      </Card>
    </View>
  );
}

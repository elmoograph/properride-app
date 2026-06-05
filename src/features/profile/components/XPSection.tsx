import { Text, View } from "react-native";

import { Map } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { profileXPData } from "../data/profile-xp.data";
import { icons } from "../../../constants/icons";

export function XPSection() {
  const progress = profileXPData.currentXP / profileXPData.nextLevelXP;

  return (
    <View
      style={{
        marginTop: spacing.md,

        marginHorizontal: spacing.screen,

        backgroundColor: "#050505",

        borderWidth: 1,
        borderColor: "#111111",

        borderRadius: radius.lg,

        padding: spacing.lg,
      }}
    >
      {/* TOP */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            gap: spacing.md,
          }}
        >
          {/* LEVEL */}
          <View
            style={{
              width: 42,
              height: 42,

              borderRadius: radius.full,

              borderWidth: 1,
              borderColor: "#2D4D00",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...typography.heading.md,

                color: colors.primary,
              }}
            >
              {profileXPData.level}
            </Text>
          </View>

          {/* INFO */}
          <View>
            <Text
              style={{
                ...typography.heading.md,

                color: colors.textPrimary,
              }}
            >
              Level
              {profileXPData.level}
            </Text>

            <Text
              style={{
                ...typography.body.md,

                color: colors.surface,

                marginTop: 2,
              }}
            >
              {profileXPData.title}
            </Text>
          </View>
        </View>

        {/* XP */}
        <Text
          style={{
            ...typography.heading.lg,

            color: colors.primary,
          }}
        >
          {profileXPData.currentXP.toLocaleString()} XP
        </Text>
      </View>

      {/* PROGRESS */}
      <View
        style={{
          marginTop: spacing.xl,
        }}
      >
        {/* BAR */}
        <View
          style={{
            height: 8,

            borderRadius: radius.full,

            backgroundColor: "#233800",

            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${progress * 100}%`,

              height: "100%",

              backgroundColor: colors.primary,
            }}
          />
        </View>

        {/* INFO */}
        <View
          style={{
            marginTop: spacing.sm,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...typography.caption.md,

              color: colors.surface,
            }}
          >
            {profileXPData.currentXP.toLocaleString()} XP
          </Text>

          <Text
            style={{
              ...typography.caption.md,

              color: colors.surface,
            }}
          >
            {profileXPData.nextLevelXP} XP untuk Level {profileXPData.level + 1}
          </Text>
        </View>
      </View>

      {/* NEXT BADGE */}
      <View
        style={{
          marginTop: spacing.xl,

          backgroundColor: "#0A0A0A",

          borderRadius: radius.md,

          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,

          flexDirection: "row",
          alignItems: "center",

          gap: spacing.md,
        }}
      >
        {/* ICON */}
        <View
          style={{
            width: 42,
            height: 42,

            borderRadius: radius.lg,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Map size={icons.lg} color={colors.primary} />
        </View>

        {/* TEXT */}
        <View>
          <Text
            style={{
              ...typography.caption.md,

              color: colors.surface,
            }}
          >
            Next Badge:
          </Text>

          <Text
            style={{
              ...typography.body.lg,

              color: colors.textPrimary,

              marginTop: 2,
            }}
          >
            {profileXPData.nextBadge.title}
          </Text>

          <Text
            style={{
              ...typography.caption.md,

              color: colors.surface,

              marginTop: 2,
            }}
          >
            {profileXPData.nextBadge.mission}
          </Text>
        </View>
      </View>
    </View>
  );
}

import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { levelData } from "../data/level.data";

export function GarageLevelCard() {
  return (
    <View
      style={{
        width: "100%",

        marginTop: spacing.lg,

        paddingHorizontal: spacing.screen,
      }}
    >
      <View
        style={{
          backgroundColor: colors.surface,

          borderRadius: radius.lg,

          paddingHorizontal: 16,
          paddingVertical: 10,
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
              gap: 8,
            }}
          >
            <Text
              style={{
                ...typography.heading.md,
                color: colors.primary,
              }}
            >
              Level
            </Text>

            <Text
              style={{
                ...typography.body.md,
                color: colors.surface,
              }}
            >
              ProperRide Builder
            </Text>
          </View>

          {/* XP */}
          <Text
            style={{
              ...typography.body.md,
              color: colors.surface,
            }}
          >
            {levelData.xp}
          </Text>
        </View>

        {/* PROGRESS */}
        <View
          style={{
            width: "100%",
            height: 8,

            backgroundColor: "#0B0B0B",

            borderRadius: radius.full,

            overflow: "hidden",

            marginTop: 16,
          }}
        >
          <View
            style={{
              width: `${levelData.progress}%`,
              height: "100%",

              backgroundColor: colors.primary,

              borderRadius: radius.full,
            }}
          />
        </View>

        {/* BOTTOM */}
        <Text
          style={{
            ...typography.caption.md,
            color: colors.surface,

            marginTop: 10,
          }}
        >
          {levelData.nextLevel} lagi untuk Level 8
        </Text>
      </View>
    </View>
  );
}

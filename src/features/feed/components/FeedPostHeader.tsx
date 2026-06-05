import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

type Props = {
  username: string;

  handle: string;

  time: string;

  category: string;

  badge: string;
};

export function FeedPostHeader({
  username,
  handle,
  time,
  category,
  badge,
}: Props) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

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
        {/* AVATAR */}
        <View
          style={{
            width: 42,
            height: 42,

            borderRadius: radius.full,

            backgroundColor: "#1A1A1A",

            borderWidth: 1,
            borderColor: "#244D00",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...typography.caption.md,
              color: colors.primary,
            }}
          >
            RI
          </Text>
        </View>

        {/* USER */}
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              gap: 6,
            }}
          >
            <Text
              style={{
                ...typography.body.lg,
                color: colors.textPrimary,
              }}
            >
              {username}
            </Text>

            <View
              style={{
                borderRadius: radius.full,

                paddingHorizontal: 8,
                paddingVertical: 2,
                borderColor: colors.primary,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  ...typography.caption.md,
                  color: colors.textPrimary,
                }}
              >
                {badge}
              </Text>
            </View>
          </View>

          <Text
            style={{
              ...typography.caption.md,
              color: colors.surface,
            }}
          >
            {handle} · {time}
          </Text>
        </View>
      </View>

      {/* CATEGORY */}
      <View
        style={{
          backgroundColor: "#101010",

          borderRadius: radius.full,

          paddingHorizontal: 12,
          paddingVertical: 6,
        }}
      >
        <Text
          style={{
            ...typography.caption.md,
            color: colors.surface,
          }}
        >
          {category}
        </Text>
      </View>
    </View>
  );
}

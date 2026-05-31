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
};

export function FeedPostHeader({ username, handle, time, category }: Props) {
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
              ...typography.label.md,
              color: colors.lime,
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
                color: colors.white,
              }}
            >
              {username}
            </Text>

            <View
              style={{
                // backgroundColor: colors.lime,

                borderRadius: radius.full,

                paddingHorizontal: 8,
                paddingVertical: 2,
                borderColor: colors.lime,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  ...typography.caption.sm,
                  color: colors.white,
                }}
              >
                Clean Build
              </Text>
            </View>
          </View>

          <Text
            style={{
              ...typography.caption.md,
              color: colors.mute,
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
            color: colors.mute,
          }}
        >
          {category}
        </Text>
      </View>
    </View>
  );
}

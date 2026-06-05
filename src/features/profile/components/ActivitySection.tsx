import { Image, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

const activities = [
  {
    id: "1",

    title: "Build Upload",

    image: require("../../../../assets/images/feed/feed-1.jpg"),
  },

  {
    id: "2",

    title: "Night Ride",

    image: require("../../../../assets/images/feed/feed-2.jpg"),
  },

  {
    id: "3",

    title: "New Setup",

    image: require("../../../../assets/images/feed/feed-3.jpeg"),
  },
];

export function ActivitySection() {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,
        borderBottomWidth: 1,
        borderBottomColor: colors.surface,
        paddingVertical: spacing.screen,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          ...typography.heading.lg,

          color: colors.textPrimary,
        }}
      >
        Aktivitas Terakhir
      </Text>

      {/* GRID */}
      <View
        style={{
          marginTop: spacing.lg,

          flexDirection: "row",

          gap: spacing.sm,
        }}
      >
        {activities.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            onPress={() => router.push(`/feed/${item.id}`)}
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                borderRadius: radius.lg,

                overflow: "hidden",

                position: "relative",
              }}
            >
              {/* IMAGE */}
              <Image
                source={item.image}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 132,
                }}
              />

              {/* OVERLAY */}
              <View
                style={{
                  position: "absolute",

                  bottom: 0,
                  left: 0,
                  right: 0,

                  height: 60,

                  backgroundColor: "rgba(0,0,0,0.45)",
                }}
              />

              {/* LABEL */}
              <View
                style={{
                  position: "absolute",

                  bottom: spacing.md,
                  left: spacing.md,
                }}
              >
                <Text
                  style={{
                    ...typography.caption.md,

                    color: colors.textPrimary,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

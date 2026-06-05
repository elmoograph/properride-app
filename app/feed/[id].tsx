import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { router, useLocalSearchParams } from "expo-router";

import { ArrowLeft, Bolt } from "lucide-react-native";

import { colors } from "../../src/constants/colors";
import { radius } from "../../src/constants/radius";
import { spacing } from "../../src/constants/spacing";
import { typography } from "../../src/styles/typography";

import { postsData } from "../../src/features/feed/data/posts.data";
import { icons } from "../../src/constants/icons";

export default function FeedDetailScreen() {
  const { id } = useLocalSearchParams();

  const post = postsData.find((item) => item.id === id);

  if (!post) {
    return null;
  }

  return (
    <>
      <StatusBar hidden />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.textPrimary,
        }}
      >
        {/* BACK BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={{
            position: "absolute",

            top: spacing.screen,
            left: spacing.screen,

            zIndex: 20,

            width: 42,
            height: 42,

            borderRadius: radius.full,

            backgroundColor: "rgba(0,0,0,0.5)",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowLeft size={icons.md} color={colors.textPrimary} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HERO IMAGE */}
          <Image
            source={post.image}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 320,
            }}
          />

          {/* CONTENT */}
          <View
            style={{
              marginTop: -28,

              backgroundColor: colors.background,

              borderTopLeftRadius: spacing["3xl"],

              borderTopRightRadius: spacing["3xl"],

              padding: spacing.screen,
            }}
          >
            {/* CATEGORY */}
            <View
              style={{
                backgroundColor: "#0A0A0A",

                alignSelf: "flex-start",

                borderRadius: radius.full,

                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  ...typography.caption.md,
                  color: colors.primary,
                }}
              >
                {post.category}
              </Text>
            </View>

            {/* USERNAME */}
            <Text
              style={{
                ...typography.heading.lg,

                color: colors.textPrimary,

                marginTop: spacing.sm,
              }}
            >
              {post.username}
            </Text>

            {/* HANDLE */}
            <Text
              style={{
                ...typography.body.md,

                color: colors.surface,

                marginTop: spacing.xs,
              }}
            >
              {post.handle} · {post.time}
            </Text>

            {/* CAPTION */}
            <Text
              style={{
                ...typography.body.md,

                color: colors.textPrimary,

                lineHeight: spacing.screen,

                marginTop: spacing["md"],
              }}
            >
              {post.caption}
            </Text>

            {/* HASHTAGS */}
            <Text
              style={{
                ...typography.body.md,

                color: colors.primary,

                marginTop: spacing.sm,
              }}
            >
              {post.hashtags.join(" ")}
            </Text>

            {/* CTA */}
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                marginTop: spacing["3xl"],

                backgroundColor: colors.primary,

                borderRadius: radius.xl,

                paddingVertical: spacing.lg,

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

                gap: spacing.md,
              }}
            >
              <Bolt size={icons.sm} color={colors.textPrimary} />

              <Text
                style={{
                  ...typography.heading.md,

                  color: colors.textPrimary,
                }}
              >
                Build This Setup — {post.totalPrice}
              </Text>
            </TouchableOpacity>

            {/* BOTTOM SPACE */}
            <View
              style={{
                height: 120,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

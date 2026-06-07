import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { router, useLocalSearchParams } from "expo-router";

import { ArrowLeft, Bolt, Tag } from "lucide-react-native";

import { colors } from "../../src/constants/colors";
import { radius } from "../../src/constants/radius";
import { spacing } from "../../src/constants/spacing";
import { typography } from "../../src/styles/typography";

import { postsData } from "../../src/features/feed/data/posts.data";
import { icons } from "../../src/constants/icons";
import * as Linking from "expo-linking";
import { getProductById } from "@/features/shop/repositories/shop.repository";
import { getPostById } from "@/features/feed/repositories/feed.repository";

export default function FeedDetailScreen() {
  function handleOpenAffiliate(productId: string) {
    const product = getProductById(productId);

    if (!product) {
      return;
    }

    Linking.openURL(product.affiliateUrl);
  }
  const { id } = useLocalSearchParams();
  if (typeof id !== "string") {
    return null;
  }

  const post = getPostById(id);

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
                ...typography.heading.sm,

                color: colors.textPrimary,

                marginTop: spacing.sm,
              }}
            >
              {post.username}
            </Text>

            {/* HANDLE */}
            <Text
              style={{
                ...typography.body.sm,

                color: colors.textSecondary,

                marginTop: spacing.xs,
              }}
            >
              {post.handle} · {post.time}
            </Text>

            <View
              style={{
                paddingVertical: spacing.lg,

                borderBottomWidth: 1,
                borderBottomColor: colors.mute,
              }}
            >
              <Text
                style={{
                  ...typography.body.sm,
                  color: colors.textSecondary,
                }}
              >
                Total Build Cost
              </Text>

              <Text
                style={{
                  ...typography.heading.lg,
                  color: colors.primary,
                }}
              >
                {post.totalPrice}
              </Text>
            </View>

            <View
              style={{
                marginTop: spacing.md,
              }}
            >
              <Text
                style={{
                  ...typography.body.lg,
                  color: colors.textPrimary,
                }}
              >
                Parts Used
              </Text>

              <View
                style={{
                  marginTop: spacing.md,
                  gap: spacing.md,
                }}
              >
                {post.parts.map((part) => (
                  <View
                    key={part.id}
                    style={{
                      padding: spacing.lg,

                      borderWidth: 1,
                      borderColor: "#111111",

                      borderRadius: radius.sm,

                      backgroundColor: "#050505",

                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        ...typography.body.md,
                        color: colors.textPrimary,
                      }}
                    >
                      {part.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",

                        gap: spacing.md,
                      }}
                    >
                      <Text
                        style={{
                          ...typography.body.md,
                          color: colors.textSecondary,
                        }}
                      >
                        {part.price}
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleOpenAffiliate(part.productId)}
                      >
                        <Tag size={icons.sm} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { FeedCategory } from "../types/feed.types";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { radius } from "@/constants/radius";
import { typography } from "@/styles/typography";

type Props = {
  categories: FeedCategory[];

  activeCategory: FeedCategory;

  onChangeCategory: (category: FeedCategory) => void;
};

export function FeedCategories({
  categories,
  activeCategory,
  onChangeCategory,
}: Props) {
  return (
    <View
      style={{
        marginTop: spacing.xl,
        marginBottom: spacing.lg,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.screen,

          gap: spacing.sm,
        }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.8}
              onPress={() => onChangeCategory(category)}
              style={{
                paddingHorizontal: spacing.lg,

                paddingVertical: spacing.sm,

                borderRadius: radius.full,

                borderWidth: 1,

                borderColor: isActive ? colors.primary : colors.surface,

                backgroundColor: isActive ? colors.primary : "transparent",
              }}
            >
              <Text
                style={{
                  ...typography.body.sm,

                  color: isActive ? colors.background : colors.textPrimary,
                }}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

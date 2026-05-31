import { ScrollView, Text, TouchableOpacity } from "react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { categoriesData } from "../data/categories.data";

type Props = {
  active: string;

  onChange: (value: string) => void;
};

export function FeedCategories({ active, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: spacing.screen,

        gap: spacing.md,

        paddingVertical: spacing.screen,
        borderBottomWidth: 1,
        borderColor: colors.grey,
      }}
    >
      {categoriesData.map((item) => {
        const isActive = active === item;

        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            onPress={() => onChange(item)}
            style={{
              backgroundColor: isActive ? colors.lime : colors.grey,

              paddingHorizontal: spacing.md,
              paddingVertical: spacing.xs,

              borderRadius: radius.full,
            }}
          >
            <Text
              style={{
                ...typography.label.md,

                color: isActive ? colors.primarytext : colors.mute,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

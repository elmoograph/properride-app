import { Text, View } from "react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

type Props = {
  caption: string;

  hashtags: string[];
};

export function FeedPostCaption({ caption, hashtags }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

        marginTop: spacing.md,
      }}
    >
      <Text
        style={{
          ...typography.body.md,
          color: colors.white,

          lineHeight: spacing.xl,
        }}
      >
        {caption}
      </Text>

      <Text
        style={{
          ...typography.body.sm,
          color: colors.lime,

          marginTop: spacing.sm,
        }}
      >
        {hashtags.join(" ")}
      </Text>
    </View>
  );
}

import { Text, View } from "react-native";

import { Heart, MessageCircle, Share2 } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";

type Props = {
  likes: string;

  comments: string;
};

function ActionItem({
  icon,
  value,
}: {
  icon: React.ReactNode;

  value?: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        gap: 6,
      }}
    >
      {icon}

      {value && (
        <Text
          style={{
            ...typography.body.md,
            color: colors.textPrimary,
          }}
        >
          {value}
        </Text>
      )}
    </View>
  );
}

export function FeedPostActions({ likes, comments }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

        marginTop: spacing.md,

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

          gap: spacing.lg,
        }}
      >
        <ActionItem
          icon={<Heart size={icons.md} color={colors.textPrimary} />}
          value={likes}
        />

        <ActionItem
          icon={<MessageCircle size={icons.md} color={colors.textPrimary} />}
          value={comments}
        />

        <ActionItem
          icon={<Share2 size={icons.md} color={colors.textPrimary} />}
        />
      </View>

      {/* RIGHT */}
      {/* <Bookmark size={icons.md} color={colors.textPrimary} /> */}
    </View>
  );
}

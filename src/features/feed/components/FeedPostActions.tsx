import { Text, View } from "react-native";

import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

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
            color: colors.mute,
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

        marginTop: spacing.lg,

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
          icon={<Heart size={22} color={colors.mute} />}
          value={likes}
        />

        <ActionItem
          icon={<MessageCircle size={22} color={colors.mute} />}
          value={comments}
        />

        <ActionItem icon={<Share2 size={20} color={colors.mute} />} />
      </View>

      {/* RIGHT */}
      <Bookmark size={20} color={colors.mute} />
    </View>
  );
}

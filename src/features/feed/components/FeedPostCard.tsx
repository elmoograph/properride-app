import { View } from "react-native";

import { FeedPost } from "../types/feed.types";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

import { FeedPostActions } from "./FeedPostActions";
import { FeedPostCaption } from "./FeedPostCaption";
import { FeedPostHeader } from "./FeedPostHeader";
import { FeedPostImage } from "./FeedPostImage";
import { spacing } from "../../../constants/spacing";
import { FeedPostCTA } from "./FeedPostCTA";
import { colors } from "../../../constants/colors";

type Props = {
  post: FeedPost;
};

export function FeedPostCard({ post }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.96}
      onPress={() => router.push(`/feed/${post.id}`)}
    >
      <View
        style={{
          marginTop: spacing["2xl"],
          paddingBottom: spacing["2xl"],
          borderBottomWidth: 1,
          borderColor: colors.surface,
        }}
      >
        <FeedPostHeader
          username={post.username}
          handle={post.handle}
          time={post.time}
          category={post.category}
          badge={post.badge}
        />

        <FeedPostImage image={post.image} />

        <FeedPostActions likes={post.likes} comments={post.comments} />

        <FeedPostCaption caption={post.caption} hashtags={post.hashtags} />
        <FeedPostCTA totalPrice={post.totalPrice} />
      </View>
    </TouchableOpacity>
  );
}

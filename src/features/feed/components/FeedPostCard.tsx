import { View } from "react-native";

import { FeedPost } from "../types/feed.types";

import { FeedPostActions } from "./FeedPostActions";
import { FeedPostCaption } from "./FeedPostCaption";
import { FeedPostHeader } from "./FeedPostHeader";
import { FeedPostImage } from "./FeedPostImage";
import { spacing } from "../../../constants/spacing";

type Props = {
  post: FeedPost;
};

export function FeedPostCard({ post }: Props) {
  return (
    <View
      style={{
        marginTop: spacing.lg,
      }}
    >
      <FeedPostHeader
        username={post.username}
        handle={post.handle}
        time={post.time}
        category={post.category}
      />

      <FeedPostImage image={post.image} />

      <FeedPostActions likes={post.likes} comments={post.comments} />

      <FeedPostCaption caption={post.caption} hashtags={post.hashtags} />
    </View>
  );
}

import { ScrollView, View } from "react-native";
import { useMemo, useState } from "react";

import { StatusBar } from "expo-status-bar";

import { colors } from "../../src/constants/colors";

import { FeedHeader } from "../../src/features/feed/components/FeedHeader";
import { postsData } from "../../src/features/feed/data/posts.data";
import { FeedPostCard } from "../../src/features/feed/components/FeedPostCard";

export default function FeedScreen() {
  const [activeCategory, setActiveCategory] = useState("For You");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "For You") {
      return postsData;
    }

    return postsData.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <StatusBar hidden />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.primarytext,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingBottom: 140,
          }}
        >
          <FeedHeader
            activeCategory={activeCategory}
            onChangeCategory={setActiveCategory}
          />

          {filteredPosts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

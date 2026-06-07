import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

import {
  FeedTopbar,
  FeedCategories,
  FeedPostCard,
} from "@/features/feed/components";

import {
  getFeedPosts,
  getCategories,
} from "@/features/feed/repositories/feed.repository";

import { useMemo, useState } from "react";
import { FeedCategory } from "@/features/feed/types/feed.types";

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const categories = getCategories();

  const posts = getFeedPosts();

  const [activeCategory, setActiveCategory] = useState<FeedCategory>("All");
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return posts;
    }

    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <StatusBar hidden />

        <ScrollView showsVerticalScrollIndicator={false}>
          <FeedTopbar />

          <FeedCategories
            categories={categories}
            activeCategory={activeCategory}
            onChangeCategory={setActiveCategory}
          />

          {filteredPosts.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

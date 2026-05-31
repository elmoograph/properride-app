import { View } from "react-native";

import { spacing } from "../../../constants/spacing";

import { FeedCategories } from "./FeedCategories";
import { FeedTopbar } from "./FeedTopbar";

export function FeedHeader() {
  return (
    <View
      style={{
        paddingTop: spacing.lg,
      }}
    >
      <FeedTopbar />

      <FeedCategories />
    </View>
  );
}

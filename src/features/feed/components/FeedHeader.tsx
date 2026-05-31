import { View } from "react-native";

import { spacing } from "../../../constants/spacing";

import { FeedCategories } from "./FeedCategories";
import { FeedTopbar } from "./FeedTopbar";

type Props = {
  activeCategory: string;

  onChangeCategory: (value: string) => void;
};

export function FeedHeader({ activeCategory, onChangeCategory }: Props) {
  return (
    <View
      style={{
        paddingTop: spacing.lg,
      }}
    >
      <FeedTopbar />

      <FeedCategories active={activeCategory} onChange={onChangeCategory} />
    </View>
  );
}

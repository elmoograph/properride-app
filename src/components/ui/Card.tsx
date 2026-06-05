import { View, ViewStyle } from "react-native";

import { colors } from "@/constants/colors";
import { card } from "@/constants/card";

type Props = {
  children: React.ReactNode;

  padding?: keyof typeof card.padding;

  radius?: keyof typeof card.radius;

  onPress?: () => void;

  style?: ViewStyle;
};

export function Card({
  children,
  padding = "md",
  radius = "md",
  style,
}: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,

          borderRadius: card.radius[radius],

          padding: card.padding[padding],
        },

        style,
      ]}
    >
      {children}
    </View>
  );
}

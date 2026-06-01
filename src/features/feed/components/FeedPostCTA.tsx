import { Text, TouchableOpacity, View } from "react-native";

import { Bolt } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

type Props = {
  totalPrice: string;
};

export function FeedPostCTA({ totalPrice }: Props) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

        marginTop: spacing.md,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          borderWidth: 1,
          borderColor: "#1A1A1A",

          backgroundColor: "#0A0A0A",

          borderRadius: radius.sm,

          paddingVertical: spacing.xs,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",

          gap: spacing.md,
        }}
      >
        <Bolt size={16} color={colors.lime} />

        <Text
          style={{
            ...typography.body.md,
            color: colors.lime,
          }}
        >
          Build This Setup — {totalPrice}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

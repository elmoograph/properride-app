import { Image, View } from "react-native";

import { Bolt } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";

type Props = {
  image: any;
};

export function FeedPostImage({ image }: Props) {
  return (
    <View
      style={{
        marginTop: spacing.lg,

        // paddingHorizontal: spacing.screen,
      }}
    >
      <View
        style={{
          position: "relative",
        }}
      >
        <Image
          source={image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 320,

            // borderRadius: radius.xl,
          }}
        />

        {/* BOOST BADGE */}
        <View
          style={{
            position: "absolute",

            right: 14,
            bottom: 14,

            backgroundColor: "rgba(0,0,0,0.7)",

            borderRadius: radius.full,

            paddingHorizontal: 18,
            paddingVertical: 8,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            gap: 8,
          }}
        >
          <Bolt size={14} color={colors.lime} />
        </View>
      </View>
    </View>
  );
}

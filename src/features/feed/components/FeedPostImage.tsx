import { Image, View } from "react-native";

import { Bookmark } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { icons } from "../../../constants/icons";

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

            backgroundColor: colors.primary,

            borderRadius: radius.full,

            paddingHorizontal: 10,
            paddingVertical: 10,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            gap: 8,
          }}
        >
          <Bookmark size={icons.md} color={colors.background} />
        </View>
      </View>
    </View>
  );
}

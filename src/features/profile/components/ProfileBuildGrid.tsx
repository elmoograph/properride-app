import { Image, View } from "react-native";

import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";

const builds = [
  require("../../../../assets/images/feed/feed-1.jpg"),
  require("../../../../assets/images/feed/feed-2.jpg"),
  require("../../../../assets/images/feed/feed-3.jpeg"),
  require("../../../../assets/images/feed/feed-4.jpg"),
];

export function ProfileBuildGrid() {
  return (
    <View
      style={{
        marginTop: spacing.xl,

        paddingHorizontal: spacing.screen,

        flexDirection: "row",
        flexWrap: "wrap",

        justifyContent: "space-between",

        gap: spacing.md,
      }}
    >
      {builds.map((item, index) => (
        <Image
          key={index}
          source={item}
          resizeMode="cover"
          style={{
            width: "48%",
            height: 180,

            borderRadius: radius.xl,
          }}
        />
      ))}
    </View>
  );
}

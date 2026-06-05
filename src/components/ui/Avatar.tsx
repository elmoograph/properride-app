import { Image, Text, View } from "react-native";

import { colors } from "@/constants/colors";

type Props = {
  image?: string;

  initials?: string;

  size?: number;
};

export function Avatar({ image, initials = "PR", size = 40 }: Props) {
  if (image) {
    return (
      <Image
        source={{ uri: image }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,

        borderRadius: size / 2,

        backgroundColor: colors.primary,

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: colors.background,

          fontWeight: "700",
        }}
      >
        {initials}
      </Text>
    </View>
  );
}

import { Image, TouchableOpacity } from "react-native";

import { radius } from "../../../constants/radius";

type Props = {
  onPress?: () => void;
  image: string;
};

export function GarageGalleryItem({ image, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        flex: 1,
      }}
    >
      <Image
        source={
          image
            ? { uri: image }
            : require("../../../../assets/images/garage-hero.png")
        }
        resizeMode="cover"
        style={{
          width: "100%",
          height: 180,

          borderRadius: radius.lg,
        }}
      />
    </TouchableOpacity>
  );
}

import { Image, TouchableOpacity } from "react-native";

import { radius } from "../../../constants/radius";

type Props = {
  image: any;
};

export function GarageGalleryItem({ image }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        flex: 1,
      }}
    >
      <Image
        source={image}
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

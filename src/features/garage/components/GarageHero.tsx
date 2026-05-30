import { Image, Text, TouchableOpacity, View } from "react-native";

import { Settings2 } from "lucide-react-native";
import HeroImage from "../../../../assets/images/garage-hero.png";
import { colors } from "../../../constants/colors";
import { typography } from "../../../styles/typography";
import { spacing } from "../../../constants/spacing";
import { radius } from "../../../constants/radius";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export function GarageHero() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: "100%",
        height: 224,

        // borderRadius: 24,
        overflow: "hidden",

        position: "relative",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Image
        source={HeroImage}
        resizeMode="cover"
        style={{
          position: "absolute",

          width: "100%",
          height: "100%",
        }}
      />

      {/* OVERLAY CONTENT */}
      <View
        style={{
          flex: 1,

          paddingTop: 10 + insets.top,
          paddingHorizontal: spacing.screen,

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* MOTOR TYPE */}
        <View
          style={{
            backgroundColor: colors.lime,

            paddingHorizontal: 12,
            paddingVertical: 4,

            borderRadius: radius.full,
          }}
        >
          <Text
            style={{
              ...typography.body.sm,

              color: colors.primarytext,
            }}
          >
            NMAX 155
          </Text>
        </View>

        {/* EDIT BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,

            backgroundColor: "rgba(255,255,255,0.10)",

            paddingHorizontal: 10,
            paddingVertical: 7,

            borderRadius: radius.sm,
          }}
        >
          <Settings2 size={14} color={colors.white} />

          <Text
            style={{
              ...typography.body.sm,

              color: colors.white,
            }}
          >
            Edit Garage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

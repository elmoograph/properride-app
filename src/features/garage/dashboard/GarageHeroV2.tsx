import { Image, Text, View, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { ChevronDown } from "lucide-react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { radius } from "@/constants/radius";
import { typography } from "@/styles/typography";

type Props = {
  imageUrl?: string | null;

  name: string;

  nickname?: string | null;

  onPressMotorcycle?: () => void;
};

export function GarageHeroV2({
  imageUrl,
  name,
  nickname,
  onPressMotorcycle,
}: Props) {
  return (
    <View
      style={{
        width: "100%",
        height: 300,
        position: "relative",
      }}
    >
      {/* IMAGE */}
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../../../assets/images/garage-hero.png")
        }
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      {/* OVERLAY */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.85)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      {/* CONTENT */}
      <View
        style={{
          position: "absolute",

          left: spacing.screen,
          right: spacing.screen,

          bottom: 40,
        }}
      >
        <Text
          style={{
            ...typography.heading.xl,

            color: "#fff",
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            ...typography.body.md,

            color: "rgba(255,255,255,0.8)",

            marginTop: 4,
          }}
        >
          {nickname || "Street Build"}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressMotorcycle}
          style={{
            marginTop: spacing.lg,

            alignSelf: "flex-start",

            backgroundColor: "rgba(255,255,255,0.12)",

            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.15)",

            borderRadius: radius.full,

            paddingHorizontal: 16,
            paddingVertical: 10,

            flexDirection: "row",
            alignItems: "center",

            gap: 6,
          }}
        >
          <Text
            style={{
              color: "#fff",

              fontWeight: "600",
            }}
          >
            Switch Motorcycle
          </Text>

          <ChevronDown size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

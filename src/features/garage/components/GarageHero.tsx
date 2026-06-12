import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { Settings2 } from "lucide-react-native";
import HeroImage from "../../../../assets/images/garage-hero.png";
import { colors } from "../../../constants/colors";
import { typography } from "../../../styles/typography";
import { spacing } from "../../../constants/spacing";
import { radius } from "../../../constants/radius";

import { pickMotorcycleImage } from "@/features/motorcycles/services/image-picker.service";
import { uploadMotorcycleImage } from "@/features/motorcycles/repositories/upload.repository";
import { updateMotorcycleImage } from "@/features/motorcycles/repositories/motorcycle.repository";
import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";
import { Motorcycle } from "@/features/motorcycles/types/motorcycle.types";

import { setFeaturedMotorcycle } from "@/features/motorcycles/repositories/motorcycle.repository";

import { useGarage } from "@/features/garage/hooks/useGarage";

import { Alert } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp } from "../../../utils/responsive";
import { icons } from "../../../constants/icons";
import { MotorcycleSelector } from "@/features/motorcycles/components/MotorcycleSelector";

type Props = {
  motorcycleName?: string;

  motorcycles: Motorcycle[];

  featuredMotorcycle: Motorcycle | null;
};

export function GarageHero({ motorcycleName }: Props) {
  const insets = useSafeAreaInsets();
  const { garage } = useGarage();
  const { motorcycles, featuredMotorcycle, refreshMotorcycles } =
    useMotorcycles();

  async function handleUploadImage() {
    try {
      if (!featuredMotorcycle?.id) {
        Alert.alert("Motorcycle not found");
        return;
      }

      const asset = await pickMotorcycleImage();

      if (!asset) {
        return;
      }

      const imageUrl = await uploadMotorcycleImage(
        featuredMotorcycle.id,
        asset.uri,
      );

      console.log("IMAGE URL", imageUrl);

      await updateMotorcycleImage(featuredMotorcycle.id, imageUrl);

      await refreshMotorcycles();

      Alert.alert("Success", "Photo updated");
    } catch (error: any) {
      Alert.alert("Upload Failed", error.message);
    }
  }

  async function handleSelectMotorcycle(motorcycleId: string) {
    if (!garage?.id) return;

    await setFeaturedMotorcycle(garage.id, motorcycleId);

    await refreshMotorcycles();
  }
  return (
    <View
      style={{
        width: "100%",
        height: hp(40),

        overflow: "hidden",

        position: "relative",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Image
        source={
          featuredMotorcycle?.image_url
            ? { uri: featuredMotorcycle.image_url }
            : HeroImage
        }
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

          paddingTop: spacing.md + insets.top,
          paddingHorizontal: spacing.screen,

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* MOTOR TYPE */}
        <MotorcycleSelector
          motorcycles={motorcycles}
          featuredMotorcycle={featuredMotorcycle}
          onSelect={handleSelectMotorcycle}
        />

        {/* EDIT BUTTON */}
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/motorcycles")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,

            backgroundColor: "rgba(0,0,0,0.75)",

            paddingHorizontal: 10,
            paddingVertical: 7,

            borderRadius: radius.sm,
          }}
        >
          <Settings2 size={icons.xs} color={colors.textPrimary} />

          <Text
            style={{
              ...typography.body.sm,
              color: colors.textPrimary,
            }}
          >
            Manage Motorcycles
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

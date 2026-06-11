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

import { Alert } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp } from "../../../utils/responsive";
import { icons } from "../../../constants/icons";

type Props = {
  motorcycleName?: string;
};

export function GarageHero({ motorcycleName }: Props) {
  const insets = useSafeAreaInsets();
  const { featuredMotorcycle, refreshMotorcycles } = useMotorcycles();

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
  return (
    <View
      style={{
        width: "100%",
        height: hp(28),

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
            backgroundColor: colors.primary,

            paddingHorizontal: 12,
            paddingVertical: 4,

            borderRadius: radius.full,
          }}
        >
          <Text
            style={{
              ...typography.body.sm,

              color: colors.background,
            }}
          >
            {motorcycleName ?? "No Motorcycle"}
          </Text>
        </View>

        {/* EDIT BUTTON */}
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </View>
  );
}

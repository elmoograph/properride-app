import { Image, Text, View } from "react-native";

import { Wrench, Clock3, Image as ImageIcon } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { radius } from "../../../constants/radius";

import ProfileImage from "../../../../assets/images/profile-photo.jpg";
import { icons } from "../../../constants/icons";
import { UserData } from "../types/garage.types";

function StatusItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        {icon}

        <Text
          style={{
            ...typography.body.lg,
            color: colors.textPrimary,
          }}
        >
          {value}
        </Text>
      </View>

      <Text
        style={{
          ...typography.body.sm,
          color: colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

type Props = {
  totalParts: number;
  totalEvents: number;
  totalPhotos: number;
};

export function GarageProfile({ totalParts, totalEvents, totalPhotos }: Props) {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: spacing.screen,
        alignItems: "center",
        elevation: 10,
        marginTop: -10,
        justifyContent: "space-between",
      }}
    >
      {/* PROFILE PHOTO */}
      {/* <View
        style={{
          padding: 4,

          borderWidth: 2,
          borderColor: colors.primary,

          borderRadius: radius.full,
        }}
      >
        <Image
          source={ProfileImage}
          resizeMode="cover"
          style={{
            width: 72,
            height: 72,

            borderRadius: radius.full,
          }}
        />
      </View> */}

      {/* STATUS */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",

          flexShrink: 1,
          flexWrap: "wrap",
          // marginLeft: spacing.lg,
          marginTop: spacing["3xl"],
          // alignContent: "center",
          gap: spacing["4xl"],
        }}
      >
        <StatusItem
          icon={<Wrench size={icons.xs} color={colors.primary} />}
          value={String(totalParts)}
          label="Parts"
        />

        <StatusItem
          icon={<Clock3 size={icons.xs} color={colors.primary} />}
          value={String(totalEvents)}
          label="Timeline"
        />

        <StatusItem
          icon={<ImageIcon size={icons.xs} color={colors.primary} />}
          value={String(totalPhotos)}
          label="Photos"
        />
      </View>
    </View>
  );
}

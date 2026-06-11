import { Image, Text, View } from "react-native";

import { Eye, UsersRound, Wrench } from "lucide-react-native";

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
  totalMotorcycles: number;
  totalBuildCost: number;
};

export function GarageProfile({
  totalParts,
  totalMotorcycles,
  totalBuildCost,
}: Props) {
  return (
    <View
      style={{
        width: "100%",

        paddingHorizontal: spacing.screen,

        flexDirection: "row",
        alignItems: "center",
        zIndex: 10,
        elevation: 10,
        marginTop: -10,
        gap: spacing.lg,
      }}
    >
      {/* PROFILE PHOTO */}
      <View
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
      </View>

      {/* STATUS */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",

          flexShrink: 1,
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: spacing.lg,
          marginLeft: spacing.lg,
        }}
      >
        <StatusItem
          icon={<Wrench size={icons.xs} color={colors.primary} />}
          value="0"
          label="Parts"
        />

        <StatusItem
          icon={<UsersRound size={icons.xs} color={colors.primary} />}
          value="1"
          label="Motorcycles"
        />

        <StatusItem
          icon={<Eye size={icons.xs} color={colors.primary} />}
          value="Rp 0"
          label="Build Cost"
        />
      </View>
    </View>
  );
}

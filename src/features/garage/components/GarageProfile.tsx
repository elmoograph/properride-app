import { Image, Text, View } from "react-native";

import { Eye, UsersRound, Wrench } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { radius } from "../../../constants/radius";

import ProfileImage from "../../../../assets/images/profile-photo.jpg";
import { statsData } from "../data/stats.data";
import { levelData } from "../data/level.data";
import { userData } from "../data/user.data";
import { icons } from "../../../constants/icons";

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
        gap: 2,
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
            ...typography.heading.md,
            color: colors.textPrimary,
          }}
        >
          {value}
        </Text>
      </View>

      <Text
        style={{
          ...typography.caption.md,
          color: colors.surface,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export function GarageProfile() {
  return (
    <View
      style={{
        width: "100%",

        paddingHorizontal: spacing.screen,

        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        zIndex: 10,
        elevation: 10,
        marginTop: -20,
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
          icon={<UsersRound size={icons.xs} color={colors.primary} />}
          value={userData.followers}
          label="Followers"
        />

        <StatusItem
          icon={<Eye size={icons.xs} color={colors.primary} />}
          value={userData.views}
          label="Views"
        />

        <StatusItem
          icon={<Wrench size={icons.xs} color={colors.primary} />}
          value={userData.parts}
          label="Parts"
        />
      </View>
    </View>
  );
}

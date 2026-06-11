import { Image, Text, TouchableOpacity, View } from "react-native";

import { MapPin, UsersRound, UserPlus, Grid3x3 } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { Profile } from "../../../types/database";
import HeroImage from "../../../../assets/images/feed/feed-1.jpg";
import { icons } from "../../../constants/icons";

type Props = {
  profile: Profile;
};

function StatCard({
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
        flex: 1,

        borderRadius: radius.sm,

        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          gap: spacing.sm,
        }}
      >
        {icon}

        <Text
          style={{
            ...typography.body.md,
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

export function ProfileHero({ profile }: Props) {
  return (
    <View
      style={{
        marginTop: spacing.screen,

        marginHorizontal: spacing.screen,

        // backgroundColor: colors.background,

        borderRadius: radius.sm,

        overflow: "hidden",
      }}
    >
      {/* BANNER */}
      <Image
        source={HeroImage}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 100,

          // opacity: 0.4,
        }}
      />

      {/* CONTENT */}
      <View
        style={{
          padding: spacing.screen,
        }}
      >
        {/* TOP */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            // marginTop: -52,
          }}
        >
          {/* AVATAR */}
          <View
            style={{
              width: 90,
              height: 90,

              borderRadius: radius.full,

              backgroundColor: colors.primary,

              borderWidth: 4,
              borderColor: colors.background,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...typography.heading.xl,
                color: colors.background,
              }}
            >
              {profile.avatar}
            </Text>
          </View>

          {/* EDIT BUTTON */}
          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={{
              //   marginTop: 44,

              backgroundColor: colors.background,

              borderWidth: 1,
              borderColor: colors.surface,

              borderRadius: radius.sm,

              paddingHorizontal: spacing.lg,

              paddingVertical: spacing.sm,
            }}
          >
            <Text
              style={{
                ...typography.caption.md,
                color: colors.textPrimary,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* USER INFO */}
        <View
          style={{
            marginTop: spacing.sm,
          }}
        >
          <Text
            style={{
              ...typography.heading.lg,
              color: colors.textPrimary,
            }}
          >
            {profile.name}
          </Text>

          <Text
            style={{
              ...typography.body.md,
              color: colors.primary,

              marginTop: spacing.xs,
            }}
          >
            {profile.username}
          </Text>

          <View
            style={{
              marginTop: spacing.xs,

              flexDirection: "row",
              alignItems: "center",

              gap: spacing.xs,
            }}
          >
            <MapPin size={icons.xs} color={colors.textSecondary} />

            <Text
              style={{
                ...typography.caption.md,
                color: colors.textSecondary,
              }}
            >
              {profile.location}
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View
          style={{
            marginTop: spacing.md,

            flexDirection: "row",

            gap: spacing.md,
          }}
        >
          <StatCard
            icon={<UsersRound size={icons.sm} color={colors.primary} />}
            value={String(profile.followers)}
            label="Followers"
          />

          <StatCard
            icon={<UserPlus size={icons.sm} color={colors.primary} />}
            value={String(profile.following)}
            label="Followings"
          />

          <StatCard
            icon={<Grid3x3 size={icons.sm} color={colors.primary} />}
            value={String(profile.posts)}
            label="Posts"
          />
        </View>
      </View>
    </View>
  );
}

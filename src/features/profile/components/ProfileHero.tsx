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
          ...typography.caption.md,
          color: colors.surface,
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

        backgroundColor: colors.background,

        borderRadius: radius.lg,

        borderWidth: 1,
        borderColor: colors.surface,

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

          opacity: 0.4,
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

            marginTop: -52,
          }}
        >
          {/* AVATAR */}
          <View
            style={{
              width: 74,
              height: 74,

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
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>

        {/* USER INFO */}
        <View
          style={{
            marginTop: spacing.lg,
          }}
        >
          <Text
            style={{
              ...typography.heading.xl,
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
            <MapPin size={icons.xs} color={colors.surface} />

            <Text
              style={{
                ...typography.caption.md,
                color: colors.surface,
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
            icon={<UsersRound size={icons.xs} color={colors.primary} />}
            value={profile.stats.followers}
            label="Followers"
          />

          <StatCard
            icon={<UserPlus size={icons.xs} color={colors.primary} />}
            value={profile.stats.following}
            label="Followings"
          />

          <StatCard
            icon={<Grid3x3 size={icons.xs} color={colors.primary} />}
            value={profile.stats.posts}
            label="Posts"
          />
        </View>
      </View>
    </View>
  );
}

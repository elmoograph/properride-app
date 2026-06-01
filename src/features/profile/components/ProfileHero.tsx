import { Image, Text, TouchableOpacity, View } from "react-native";

import { Heart, MapPin, Star, UsersRound } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { profileData } from "../data/profile.data";

import HeroImage from "../../../../assets/images/feed/feed-1.jpg";

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
            color: colors.white,
          }}
        >
          {value}
        </Text>
      </View>

      <Text
        style={{
          ...typography.caption.md,
          color: colors.mute,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export function ProfileHero() {
  return (
    <View
      style={{
        marginTop: spacing.screen,

        marginHorizontal: spacing.screen,

        backgroundColor: colors.primarytext,

        borderRadius: radius.lg,

        borderWidth: 1,
        borderColor: colors.grey,

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

              backgroundColor: colors.lime,

              borderWidth: 4,
              borderColor: colors.primarytext,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...typography.heading.xl,
                color: colors.primarytext,
              }}
            >
              {profileData.avatar}
            </Text>
          </View>

          {/* EDIT BUTTON */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              //   marginTop: 44,

              backgroundColor: colors.primarytext,

              borderWidth: 1,
              borderColor: colors.grey,

              borderRadius: radius.sm,

              paddingHorizontal: spacing.lg,

              paddingVertical: spacing.sm,
            }}
          >
            <Text
              style={{
                ...typography.label.md,
                color: colors.white,
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
              color: colors.white,
            }}
          >
            {profileData.name}
          </Text>

          <Text
            style={{
              ...typography.body.md,
              color: colors.lime,

              marginTop: spacing.xs,
            }}
          >
            {profileData.username}
          </Text>

          <View
            style={{
              marginTop: spacing.xs,

              flexDirection: "row",
              alignItems: "center",

              gap: spacing.xs,
            }}
          >
            <MapPin size={14} color={colors.mute} />

            <Text
              style={{
                ...typography.caption.md,
                color: colors.mute,
              }}
            >
              {profileData.location}
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
            icon={<UsersRound size={14} color={colors.lime} />}
            value={profileData.stats.followers}
            label="Followers"
          />

          <StatCard
            icon={<Heart size={14} color={colors.lime} />}
            value={profileData.stats.likes}
            label="Likes"
          />

          <StatCard
            icon={<Star size={14} color={colors.lime} />}
            value={profileData.stats.garage}
            label="Garage"
          />
        </View>
      </View>
    </View>
  );
}

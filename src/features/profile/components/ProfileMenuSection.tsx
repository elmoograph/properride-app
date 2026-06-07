import { View } from "react-native";

import { Bookmark, Heart, UsersRound } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";

import { ProfileMenuItem } from "./ProfileMenuItem";
import { icons } from "../../../constants/icons";

export function ProfileMenuSection() {
  return (
    <View
      style={{
        marginTop: spacing.xl,

        marginHorizontal: spacing.screen,

        backgroundColor: "#050505",

        borderWidth: 1,
        borderColor: colors.mute,

        borderRadius: radius.sm,

        overflow: "hidden",
      }}
    >
      <ProfileMenuItem
        icon={<Bookmark size={icons.sm} color={colors.primary} />}
        title="Saved Setups"
        count="12"
      />

      <ProfileMenuItem
        icon={<Heart size={icons.sm} color={colors.primary} />}
        title="Wishlist"
        count="7"
      />

      <ProfileMenuItem
        icon={<UsersRound size={icons.sm} color={colors.primary} />}
        title="Following"
        count="34"
      />
    </View>
  );
}

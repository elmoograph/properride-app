import { View } from "react-native";

import { Bookmark, Heart, UsersRound } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";

import { ProfileMenuItem } from "./ProfileMenuItem";

export function ProfileMenuSection() {
  return (
    <View
      style={{
        marginTop: spacing["2xl"],

        marginHorizontal: spacing.screen,

        backgroundColor: "#050505",

        borderWidth: 1,
        borderColor: "#111111",

        borderRadius: radius.lg,

        overflow: "hidden",
      }}
    >
      <ProfileMenuItem
        icon={<Bookmark size={18} color={colors.lime} />}
        title="Saved Setups"
        count="12"
      />

      <ProfileMenuItem
        icon={<Heart size={18} color={colors.lime} />}
        title="Wishlist"
        count="7"
      />

      <ProfileMenuItem
        icon={<UsersRound size={18} color={colors.lime} />}
        title="Following"
        count="34"
      />
    </View>
  );
}

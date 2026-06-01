import { Text, TouchableOpacity, View } from "react-native";

import { Settings2 } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

export function ProfileHeader() {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          ...typography.heading.lg,
          color: colors.white,
        }}
      >
        Profile
      </Text>

      {/* SETTINGS */}
      <TouchableOpacity activeOpacity={0.8}>
        <Settings2 size={20} color={colors.mute} />
      </TouchableOpacity>
    </View>
  );
}

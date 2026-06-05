import { Text, TouchableOpacity, View } from "react-native";

import { Settings2 } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";

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
        borderBottomColor: colors.surface,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          ...typography.heading.lg,
          color: colors.textPrimary,
        }}
      >
        Profile
      </Text>

      {/* SETTINGS */}
      <TouchableOpacity activeOpacity={0.8}>
        <Settings2 size={icons.md} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
}

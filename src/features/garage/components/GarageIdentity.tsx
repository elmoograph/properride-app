import { Text, TouchableOpacity, View } from "react-native";

import { Plus } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { radius } from "../../../constants/radius";
import { userData } from "../data/user.data";

export function GarageIdentity() {
  return (
    <View
      style={{
        width: "100%",

        marginTop: 10,

        paddingHorizontal: spacing.screen,
      }}
    >
      {/* NAME */}
      <Text
        style={{
          ...typography.heading.sm,
          color: colors.textPrimary,
        }}
      >
        {userData.name}
      </Text>
      {/* USERNAME */}
      <Text
        style={{
          ...typography.body.sm,
          color: colors.surface,

          marginTop: 4,
        }}
      >
        {userData.username} · {userData.location}
      </Text>
    </View>
  );
}

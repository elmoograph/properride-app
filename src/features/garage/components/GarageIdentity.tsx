import { Text, TouchableOpacity, View } from "react-native";

import { Plus } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { radius } from "../../../constants/radius";
import { UserData } from "../types/garage.types";

type Props = {
  garageName: string;
  location: string;
  motorcycleBrand?: string;
  motorcycleModel?: string;
};

export function GarageIdentity({
  garageName,
  location,
  motorcycleBrand,
  motorcycleModel,
}: Props) {
  return (
    <View
      style={{
        width: "100%",

        paddingHorizontal: spacing.screen,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.mute,
      }}
    >
      {/* NAME */}
      <Text
        style={{
          ...typography.heading.md,
          color: colors.textPrimary,
        }}
      >
        {garageName}
      </Text>
      {/* USERNAME */}
      <Text
        style={{
          ...typography.body.sm,
          color: colors.textSecondary,

          marginTop: 4,
        }}
      >
        {motorcycleBrand} {motorcycleModel} · {location}
      </Text>
    </View>
  );
}

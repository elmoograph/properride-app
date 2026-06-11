import { Text, View } from "react-native";

import { BadgeCheck, Tag } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";
import { spacing } from "@/constants/spacing";

import { MotorcyclePart } from "@/features/parts/types/part.types";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

type Props = {
  part: MotorcyclePart;
};

export function GarageSetupItem({ part }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/parts/${part.id}`)}
      style={{
        paddingVertical: spacing.lg,

        borderBottomWidth: 1,
        borderBottomColor: colors.mute,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <BadgeCheck size={icons.sm} color={colors.primary} />

        <View>
          <Text
            style={{
              ...typography.body.md,
              color: colors.textPrimary,
            }}
          >
            {part.name}
          </Text>

          <Text
            style={{
              ...typography.caption.md,
              color: colors.textSecondary,
            }}
          >
            {part.brand ?? "-"}
          </Text>
        </View>
      </View>

      {/* RIGHT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          style={{
            ...typography.body.md,
            color: colors.textSecondary,
          }}
        >
          {`Rp ${(part.price ?? 0).toLocaleString("id-ID")}`}
        </Text>

        <Tag size={icons.sm} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

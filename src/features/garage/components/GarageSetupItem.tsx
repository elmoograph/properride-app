import { Text, View } from "react-native";

import { BadgeCheck, Tag } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";
import { spacing } from "@/constants/spacing";

type Props = {
  name: string;

  brand: string;

  price: string;
};

export function GarageSetupItem({ name, brand, price }: Props) {
  return (
    <View
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
            {name}
          </Text>

          <Text
            style={{
              ...typography.caption.md,
              color: colors.textSecondary,
            }}
          >
            {brand}
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
          {price}
        </Text>

        <Tag size={icons.sm} color={colors.primary} />
      </View>
    </View>
  );
}

import { Text, View } from "react-native";

import { BadgeCheck, Tag } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { typography } from "../../../styles/typography";

type Props = {
  name: string;

  brand: string;

  price: string;
};

export function GarageSetupItem({ name, brand, price }: Props) {
  return (
    <View
      style={{
        paddingVertical: 18,

        borderBottomWidth: 1,
        borderBottomColor: "#121212",

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
        <BadgeCheck size={16} color={colors.lime} />

        <View>
          <Text
            style={{
              ...typography.body.lg,
              color: colors.white,
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              ...typography.caption.md,
              color: colors.mute,
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
            color: colors.mute,
          }}
        >
          {price}
        </Text>

        <Tag size={16} color={colors.lime} />
      </View>
    </View>
  );
}

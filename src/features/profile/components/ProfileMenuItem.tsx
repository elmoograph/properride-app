import { Text, TouchableOpacity, View } from "react-native";

import { ChevronRight } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";
import { radius } from "@/constants/radius";

type Props = {
  icon: React.ReactNode;

  title: string;

  count: string;
};

export function ProfileMenuItem({ icon, title, count }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        paddingVertical: spacing.xl,

        paddingHorizontal: spacing.lg,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderBottomWidth: 1,
        borderBottomColor: colors.mute,
      }}
    >
      {/* LEFT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          gap: spacing.md,
        }}
      >
        {/* ICON */}
        <View
          style={{
            width: 36,
            height: 36,

            borderRadius: radius.full,

            backgroundColor: "#0A0A0A",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>

        {/* TITLE */}
        <Text
          style={{
            ...typography.body.md,

            color: colors.textPrimary,
          }}
        >
          {title}
        </Text>
      </View>

      {/* RIGHT */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          gap: spacing.md,
        }}
      >
        <View
          style={{
            minWidth: 28,

            paddingHorizontal: 10,
            paddingVertical: 8,

            borderRadius: 999,

            backgroundColor: "#0A0A0A",

            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...typography.body.md,

              color: colors.textPrimary,
            }}
          >
            {count}
          </Text>
        </View>

        <ChevronRight size={icons.md} color={colors.textPrimary} />
      </View>
    </TouchableOpacity>
  );
}

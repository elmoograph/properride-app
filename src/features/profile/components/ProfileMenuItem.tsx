import { Text, TouchableOpacity, View } from "react-native";

import { ChevronRight } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";

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
        borderBottomColor: "#111111",
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

            borderRadius: 999,

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
            ...typography.heading.md,

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

            paddingHorizontal: 8,
            paddingVertical: 4,

            borderRadius: 999,

            backgroundColor: "#111111",

            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...typography.caption.md,

              color: colors.textPrimary,
            }}
          >
            {count}
          </Text>
        </View>

        <ChevronRight size={icons.md} color={colors.surface} />
      </View>
    </TouchableOpacity>
  );
}

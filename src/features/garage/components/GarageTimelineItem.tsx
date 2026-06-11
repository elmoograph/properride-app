import { Text, View, TouchableOpacity } from "react-native";

import { Clock3 } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";
import { spacing } from "@/constants/spacing";

type Props = {
  title: string;
  date: string;
  price: string;
  isLast?: boolean;
  onPress?: () => void;
};

export function GarageTimelineItem({
  title,
  date,
  price,
  isLast,
  onPress,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {/* TIMELINE */}
      <View
        style={{
          alignItems: "center",

          marginRight: 16,
        }}
      >
        {/* DOT */}
        <View
          style={{
            width: 12,
            height: 12,

            borderRadius: 999,

            backgroundColor: colors.primary,

            marginTop: spacing.screen,
          }}
        />

        {/* LINE */}
        {!isLast && (
          <View
            style={{
              width: 1,

              flex: 1,

              backgroundColor: colors.mute,
            }}
          />
        )}
      </View>

      {/* CARD */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          flex: 1,

          backgroundColor: colors.mute,

          borderRadius: radius.sm,

          padding: spacing.lg,

          marginBottom: 20,
        }}
      >
        {/* TOP */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",

            gap: 20,
          }}
        >
          {/* LEFT */}
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                ...typography.body.md,
                color: colors.textPrimary,
              }}
            >
              {title}
            </Text>

            {/* DATE */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                gap: 6,

                marginTop: 5,
              }}
            >
              <Clock3 size={icons.xs} color={colors.textSecondary} />

              <Text
                style={{
                  ...typography.caption.md,
                  color: colors.textSecondary,
                }}
              >
                {date}
              </Text>
            </View>
          </View>

          {/* PRICE */}
          <Text
            style={{
              ...typography.body.md,
              color: colors.primary,
            }}
          >
            {price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

import { Text, View } from "react-native";

import { Clock3 } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { typography } from "../../../styles/typography";
import { icons } from "../../../constants/icons";

type Props = {
  title: string;

  date: string;

  price: string;

  isLast?: boolean;
};

export function GarageTimelineItem({ title, date, price, isLast }: Props) {
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

            marginTop: 18,
          }}
        />

        {/* LINE */}
        {!isLast && (
          <View
            style={{
              width: 1,

              flex: 1,

              backgroundColor: "#1A1A1A",
            }}
          />
        )}
      </View>

      {/* CARD */}
      <View
        style={{
          flex: 1,

          backgroundColor: "#0A0A0A",

          borderWidth: 1,
          borderColor: "#151515",

          borderRadius: radius.xl,

          padding: 18,

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
                ...typography.heading.md,
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

                marginTop: 10,
              }}
            >
              <Clock3 size={icons.xs} color={colors.surface} />

              <Text
                style={{
                  ...typography.caption.md,
                  color: colors.surface,
                }}
              >
                {date}
              </Text>
            </View>
          </View>

          {/* PRICE */}
          <Text
            style={{
              ...typography.heading.md,
              color: colors.primary,
            }}
          >
            {price}
          </Text>
        </View>
      </View>
    </View>
  );
}

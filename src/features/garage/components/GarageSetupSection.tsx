import { Text, TouchableOpacity, View } from "react-native";

import { useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { typography } from "../../../styles/typography";

import { SetupSection } from "../types/garage.types";

import { GarageSetupItem } from "./GarageSetupItem";
import { spacing } from "../../../constants/spacing";
import { icons } from "../../../constants/icons";

type Props = {
  section: SetupSection;
};

export function GarageSetupSection({ section }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <View
      style={{
        marginBottom: spacing.lg,
      }}
    >
      {/* HEADER */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setCollapsed(!collapsed)}
        style={{
          backgroundColor: colors.mute,

          borderRadius: radius.sm,

          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,

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

            gap: 10,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,

              borderRadius: 999,

              backgroundColor: colors.primary,
            }}
          />

          <Text
            style={{
              ...typography.body.lg,
              color: colors.textPrimary,
            }}
          >
            {section.title}
          </Text>
        </View>

        {/* ICON */}
        {collapsed ? (
          <ChevronRight size={icons.sm} color={colors.textPrimary} />
        ) : (
          <ChevronDown size={icons.sm} color={colors.textPrimary} />
        )}
      </TouchableOpacity>

      {/* ITEMS */}
      {!collapsed && (
        <View
          style={{
            marginTop: spacing.xs,
          }}
        >
          {section.items.map((item) => (
            <GarageSetupItem
              key={item.id}
              name={item.name}
              brand={item.brand}
              price={item.price}
            />
          ))}
        </View>
      )}
    </View>
  );
}

import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

const tabs = ["Setup", "Timeline", "Gallery"];

type Props = {
  activeTab: string;

  onChangeTab: (tab: string) => void;
};

export function GarageTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View
      style={{
        marginTop: spacing.md,

        paddingHorizontal: spacing.screen,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",

          backgroundColor: colors.mute,

          borderRadius: radius.sm,

          padding: 4,
        }}
      >
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => onChangeTab(tab)}
              style={{
                flex: 1,

                alignItems: "center",

                paddingVertical: 10,

                borderRadius: radius.md,
              }}
            >
              <Text
                style={{
                  ...typography.body.md,

                  color: active ? colors.primary : colors.textSecondary,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

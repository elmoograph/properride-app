import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

import { profileTabsData } from "../data/profile-tabs.data";

type Props = {
  activeTab: string;

  onChangeTab: (value: string) => void;
};

export function ProfileTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View
      style={{
        marginTop: spacing["2xl"],

        paddingHorizontal: spacing.screen,

        flexDirection: "row",
        alignItems: "center",

        gap: spacing.md,
      }}
    >
      {profileTabsData.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() => onChangeTab(tab)}
            style={{
              backgroundColor: isActive ? colors.lime : "#0A0A0A",

              borderRadius: radius.full,

              paddingHorizontal: spacing.xl,

              paddingVertical: spacing.md,
            }}
          >
            <Text
              style={{
                ...typography.label.md,

                color: isActive ? colors.primarytext : colors.mute,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

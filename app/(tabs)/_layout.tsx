import { Tabs } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View, type ColorValue } from "react-native";
import {
  Home,
  Plus,
  Search,
  User,
  Warehouse,
  type LucideProps,
} from "lucide-react-native";

import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

type TabIconProps = {
  color: ColorValue;
  size: number;
  focused: boolean;
};

const TAB_ICON_SIZE = 22;
const CENTER_TAB_SIZE = 54;

function renderIcon(
  Icon: React.ComponentType<LucideProps>,
  props: TabIconProps,
) {
  return (
    <Icon
      color={String(props.color)}
      size={TAB_ICON_SIZE}
      strokeWidth={props.focused ? 2.6 : 2}
    />
  );
}

function CenterCreateIcon({ focused }: { focused: boolean }) {
  return (
    <View style={[styles.centerTab, focused ? styles.centerTabActive : null]}>
      <Plus
        size={26}
        color={MOTORCYCLE_SHOWCASE_COLORS.background}
        strokeWidth={2.8}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
        tabBarInactiveTintColor: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size, focused }) =>
            renderIcon(Home, { color, size, focused }),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) =>
            renderIcon(Search, { color, size, focused }),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <CenterCreateIcon focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="garage"
        options={{
          title: "Garage",
          tabBarIcon: ({ color, size, focused }) =>
            renderIcon(Warehouse, { color, size, focused }),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) =>
            renderIcon(User, { color, size, focused }),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 74,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  tabBarLabel: {
    marginTop: 2,
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
  },
  centerTab: {
    width: CENTER_TAB_SIZE,
    height: CENTER_TAB_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: CENTER_TAB_SIZE / 2,
    borderWidth: 4,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.background,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  centerTabActive: {
    transform: [{ scale: 1.04 }],
  },
});

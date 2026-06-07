import { Tabs } from "expo-router";

import {
  House,
  Wrench,
  ShoppingBag,
  CircleUserRound,
} from "lucide-react-native";

import { colors } from "../../src/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { icons } from "../../src/constants/icons";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: colors.primary,

        tabBarInactiveTintColor: colors.textPrimary,

        tabBarStyle: {
          backgroundColor: colors.background,

          borderTopWidth: 1,
          borderTopColor: colors.primary,

          // paddingHorizontal: 20,
          paddingTop: 5,
          paddingBottom: 10 + insets.bottom,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,

          fontFamily: "Inter-Regular",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",

          tabBarIcon: ({ color }) => <House size={icons.sm} color={color} />,
        }}
      />

      {/* <Tabs.Screen
        name="explore"
        options={{
          title: "explore",

          tabBarIcon: ({ color }) => <Compass size={icons.md} color={color} />,
        }}
      /> */}

      <Tabs.Screen
        name="garage"
        options={{
          title: "garage",

          tabBarIcon: ({ color }) => <Wrench size={icons.md} color={color} />,
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: "shop",

          tabBarIcon: ({ color }) => (
            <ShoppingBag size={icons.md} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",

          tabBarIcon: ({ color }) => (
            <CircleUserRound size={icons.md} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

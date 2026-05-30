import { Tabs } from "expo-router";

import {
  House,
  Compass,
  Wrench,
  ShoppingBag,
  CircleUserRound,
} from "lucide-react-native";

import { colors } from "../../src/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: colors.lime,

        tabBarInactiveTintColor: colors.white,

        tabBarStyle: {
          backgroundColor: colors.primarytext,

          borderTopWidth: 1,
          borderTopColor: colors.lime,

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

          tabBarIcon: ({ color }) => <House size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "explore",

          tabBarIcon: ({ color }) => <Compass size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="garage"
        options={{
          title: "garage",

          tabBarIcon: ({ color }) => <Wrench size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: "shop",

          tabBarIcon: ({ color }) => <ShoppingBag size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",

          tabBarIcon: ({ color }) => (
            <CircleUserRound size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

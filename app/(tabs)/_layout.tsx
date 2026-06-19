import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import {
  Home,
  Search,
  PlusCircle,
  Warehouse,
  User,
  type LucideProps,
} from "lucide-react-native";

import { colors } from "@/src/theme";

type TabIconProps = {
  color: ColorValue;
  size: number;
};

function renderIcon(
  Icon: React.ComponentType<LucideProps>,
  props: TabIconProps,
) {
  return <Icon color={String(props.color)} size={props.size} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 64,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => renderIcon(Home, { color, size }),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => renderIcon(Search, { color, size }),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) =>
            renderIcon(PlusCircle, { color, size: size + 4 }),
        }}
      />

      <Tabs.Screen
        name="garage"
        options={{
          title: "Garage",
          tabBarIcon: ({ color, size }) =>
            renderIcon(Warehouse, { color, size }),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => renderIcon(User, { color, size }),
        }}
      />
    </Tabs>
  );
}

import { Text, TouchableOpacity, Alert } from "react-native";

import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";
import { colors } from "@/constants/colors";

import { useAuth } from "@/features/auth/hooks/useAuth";

export function LogoutButton() {
  const { signOut } = useAuth();

  async function handleLogout() {
    Alert.alert("Keluar", "Apakah Anda yakin ingin keluar?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleLogout}
      style={{
        marginTop: spacing.xl,

        marginHorizontal: spacing.screen,
        backgroundColor: "#ff4d4d",

        borderRadius: radius.sm,

        paddingVertical: spacing.md,

        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...typography.heading.sm,

          color: colors.background,
        }}
      >
        Keluar
      </Text>
    </TouchableOpacity>
  );
}

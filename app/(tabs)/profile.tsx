import { Alert, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/src/components/layout";
import { AppButton, PageHeader } from "@/src/components/ui";
import { colors, fontFamily, radius, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { PROFILE_COPY } from "@/src/features/profile/constants/profile.constants";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  function confirmLogout() {
    Alert.alert(
      PROFILE_COPY.LOGOUT_CONFIRM_TITLE,
      PROFILE_COPY.LOGOUT_CONFIRM_MESSAGE,
      [
        {
          text: PROFILE_COPY.LOGOUT_CANCEL,
          style: "cancel",
        },
        {
          text: PROFILE_COPY.LOGOUT_CONFIRM,
          style: "destructive",
          onPress: handleLogout,
        },
      ],
    );
  }

  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        PROFILE_COPY.LOGOUT_FAILED_TITLE,
        PROFILE_COPY.LOGOUT_FAILED_MESSAGE,
      );
    }
  }

  return (
    <Screen contentContainerStyle={styles.container}>
      <View>
        <PageHeader
          title={PROFILE_COPY.SCREEN_TITLE}
          subtitle={PROFILE_COPY.SCREEN_SUBTITLE}
        />

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>
            {user?.email ?? PROFILE_COPY.EMAIL_EMPTY}
          </Text>
        </View>
      </View>

      <AppButton
        title={PROFILE_COPY.LOGOUT_BUTTON}
        variant="danger"
        onPress={confirmLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  card: {
    marginTop: spacing["2xl"],
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontFamily: fontFamily.body.semiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  value: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.medium,
    fontSize: 15,
    color: colors.textPrimary,
  },
});

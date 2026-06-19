import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, AppInput, PageHeader } from "@/src/components/ui";
import { colors, fontFamily, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { ROUTES } from "@/src/constants/routes";

export default function RegisterScreen() {
  const { signUp, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    try {
      await signUp(email, password);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to register.";
      Alert.alert("Register failed", message);
    }
  }

  return (
    <Screen keyboardAvoiding contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.logo}>ProperRide</Text>

        <View style={styles.header}>
          <PageHeader
            title="Create account"
            subtitle="Start your rider profile and build your motorcycle garage."
          />
        </View>

        <View style={styles.form}>
          <AppInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <AppInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />

          <AppButton
            title="Register"
            loading={loading}
            onPress={handleRegister}
            style={styles.submit}
          />
        </View>
      </View>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Link href={ROUTES.AUTH.LOGIN} style={styles.footerLink}>
          Login
        </Link>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  logo: {
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 32,
    color: colors.textPrimary,
  },
  header: {
    marginTop: spacing["3xl"],
  },
  form: {
    marginTop: spacing["2xl"],
    gap: spacing.md,
  },
  submit: {
    marginTop: spacing.sm,
  },
  footerText: {
    marginTop: spacing.xl,
    textAlign: "center",
    fontFamily: fontFamily.body.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    fontFamily: fontFamily.body.semiBold,
    color: colors.primary,
  },
});

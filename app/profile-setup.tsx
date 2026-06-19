import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { router } from "expo-router";

import { Screen } from "@/src/components/layout";
import {
  AppButton,
  AppInput,
  FormSection,
  PageHeader,
} from "@/src/components/ui";
import { colors, fontFamily, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { createProfile } from "@/src/features/profile/repositories/profile.repository";

export default function ProfileSetupScreen() {
  const { user } = useAuth();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!user) {
      Alert.alert("Unauthorized", "Please login again.");
      return;
    }

    if (!username || !fullName) {
      Alert.alert("Missing fields", "Username and full name are required.");
      return;
    }

    if (username.includes(" ")) {
      Alert.alert("Invalid username", "Username cannot contain spaces.");
      return;
    }

    setSubmitting(true);

    try {
      await createProfile({
        id: user.id,
        username,
        full_name: fullName,
        location: location || null,
        bio: bio || null,
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create profile.";

      Alert.alert("Profile setup failed", message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen scroll keyboardAvoiding contentContainerStyle={styles.container}>
      <Text style={styles.logo}>ProperRide</Text>

      <PageHeader
        title="Setup your rider profile"
        subtitle="This profile will become your digital identity inside ProperRide."
      />

      <FormSection>
        <AppInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="example: nmax.rider"
          autoCapitalize="none"
        />

        <AppInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your name"
        />

        <AppInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="City, Country"
        />

        <AppInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell other riders about yourself"
          multiline
        />

        <AppButton
          title="Continue"
          loading={submitting}
          onPress={handleSubmit}
          style={styles.submit}
        />
      </FormSection>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: spacing["2xl"],
  },
  logo: {
    fontFamily: fontFamily.headline.extraBold,
    fontSize: 30,
    color: colors.textPrimary,
  },
  submit: {
    marginTop: spacing.sm,
  },
});

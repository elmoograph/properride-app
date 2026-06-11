import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { router } from "expo-router";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { createProfile } from "@/features/profile/repositories/profile.repository";
import { createGarage } from "@/features/garage/repositories/garage.repository";
import { useProfile } from "@/features/profile/hooks/useProfile";

export default function ProfileOnboardingScreen() {
  const { user } = useAuth();

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useProfile();

  async function handleSave() {
    if (!user) return;

    if (!username.trim()) {
      Alert.alert("Username wajib diisi");
      return;
    }

    if (!displayName.trim()) {
      Alert.alert("Display Name wajib diisi");
      return;
    }

    try {
      setLoading(true);

      await createProfile({
        id: user.id,
        email: user.email,
        username,
        displayName,
        location,
        bio,
      });

      await createGarage({
        ownerId: user.id,
        name: `${displayName} Garage`,
        location,
        bio,
      });

      await refreshProfile();

      router.replace("/onboarding/motorcycle");
    } catch (error: any) {
      Alert.alert("Error", JSON.stringify(error, null, 2));
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        gap: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        Setup Profile
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
        }}
      />

      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
          minHeight: 100,
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        style={{
          padding: 18,
          borderRadius: 12,
          alignItems: "center",
          backgroundColor: "#17B169",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          {loading ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

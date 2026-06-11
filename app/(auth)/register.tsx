import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RegisterScreen() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // async function handleRegister() {
  //   if (password !== confirmPassword) {
  //     Alert.alert("Error", "Password tidak sama");
  //     return;
  //   }

  //   try {
  //     await signUp(email, password);

  //     Alert.alert("Success", "Account created");
  //   } catch (error: any) {
  //     Alert.alert("Register Failed", error.message);
  //   }
  // }
  async function handleRegister() {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Password tidak sama");
      return;
    }

    try {
      await signUp(email, password);

      Alert.alert("Success", "Account created");
    } catch (error: any) {
      Alert.alert("Register Failed", error.message);
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
        Register
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#111827",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>

      <Link href="/(auth)/login">Sudah punya akun? Login</Link>
    </View>
  );
}

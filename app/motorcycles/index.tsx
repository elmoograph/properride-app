import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import { useMotorcycles } from "@/features/motorcycles/hooks/useMotorcycles";

export default function MotorcyclesScreen() {
  const { motorcycles, featuredMotorcycle } = useMotorcycles();

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 24,
        }}
      >
        My Motorcycles
      </Text>

      <FlatList
        data={motorcycles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/motorcycles/${item.id}`)}
            style={{
              padding: 16,
              borderWidth: 1,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Text>{item.name}</Text>

            <Text>
              {item.brand} {item.model}
            </Text>

            {item.id === featuredMotorcycle?.id && (
              <Text
                style={{
                  marginTop: 8,
                }}
              >
                Active Motorcycle
              </Text>
            )}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push("/motorcycles/add")}
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
          Add Motorcycle
        </Text>
      </TouchableOpacity>
    </View>
  );
}

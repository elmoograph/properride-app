import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { usePart } from "@/features/parts/hooks/usePart";

import { TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

import { deletePart } from "@/features/parts/repositories/part.repository";

export default function PartDetailScreen() {
  const { id } = useLocalSearchParams();

  const { part, loading } = usePart(id as string);

  async function handleDelete() {
    Alert.alert("Delete Part", "Yakin ingin menghapus part ini?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePart(part.id);

            router.back();
          } catch (error: any) {
            Alert.alert("Delete Failed", error.message);
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        {part.name}
      </Text>

      <Text>{part.brand ?? "-"}</Text>

      <Text>{part.category}</Text>

      <Text>Rp {(part.price ?? 0).toLocaleString("id-ID")}</Text>
      <TouchableOpacity
        onPress={() => router.push(`/parts/edit/${part.id}`)}
        style={{
          backgroundColor: "#17B169",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Edit Part
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDelete}
        style={{
          backgroundColor: "#DC2626",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Delete Part
        </Text>
      </TouchableOpacity>
    </View>
  );
}

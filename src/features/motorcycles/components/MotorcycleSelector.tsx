import { useState } from "react";

import { Modal, View, Text, TouchableOpacity } from "react-native";

import { ChevronDown } from "lucide-react-native";

import { router } from "expo-router";

import { Motorcycle } from "../types/motorcycle.types";

import { colors } from "@/constants/colors";
import { radius } from "@/constants/radius";
import { spacing } from "@/constants/spacing";

type Props = {
  motorcycles: Motorcycle[];
  featuredMotorcycle: Motorcycle | null;

  onSelect: (motorcycleId: string) => void;
};

export function MotorcycleSelector({
  motorcycles,
  featuredMotorcycle,
  onSelect,
}: Props) {
  const [visible, setVisible] = useState(false);
  console.log("MOTORCYCLES", motorcycles);
  console.log("COUNT", motorcycles.length);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setVisible(true);
        }}
        style={{
          backgroundColor: colors.primary,

          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,

          borderRadius: radius.full,

          flexDirection: "row",
          alignItems: "center",

          // gap: 6,
        }}
      >
        <Text
          style={{
            color: colors.background,
            fontWeight: "600",
          }}
        >
          {featuredMotorcycle?.name ?? "Select Motorcycle"}
        </Text>

        <ChevronDown size={16} color={colors.background} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onShow={() => console.log("MODAL SHOWN")}
      >
        <View
          style={{
            flex: 1,

            justifyContent: "flex-end",

            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              backgroundColor: colors.background,

              padding: 24,

              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 24,
              }}
            >
              Select Motorcycle
            </Text>

            {motorcycles.map((motorcycle) => (
              <TouchableOpacity
                key={motorcycle.id}
                onPress={() => {
                  onSelect(motorcycle.id);

                  setVisible(false);
                }}
                style={{
                  paddingVertical: 16,
                }}
              >
                <Text>
                  {motorcycle.id === featuredMotorcycle?.id ? "✓ " : ""}
                  {motorcycle.name}
                </Text>

                <Text>
                  {motorcycle.brand} {motorcycle.model}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => {
                setVisible(false);

                router.push("/motorcycles/add");
              }}
              style={{
                marginTop: 16,
              }}
            >
              <Text>+ Add Motorcycle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {visible && (
        <View
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,

            backgroundColor: "white",

            padding: 20,

            zIndex: 9999,
            elevation: 9999,
          }}
        >
          {motorcycles.map((motorcycle) => (
            <Text key={motorcycle.id}>{motorcycle.name}</Text>
          ))}
        </View>
      )}
    </>
  );
}

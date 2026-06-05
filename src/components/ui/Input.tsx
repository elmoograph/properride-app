import { TextInput, View } from "react-native";

import { useState } from "react";

import { colors } from "@/constants/colors";
import { input } from "@/constants/input";

type Props = {
  placeholder?: string;

  value: string;

  onChangeText: (value: string) => void;
};

export function Input({ placeholder, value, onChangeText }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        height: input.height.md,

        borderRadius: input.radius,

        backgroundColor: colors.surface,

        borderWidth: 1,

        borderColor: focused ? colors.focus : "transparent",

        justifyContent: "center",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,

          paddingHorizontal: input.paddingHorizontal,

          color: colors.textPrimary,
        }}
      />
    </View>
  );
}

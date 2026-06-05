import { TextInput, View } from "react-native";

import { Search } from "lucide-react-native";

import { colors } from "@/constants/colors";
import { input } from "@/constants/input";
import { spacing } from "@/constants/spacing";

type Props = {
  value: string;

  onChangeText: (value: string) => void;
};

export function SearchInput({ value, onChangeText }: Props) {
  return (
    <View
      style={{
        height: input.height.md,

        backgroundColor: colors.surface,

        borderRadius: input.radius,

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: spacing.lg,

        gap: spacing.sm,
      }}
    >
      <Search size={18} color={colors.placeholder} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search..."
        placeholderTextColor={colors.placeholder}
        style={{
          flex: 1,

          color: colors.textPrimary,
        }}
      />
    </View>
  );
}

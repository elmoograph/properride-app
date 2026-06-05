import { TextInput, View } from "react-native";

import { Search } from "lucide-react-native";

import { colors } from "../../constants/colors";
import { input } from "../../constants/input";
import { spacing } from "../../constants/spacing";
import { icons } from "../../constants/icons";

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
      <Search size={icons.sm} color={colors.surface} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search..."
        placeholderTextColor={colors.surface}
        style={{
          flex: 1,

          color: colors.textPrimary,
        }}
      />
    </View>
  );
}

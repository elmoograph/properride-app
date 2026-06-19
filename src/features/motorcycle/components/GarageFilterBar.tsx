import { StyleSheet, View } from "react-native";

import { AppInput, SelectChipGroup } from "@/src/components/ui";
import { spacing } from "@/src/theme";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import type { MotorcycleSortOption } from "@/src/features/motorcycle/types/motorcycle.types";
import {
  getMotorcycleSortLabelByValue,
  getMotorcycleSortOptionLabels,
  getMotorcycleSortValueByLabel,
} from "@/src/features/motorcycle/utils/motorcycleSortOptions";

type GarageFilterBarProps = {
  searchQuery: string;
  sortOption: MotorcycleSortOption;
  onChangeSearchQuery: (value: string) => void;
  onChangeSortOption: (value: MotorcycleSortOption) => void;
};

export function GarageFilterBar({
  searchQuery,
  sortOption,
  onChangeSearchQuery,
  onChangeSortOption,
}: GarageFilterBarProps) {
  function handleChangeSort(label: string) {
    onChangeSortOption(getMotorcycleSortValueByLabel(label));
  }

  return (
    <View style={styles.container}>
      <AppInput
        value={searchQuery}
        onChangeText={onChangeSearchQuery}
        placeholder={MOTORCYCLE_COPY.GARAGE_SEARCH_PLACEHOLDER}
      />

      <SelectChipGroup
        label={MOTORCYCLE_COPY.GARAGE_SORT_LABEL}
        value={getMotorcycleSortLabelByValue(sortOption)}
        options={getMotorcycleSortOptionLabels()}
        onChange={handleChangeSort}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});

import { StyleSheet, View } from "react-native";

import { AppInput, SelectChipGroup } from "@/src/components/ui";
import { spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import type { PartSortOption } from "@/src/features/part/types/part.types";
import {
  getPartSortLabelByValue,
  getPartSortOptionLabels,
  getPartSortValueByLabel,
} from "@/src/features/part/utils/partSortOptions";

type PartFilterBarProps = {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  sortOption: PartSortOption;
  onChangeSearchQuery: (value: string) => void;
  onChangeCategory: (value: string) => void;
  onChangeSortOption: (value: PartSortOption) => void;
};

export function PartFilterBar({
  searchQuery,
  selectedCategory,
  categories,
  sortOption,
  onChangeSearchQuery,
  onChangeCategory,
  onChangeSortOption,
}: PartFilterBarProps) {
  function handleChangeSort(label: string) {
    onChangeSortOption(getPartSortValueByLabel(label));
  }

  return (
    <View style={styles.container}>
      <AppInput
        value={searchQuery}
        onChangeText={onChangeSearchQuery}
        placeholder={PART_COPY.SEARCH_PLACEHOLDER}
      />

      <SelectChipGroup
        label={PART_COPY.FIELD_CATEGORY}
        value={selectedCategory}
        options={categories}
        onChange={onChangeCategory}
      />

      <SelectChipGroup
        label={PART_COPY.SORT_LABEL}
        value={getPartSortLabelByValue(sortOption)}
        options={getPartSortOptionLabels()}
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

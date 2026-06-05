import { View } from "react-native";

import { spacing } from "@/constants/spacing";

import { buildsData } from "../data/builds.data";
import { BuildCard } from "./BuildCard";

export function BuildList() {
  return (
    <View
      style={{
        paddingHorizontal: spacing.screen,

        marginTop: spacing.xl,

        gap: spacing.lg,
      }}
    >
      {buildsData.map((build) => (
        <BuildCard key={build.id} build={build} />
      ))}
    </View>
  );
}

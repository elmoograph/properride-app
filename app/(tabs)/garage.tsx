import { ScrollView, View } from "react-native";

import { colors } from "../../src/constants/colors";

import { GarageHero } from "../../src/features/garage/components/GarageHero";
import { GarageProfile } from "../../src/features/garage/components/GarageProfile";
import { GarageIdentity } from "../../src/features/garage/components/GarageIdentity";
import { GarageLevelCard } from "../../src/features/garage/components/GarageLevelCard";

export default function GarageScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.primarytext,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <GarageHero />
        <GarageProfile />
        <GarageIdentity />
        <GarageLevelCard />
      </View>
    </ScrollView>
  );
}

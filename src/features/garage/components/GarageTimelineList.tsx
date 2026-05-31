import { View } from "react-native";

import { spacing } from "../../../constants/spacing";

import { timelineData } from "../data/timeline.data";

import { GarageTimelineItem } from "./GarageTimelineItem";

export function GarageTimelineList() {
  return (
    <View
      style={{
        marginTop: 24,

        paddingHorizontal: spacing.screen,
      }}
    >
      {timelineData.map((item, index) => (
        <GarageTimelineItem
          key={item.id}
          title={item.title}
          date={item.date}
          price={item.price}
          isLast={index === timelineData.length - 1}
        />
      ))}
    </View>
  );
}

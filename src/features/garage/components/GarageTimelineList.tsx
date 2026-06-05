import { View, TextInput, Text } from "react-native";
import { useMemo, useState } from "react";

import { spacing } from "../../../constants/spacing";

import { timelineData } from "../data/timeline.data";

import { GarageTimelineItem } from "./GarageTimelineItem";
import { Search } from "lucide-react-native";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { icons } from "../../../constants/icons";

export function GarageTimelineList() {
  const [search, setSearch] = useState("");

  const filteredTimeline = useMemo(() => {
    return timelineData.filter((item) =>
      `${item.title} ${item.date} ${item.price}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <View
      style={{
        marginTop: spacing.xl,

        paddingHorizontal: spacing.screen,
      }}
    >
      {/* SEARCH */}
      <View
        style={{
          marginBottom: spacing["2xl"],

          backgroundColor: "#0A0A0A",

          borderWidth: 1,
          borderColor: "#151515",

          borderRadius: radius.lg,

          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.xs,

          flexDirection: "row",
          alignItems: "center",

          gap: spacing.md,
        }}
      >
        <Search size={icons.sm} color={colors.surface} />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search timeline..."
          placeholderTextColor={colors.surface}
          style={{
            flex: 1,

            color: colors.textPrimary,
          }}
        />
      </View>

      {filteredTimeline.length === 0 ? (
        <View
          style={{
            paddingVertical: spacing["4xl"],

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.surface,
            }}
          >
            No timeline found
          </Text>
        </View>
      ) : (
        filteredTimeline.map((item, index) => (
          <GarageTimelineItem
            key={item.id}
            title={item.title}
            date={item.date}
            price={item.price}
            isLast={index === filteredTimeline.length - 1}
          />
        ))
      )}
    </View>
  );
}

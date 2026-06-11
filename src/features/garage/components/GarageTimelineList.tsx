import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useMemo, useState } from "react";

import { spacing } from "../../../constants/spacing";

import { GarageTimelineItem } from "./GarageTimelineItem";
import { Search } from "lucide-react-native";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { icons } from "../../../constants/icons";

import { useTimeline } from "@/features/timeline/hooks/useTimeline";
import { router } from "expo-router";

export function GarageTimelineList() {
  const [search, setSearch] = useState("");
  const { events, loading } = useTimeline();

  const filteredTimeline = useMemo(() => {
    return events.filter((item) =>
      `${item.title} ${item.description ?? ""} ${item.cost}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [events, search]);
  if (loading) {
    return (
      <View
        style={{
          paddingVertical: spacing["4xl"],
          alignItems: "center",
        }}
      >
        <Text>Loading timeline...</Text>
      </View>
    );
  }
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
          marginBottom: spacing.xl,

          backgroundColor: colors.mute,

          borderRadius: radius.sm,

          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.xs,

          flexDirection: "row",
          alignItems: "center",

          gap: spacing.md,
        }}
      >
        <Search size={icons.sm} color={colors.textSecondary} />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search timeline..."
          placeholderTextColor={colors.textSecondary}
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
              color: colors.textSecondary,
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
            date={new Date(item.event_date).toLocaleDateString("id-ID")}
            price={`Rp ${item.cost.toLocaleString("id-ID")}`}
            isLast={index === filteredTimeline.length - 1}
            onPress={() => router.push(`/timeline/${item.id}`)}
          />
        ))
      )}
      <TouchableOpacity
        onPress={() => router.push("/timeline/add")}
        style={{
          marginTop: spacing.xl,

          backgroundColor: colors.primary,

          paddingVertical: 12,

          borderRadius: radius.sm,

          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.background,
            fontWeight: "700",
          }}
        >
          + Add Timeline Event
        </Text>
      </TouchableOpacity>
    </View>
  );
}

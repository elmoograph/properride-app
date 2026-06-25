import { useLocalSearchParams } from "expo-router";

import { FollowProfileListScreen } from "@/src/features/profile/components/FollowProfileListScreen";

export default function FollowersScreen() {
  const { userId } = useLocalSearchParams<{
    userId: string;
  }>();

  return <FollowProfileListScreen userId={userId} mode="followers" />;
}

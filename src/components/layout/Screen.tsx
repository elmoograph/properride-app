import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { colors, spacing } from "@/src/theme";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  keyboardAvoiding?: boolean;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
  safeAreaEdges?: Edge[];
};

export function Screen({
  children,
  scroll = false,
  padded = true,
  keyboardAvoiding = false,
  contentContainerStyle,
  backgroundColor = colors.background,
  safeAreaEdges = ["top", "right", "bottom", "left"],
}: ScreenProps) {
  const containerStyle = [
    styles.safeArea,
    {
      backgroundColor,
    },
  ];

  const contentStyle = [
    styles.content,
    {
      backgroundColor,
    },
    padded ? styles.padded : null,
    contentContainerStyle,
  ];

  const content = scroll ? (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={contentStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={contentStyle}>{children}</View>
  );

  if (keyboardAvoiding) {
    return (
      <SafeAreaView style={containerStyle} edges={safeAreaEdges}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle} edges={safeAreaEdges}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  padded: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
});

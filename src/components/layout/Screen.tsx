import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "@/src/theme";

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  keyboardAvoiding?: boolean;
  contentContainerStyle?: ViewStyle;
};

export function Screen({
  children,
  scroll = false,
  padded = true,
  keyboardAvoiding = false,
  contentContainerStyle,
}: ScreenProps) {
  const contentStyle = [
    styles.content,
    padded && styles.padded,
    contentContainerStyle,
  ];

  const content = scroll ? (
    <ScrollView
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
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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

import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { X } from "lucide-react-native";

import {
  REPORT_REASONS,
  SAFETY_COPY,
} from "@/src/features/safety/constants/safety.constants";
import type { ReportReason } from "@/src/features/safety/types/safety.types";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { radius, spacing } from "@/src/theme";

type ReportContentModalProps = {
  visible: boolean;
  title: string;
  submitting?: boolean;
  onClose: () => void;
  onSubmit: (params: { reason: ReportReason; details: string }) => void;
};

const REPORT_REASON_OPTIONS: {
  label: string;
  value: ReportReason;
}[] = [
  {
    label: SAFETY_COPY.REPORT_REASON_SPAM,
    value: REPORT_REASONS.SPAM,
  },
  {
    label: SAFETY_COPY.REPORT_REASON_HARASSMENT,
    value: REPORT_REASONS.HARASSMENT,
  },
  {
    label: SAFETY_COPY.REPORT_REASON_INAPPROPRIATE_CONTENT,
    value: REPORT_REASONS.INAPPROPRIATE_CONTENT,
  },
  {
    label: SAFETY_COPY.REPORT_REASON_MISLEADING_CONTENT,
    value: REPORT_REASONS.MISLEADING_CONTENT,
  },
  {
    label: SAFETY_COPY.REPORT_REASON_OTHER,
    value: REPORT_REASONS.OTHER,
  },
];

export function ReportContentModal({
  visible,
  title,
  submitting = false,
  onClose,
  onSubmit,
}: ReportContentModalProps) {
  const [selectedReason, setSelectedReason] = useState<ReportReason>(
    REPORT_REASONS.SPAM,
  );
  const [details, setDetails] = useState("");

  function handleSubmit() {
    if (submitting) {
      return;
    }

    onSubmit({
      reason: selectedReason,
      details,
    });
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />

        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>
                {SAFETY_COPY.REPORT_DESCRIPTION}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tutup laporan"
              disabled={submitting}
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed ? styles.pressed : null,
                submitting ? styles.disabled : null,
              ]}
            >
              <X size={18} color={MOTORCYCLE_SHOWCASE_COLORS.textPrimary} />
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{SAFETY_COPY.REPORT_REASON_LABEL}</Text>

            <View style={styles.reasonList}>
              {REPORT_REASON_OPTIONS.map((option) => {
                const active = selectedReason === option.value;

                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    disabled={submitting}
                    onPress={() => {
                      setSelectedReason(option.value);
                    }}
                    style={({ pressed }) => [
                      styles.reasonButton,
                      active ? styles.reasonButtonActive : null,
                      pressed ? styles.pressed : null,
                      submitting ? styles.disabled : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.reasonText,
                        active ? styles.reasonTextActive : null,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>{SAFETY_COPY.REPORT_DETAILS_LABEL}</Text>

            <TextInput
              value={details}
              onChangeText={setDetails}
              editable={!submitting}
              multiline
              maxLength={500}
              placeholder={SAFETY_COPY.REPORT_DETAILS_PLACEHOLDER}
              placeholderTextColor={MOTORCYCLE_SHOWCASE_COLORS.textMuted}
              selectionColor={MOTORCYCLE_SHOWCASE_COLORS.accent}
              style={styles.detailsInput}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.footer}>
            <Pressable
              accessibilityRole="button"
              disabled={submitting}
              onPress={onClose}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed ? styles.pressed : null,
                submitting ? styles.disabled : null,
              ]}
            >
              <Text style={styles.secondaryButtonText}>
                {SAFETY_COPY.REPORT_CANCEL_BUTTON}
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              disabled={submitting}
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed ? styles.pressed : null,
                submitting ? styles.disabled : null,
              ]}
            >
              {submitting ? (
                <ActivityIndicator
                  color={MOTORCYCLE_SHOWCASE_COLORS.background}
                  size="small"
                />
              ) : (
                <Text style={styles.primaryButtonText}>
                  {SAFETY_COPY.REPORT_SUBMIT_BUTTON}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.72)",
  },
  backdropPressable: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    maxHeight: "88%",
    padding: spacing.xl,
    paddingBottom: spacing["2xl"],
    borderTopLeftRadius: radius["3xl"],
    borderTopRightRadius: radius["3xl"],
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.lg,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  description: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 19,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  closeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  section: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  reasonList: {
    gap: spacing.sm,
  },
  reasonButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  reasonButtonActive: {
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: "rgba(23,255,136,0.12)",
  },
  reasonText: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  reasonTextActive: {
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  detailsInput: {
    minHeight: 112,
    padding: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 19,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  secondaryButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  primaryButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.6,
  },
});

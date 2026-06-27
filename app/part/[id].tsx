import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { Pencil, Trash2 } from "lucide-react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS } from "@/src/constants/storage";
import { colors, radius, spacing } from "@/src/theme";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import { PartHero } from "@/src/features/part/components/PartHero";
import {
  deletePart,
  getPartById,
} from "@/src/features/part/repositories/part.repository";
import type { Part } from "@/src/features/part/types/part.types";
import { formatOptionalValue } from "@/src/utils/format";
import { deleteUploadedImage } from "@/src/utils/uploadImage";
import { PartInfoGrid } from "@/src/features/part/components/PartInfoGrid";
import type { ReactNode } from "react";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";

export default function PartDetailScreen() {
  const { user } = useAuth();

  const { id } = useLocalSearchParams<{ id: string }>();
  const partId = Array.isArray(id) ? id[0] : id;

  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const isOwner = part?.user_id === user?.id;

  const loadPart = useCallback(async () => {
    if (!partId) {
      setLoading(false);
      return;
    }

    try {
      const data = await getPartById(partId);
      setPart(data);
    } catch (error) {
      Alert.alert(
        PART_COPY.DETAIL_LOAD_FAILED_TITLE,
        PART_COPY.DETAIL_LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
    }
  }, [partId]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadPart();
    }, [loadPart]),
  );

  function handleEdit() {
    if (!partId || !isOwner) {
      return;
    }

    router.push(ROUTES.PART.EDIT(partId));
  }

  function handleBackToMotorcycle() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    if (part?.motorcycle_id) {
      router.replace(ROUTES.MOTORCYCLE.DETAIL(part.motorcycle_id));
      return;
    }

    router.replace(ROUTES.TABS.GARAGE);
  }

  function confirmDelete() {
    if (!isOwner || deleting) {
      return;
    }

    Alert.alert(
      PART_COPY.DELETE_CONFIRM_TITLE,
      PART_COPY.DELETE_CONFIRM_MESSAGE,
      [
        {
          text: COMMON_COPY.CANCEL,
          style: "cancel",
        },
        {
          text: COMMON_COPY.DELETE,
          style: "destructive",
          onPress: () => {
            void handleDelete();
          },
        },
      ],
    );
  }

  async function handleDelete() {
    if (!part || !isOwner || deleting) {
      return;
    }

    setDeleting(true);

    const imagePath = part.main_image_path;
    const motorcycleId = part.motorcycle_id;

    try {
      await deletePart(part.id);

      if (imagePath) {
        try {
          await deleteUploadedImage({
            bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
            path: imagePath,
          });
        } catch (storageError) {
          console.warn(
            "Part terhapus, tetapi file gambar gagal dibersihkan:",
            storageError,
          );
        }
      }

      Alert.alert(
        PART_COPY.DELETE_SUCCESS_TITLE,
        PART_COPY.DELETE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () =>
              router.replace(ROUTES.MOTORCYCLE.DETAIL(motorcycleId)),
          },
        ],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : PART_COPY.DELETE_FAILED_MESSAGE;

      Alert.alert(PART_COPY.DELETE_FAILED_TITLE, message);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <ActivityIndicator color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
      </Screen>
    );
  }

  if (!part) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={PART_COPY.DETAIL_NOT_FOUND_TITLE}
          description={PART_COPY.DETAIL_NOT_FOUND_DESCRIPTION}
          action={
            <AppButton
              title={COMMON_COPY.BACK}
              variant="secondary"
              onPress={handleBackToMotorcycle}
            />
          }
        />
      </Screen>
    );
  }

  return (
    <Screen
      padded={false}
      backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
      safeAreaEdges={["right", "bottom", "left"]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <PartHero part={part} onPressBack={handleBackToMotorcycle} />

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleGroup}>
              <Text style={styles.eyebrow}>Build Setup</Text>
              <Text style={styles.sectionTitle}>Part Details</Text>
              <Text style={styles.sectionSubtitle}>
                Informasi lengkap part yang digunakan pada build ini.
              </Text>
            </View>

            {isOwner ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Edit part"
                disabled={deleting}
                onPress={handleEdit}
                style={({ pressed }) => [
                  styles.editButton,
                  pressed ? styles.pressed : null,
                  deleting ? styles.disabled : null,
                ]}
              >
                <Pencil
                  size={18}
                  color={MOTORCYCLE_SHOWCASE_COLORS.background}
                />
              </Pressable>
            ) : null}
          </View>

          <PartInfoGrid part={part} />

          <PartDetailSection
            title="Part Overview"
            description="Identitas utama dari part yang digunakan."
          >
            <PartDetailRow
              label={PART_COPY.LABEL_CATEGORY}
              value={formatOptionalValue(part.category)}
            />

            <PartDetailRow
              label={PART_COPY.LABEL_BRAND}
              value={formatOptionalValue(part.brand || part.custom_brand)}
            />

            <PartDetailRow
              label={PART_COPY.LABEL_PRODUCT_NAME}
              value={formatOptionalValue(
                part.product_name || part.custom_product_name,
              )}
            />
          </PartDetailSection>

          <PartDetailSection
            title="Purchase & Installation"
            description="Informasi pembelian dan proses pemasangan part."
          >
            <PartDetailRow
              label={PART_COPY.LABEL_PURCHASE_DATE}
              value={formatOptionalValue(part.purchase_date)}
            />

            <PartDetailRow
              label={PART_COPY.LABEL_INSTALL_DATE}
              value={formatOptionalValue(part.install_date)}
            />

            <PartDetailRow
              label={PART_COPY.LABEL_WORKSHOP}
              value={formatOptionalValue(part.workshop)}
            />

            <PartDetailRow
              label={PART_COPY.LABEL_LOCATION}
              value={formatOptionalValue(part.location)}
            />
          </PartDetailSection>

          <PartDetailSection
            title="Description"
            description="Catatan dan pengalaman penggunaan part."
          >
            <Text style={styles.description}>
              {formatOptionalValue(part.description)}
            </Text>
          </PartDetailSection>

          {isOwner ? (
            <View style={styles.dangerSection}>
              <View style={styles.dangerContent}>
                <Text style={styles.dangerTitle}>Delete Part</Text>

                <Text style={styles.dangerDescription}>
                  Part akan dihapus permanen dari setup build ini.
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Hapus part"
                disabled={deleting}
                onPress={confirmDelete}
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed ? styles.pressed : null,
                  deleting ? styles.disabled : null,
                ]}
              >
                <Trash2 size={19} color={colors.danger} />
              </Pressable>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </Screen>
  );
}

type PartDetailSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function PartDetailSection({
  title,
  description,
  children,
}: PartDetailSectionProps) {
  return (
    <View style={styles.detailSection}>
      <View style={styles.detailSectionHeader}>
        <Text style={styles.detailSectionTitle}>{title}</Text>

        {description ? (
          <Text style={styles.detailSectionDescription}>{description}</Text>
        ) : null}
      </View>

      <View style={styles.detailSectionContent}>{children}</View>
    </View>
  );
}

type PartDetailRowProps = {
  label: string;
  value: string;
};

function PartDetailRow({ label, value }: PartDetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>

      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  container: {
    paddingBottom: spacing["5xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  content: {
    gap: spacing.xl,
    padding: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  sectionTitleGroup: {
    flex: 1,
  },
  eyebrow: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  sectionTitle: {
    marginTop: spacing.xs,
    fontFamily: "PlusJakartaSans-ExtraBold",
    fontSize: 24,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  sectionSubtitle: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  editButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  detailSection: {
    overflow: "hidden",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  detailSectionHeader: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: MOTORCYCLE_SHOWCASE_COLORS.border,
  },
  detailSectionTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  detailSectionDescription: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  detailSectionContent: {
    paddingHorizontal: spacing.lg,
  },
  detailRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: MOTORCYCLE_SHOWCASE_COLORS.borderSoft,
  },
  detailLabel: {
    flex: 1,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  detailValue: {
    flex: 1.2,
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "right",
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  description: {
    paddingVertical: spacing.lg,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 22,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  dangerSection: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.34)",
    backgroundColor: "rgba(239,68,68,0.07)",
  },
  dangerContent: {
    flex: 1,
  },
  dangerTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: colors.danger,
  },
  dangerDescription: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  deleteButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.30)",
    backgroundColor: "rgba(239,68,68,0.10)",
  },
  pressed: {
    opacity: 0.72,
  },
  disabled: {
    opacity: 0.5,
  },
});

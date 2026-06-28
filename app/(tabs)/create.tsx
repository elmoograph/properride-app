import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import {
  Bike,
  Camera,
  ChevronRight,
  PackagePlus,
  Plus,
} from "lucide-react-native";

import { Screen } from "@/src/components/layout";
import { AppButton, EmptyState, PageHeader } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_SHOWCASE_COLORS } from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import { getMotorcyclesByUserId } from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import { radius, spacing } from "@/src/theme";

const CREATE_COPY = {
  SCREEN_EYEBROW: "Create",
  SCREEN_TITLE: "Create Build Content",
  SCREEN_SUBTITLE:
    "Tambahkan Build, Part, atau Gallery untuk memperkaya Garage ProperRide Anda.",

  ADD_BUILD_TITLE: "Add Build",
  ADD_BUILD_DESCRIPTION:
    "Buat Build motor baru lengkap dengan identitas, spesifikasi, dan cover.",

  ADD_PART_TITLE: "Add Part",
  ADD_PART_DESCRIPTION:
    "Tambahkan part/modifikasi ke salah satu Build yang sudah Anda buat.",

  ADD_GALLERY_TITLE: "Add Gallery",
  ADD_GALLERY_DESCRIPTION:
    "Upload foto atau video progress untuk dokumentasi Build Anda.",

  NO_BUILD_TITLE: "Belum Ada Build",
  NO_BUILD_DESCRIPTION:
    "Buat Build terlebih dahulu sebelum menambahkan Part atau Gallery.",

  SELECT_BUILD_TITLE: "Pilih Build",
  SELECT_BUILD_MESSAGE: "Pilih Build yang ingin Anda update.",

  LOAD_FAILED_TITLE: "Gagal Memuat Create",
  LOAD_FAILED_DESCRIPTION:
    "Data Build Anda belum dapat dimuat. Silakan coba kembali.",

  RETRY_BUTTON: "Coba Lagi",
  CREATE_BUILD_BUTTON: "Create Build",
} as const;

type CreateTarget = "part" | "gallery";

function getMotorcycleTitle(motorcycle: Motorcycle): string {
  return (
    motorcycle.nickname?.trim() ||
    [motorcycle.brand, motorcycle.model, motorcycle.variant]
      .filter(Boolean)
      .join(" ")
  );
}

export default function CreateScreen() {
  const { user } = useAuth();

  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadMotorcycles = useCallback(async () => {
    if (!user?.id) {
      setMotorcycles([]);
      setLoading(false);
      setLoadFailed(false);
      return;
    }

    try {
      setLoading(true);
      setLoadFailed(false);

      const data = await getMotorcyclesByUserId(user.id);

      setMotorcycles(data);
    } catch (error) {
      console.error("Gagal memuat Create Hub:", error);
      setMotorcycles([]);
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      void loadMotorcycles();
    }, [loadMotorcycles]),
  );

  function handleAddBuild() {
    router.push(ROUTES.MOTORCYCLE.ADD);
  }

  function openCreateTarget(target: CreateTarget, motorcycleId: string) {
    if (target === "part") {
      router.push(ROUTES.PART.ADD(motorcycleId));
      return;
    }

    router.push(ROUTES.GALLERY.ADD(motorcycleId));
  }

  function handleSelectBuild(target: CreateTarget) {
    if (motorcycles.length === 0) {
      Alert.alert(
        CREATE_COPY.NO_BUILD_TITLE,
        CREATE_COPY.NO_BUILD_DESCRIPTION,
        [
          {
            text: CREATE_COPY.CREATE_BUILD_BUTTON,
            onPress: handleAddBuild,
          },
          {
            text: COMMON_COPY.CANCEL,
            style: "cancel",
          },
        ],
      );

      return;
    }

    if (motorcycles.length === 1) {
      const motorcycle = motorcycles[0];

      if (!motorcycle) {
        return;
      }

      openCreateTarget(target, motorcycle.id);
      return;
    }

    Alert.alert(
      CREATE_COPY.SELECT_BUILD_TITLE,
      CREATE_COPY.SELECT_BUILD_MESSAGE,
      [
        ...motorcycles.slice(0, 6).map((motorcycle) => ({
          text: getMotorcycleTitle(motorcycle),
          onPress: () => {
            openCreateTarget(target, motorcycle.id);
          },
        })),
        {
          text: COMMON_COPY.CANCEL,
          style: "cancel" as const,
        },
      ],
    );
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

  if (loadFailed) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={CREATE_COPY.LOAD_FAILED_TITLE}
          description={CREATE_COPY.LOAD_FAILED_DESCRIPTION}
          action={
            <AppButton
              theme="dark"
              title={CREATE_COPY.RETRY_BUTTON}
              onPress={() => {
                void loadMotorcycles();
              }}
            />
          }
        />
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
      contentContainerStyle={styles.container}
    >
      <PageHeader
        variant="dark"
        eyebrow={CREATE_COPY.SCREEN_EYEBROW}
        title={CREATE_COPY.SCREEN_TITLE}
        subtitle={CREATE_COPY.SCREEN_SUBTITLE}
      />

      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <Plus size={28} color={MOTORCYCLE_SHOWCASE_COLORS.background} />
        </View>

        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Mulai Tambah Konten</Text>
          <Text style={styles.heroDescription}>
            Pilih jenis konten yang ingin Anda tambahkan ke ProperRide.
          </Text>
        </View>
      </View>

      <View style={styles.optionList}>
        <CreateOptionCard
          icon={<Bike size={24} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />}
          title={CREATE_COPY.ADD_BUILD_TITLE}
          description={CREATE_COPY.ADD_BUILD_DESCRIPTION}
          onPress={handleAddBuild}
        />

        <CreateOptionCard
          icon={
            <PackagePlus size={24} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />
          }
          title={CREATE_COPY.ADD_PART_TITLE}
          description={CREATE_COPY.ADD_PART_DESCRIPTION}
          disabled={motorcycles.length === 0}
          disabledLabel={motorcycles.length === 0 ? "Butuh Build" : undefined}
          onPress={() => {
            handleSelectBuild("part");
          }}
        />

        <CreateOptionCard
          icon={<Camera size={24} color={MOTORCYCLE_SHOWCASE_COLORS.accent} />}
          title={CREATE_COPY.ADD_GALLERY_TITLE}
          description={CREATE_COPY.ADD_GALLERY_DESCRIPTION}
          disabled={motorcycles.length === 0}
          disabledLabel={motorcycles.length === 0 ? "Butuh Build" : undefined}
          onPress={() => {
            handleSelectBuild("gallery");
          }}
        />
      </View>

      {motorcycles.length === 0 ? (
        <View style={styles.helperCard}>
          <Text style={styles.helperTitle}>{CREATE_COPY.NO_BUILD_TITLE}</Text>
          <Text style={styles.helperDescription}>
            {CREATE_COPY.NO_BUILD_DESCRIPTION}
          </Text>
        </View>
      ) : null}
    </Screen>
  );
}

type CreateOptionCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
  disabledLabel?: string;
  onPress: () => void;
};

function CreateOptionCard({
  icon,
  title,
  description,
  disabled = false,
  disabledLabel,
  onPress,
}: CreateOptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.optionCard,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.optionCardDisabled : null,
      ]}
    >
      <View style={styles.optionIcon}>{icon}</View>

      <View style={styles.optionContent}>
        <View style={styles.optionTitleRow}>
          <Text style={styles.optionTitle}>{title}</Text>

          {disabledLabel ? (
            <View style={styles.disabledBadge}>
              <Text style={styles.disabledBadgeText}>{disabledLabel}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <ChevronRight
        size={20}
        color={
          disabled
            ? MOTORCYCLE_SHOWCASE_COLORS.textMuted
            : MOTORCYCLE_SHOWCASE_COLORS.accent
        }
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["2xl"],
    paddingBottom: spacing["5xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  heroIcon: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  heroDescription: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 19,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  optionList: {
    gap: spacing.md,
  },
  optionCard: {
    minHeight: 112,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  optionCardDisabled: {
    opacity: 0.58,
  },
  optionIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  optionContent: {
    flex: 1,
  },
  optionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  optionTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 15,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  optionDescription: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  disabledBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surfaceSoft,
  },
  disabledBadgeText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: MOTORCYCLE_SHOWCASE_COLORS.textMuted,
  },
  helperCard: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  helperTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  helperDescription: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.72,
  },
});

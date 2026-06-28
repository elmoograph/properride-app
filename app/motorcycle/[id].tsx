import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Screen } from "@/src/components/layout";

import { AppButton, EmptyState, ActionSheetModal } from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { colors, radius, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import {
  deleteMotorcycle,
  getMotorcycleById,
  getMotorcyclesByUserId,
} from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";

import type { MotorcycleGalleryPost } from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import type { Part } from "@/src/features/part/types/part.types";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import { getPartsByMotorcycleId } from "@/src/features/part/repositories/part.repository";
import { groupPartsByCategory } from "@/src/features/part/utils/partSummary";

import { ReportContentModal } from "@/src/features/safety/components/ReportContentModal";
import { SAFETY_COPY } from "@/src/features/safety/constants/safety.constants";
import type { ReportReason } from "@/src/features/safety/types/safety.types";

import { calculateMotorcycleDetailSummary } from "@/src/features/motorcycle/utils/motorcycleSummary";
import { BuildShowcaseHero } from "@/src/features/motorcycle/components/BuildShowcaseHero";
import { BuildShowcaseStats } from "@/src/features/motorcycle/components/BuildShowcaseStats";
import { BuildShowcaseTabs } from "@/src/features/motorcycle/components/BuildShowcaseTabs";
import {
  MOTORCYCLE_SHOWCASE_COLORS,
  MOTORCYCLE_SHOWCASE_COPY,
  MOTORCYCLE_SHOWCASE_TABS,
} from "@/src/features/motorcycle/constants/motorcycleShowcase.constants";
import type { MotorcycleShowcaseTab } from "@/src/features/motorcycle/types/motorcycle.types";
import { BuildSetupGroupCard } from "@/src/features/part/components/BuildSetupGroupCard";
import { BuildShowcaseOwnerActions } from "@/src/features/motorcycle/components/BuildShowcaseOwnerActions";

import { Trash2 } from "lucide-react-native";
import { MotorcycleGalleryPostGrid } from "@/src/features/motorcycleImage/components/MotorcycleGalleryPostGrid";
import {
  deleteMotorcycleGalleryPost,
  getMotorcycleGalleryPosts,
} from "@/src/features/motorcycleImage/repositories/motorcycleGallery.repository";
import { MotorcycleGalleryPostViewer } from "@/src/features/motorcycleImage/components/MotorcycleGalleryPostViewer";
import { deleteUploadedGalleryMedia } from "@/src/features/motorcycleImage/utils/uploadGalleryMedia";
import { MotorcycleSwitcherModal } from "@/src/features/motorcycle/components/MotorcycleSwitcherModal";
import {
  createContentReport,
  isUserBlocked,
} from "@/src/features/safety/repositories/safety.repository";

export default function MotorcycleDetailScreen() {
  const [activeShowcaseTab, setActiveShowcaseTab] =
    useState<MotorcycleShowcaseTab>(MOTORCYCLE_SHOWCASE_TABS.SETUP);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [ownerMotorcycles, setOwnerMotorcycles] = useState<Motorcycle[]>([]);
  const [motorcycleSwitcherVisible, setMotorcycleSwitcherVisible] =
    useState(false);
  const motorcycleId = Array.isArray(id) ? id[0] : id;
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const isOwner = motorcycle?.user_id === user?.id;
  const [galleryPosts, setGalleryPosts] = useState<MotorcycleGalleryPost[]>([]);

  const [parts, setParts] = useState<Part[]>([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [isBlockedOwner, setIsBlockedOwner] = useState(false);
  const groupedParts = groupPartsByCategory(parts);

  const galleryMediaCount = galleryPosts.reduce(
    (total, post) => total + post.media.length,
    0,
  );

  const motorcycleSummary = calculateMotorcycleDetailSummary({
    parts,
    galleryMediaCount,
  });

  const [selectedGalleryPost, setSelectedGalleryPost] =
    useState<MotorcycleGalleryPost | null>(null);
  useEffect(() => {
    if (!selectedGalleryPost) {
      return;
    }

    const updatedSelectedPost = galleryPosts.find(
      (post) => post.id === selectedGalleryPost.id,
    );

    if (!updatedSelectedPost) {
      setSelectedGalleryPost(null);
      return;
    }

    if (updatedSelectedPost !== selectedGalleryPost) {
      setSelectedGalleryPost(updatedSelectedPost);
    }
  }, [galleryPosts, selectedGalleryPost]);
  const [deletingGalleryPost, setDeletingGalleryPost] = useState(false);
  const loadDetail = useCallback(async () => {
    if (!motorcycleId) {
      setMotorcycle(null);
      setIsBlockedOwner(false);
      setLoading(false);
      return;
    }

    try {
      setIsBlockedOwner(false);
      const motorcycleData = await getMotorcycleById(motorcycleId);

      if (!motorcycleData) {
        setMotorcycle(null);
        setParts([]);
        setGalleryPosts([]);
        setOwnerMotorcycles([]);
        setIsBlockedOwner(false);

        return;
      }

      const owner = motorcycleData.user_id === user?.id;

      const blockedOwner =
        user?.id && motorcycleData.user_id !== user.id
          ? await isUserBlocked({
              blockerId: user.id,
              blockedId: motorcycleData.user_id,
            })
          : false;

      const [galleryPostData, partsData, ownerMotorcyclesData] =
        await Promise.all([
          getMotorcycleGalleryPosts(motorcycleId),

          getPartsByMotorcycleId(motorcycleId, {
            includePrivate: owner,
          }),

          getMotorcyclesByUserId(motorcycleData.user_id),
        ]);

      setMotorcycle(motorcycleData);
      setIsBlockedOwner(blockedOwner);
      setGalleryPosts(
        galleryPostData.filter((galleryPost) => galleryPost.media.length > 0),
      );

      setParts(partsData);
      setOwnerMotorcycles(ownerMotorcyclesData);
    } catch (error) {
      Alert.alert(
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_TITLE,
        MOTORCYCLE_COPY.DETAIL_LOAD_FAILED_MESSAGE,
      );
    } finally {
      setLoading(false);
    }
  }, [motorcycleId, user?.id]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      void loadDetail();
    }, [loadDetail]),
  );

  useEffect(() => {
    setSelectedGalleryPost(null);
    setActiveShowcaseTab(MOTORCYCLE_SHOWCASE_TABS.SETUP);
  }, [motorcycleId]);

  function handleAddPart() {
    if (!motorcycleId || !isOwner) {
      return;
    }

    router.push(ROUTES.PART.ADD(motorcycleId));
  }

  function handleOpenPart(partId: string) {
    router.push(ROUTES.PART.DETAIL(partId));
  }

  function handleEdit() {
    if (!motorcycleId || !isOwner) {
      return;
    }

    router.push(ROUTES.MOTORCYCLE.EDIT(motorcycleId));
  }

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.TABS.GARAGE);
  }, []);
  function handleOpenMotorcyclePicker() {
    if (!isOwner || ownerMotorcycles.length <= 1) {
      return;
    }

    setMotorcycleSwitcherVisible(true);
  }

  function handleCloseMotorcyclePicker() {
    setMotorcycleSwitcherVisible(false);
  }

  function handleSelectMotorcycle(nextMotorcycleId: string) {
    setMotorcycleSwitcherVisible(false);

    if (nextMotorcycleId === motorcycleId) {
      return;
    }

    router.replace(ROUTES.MOTORCYCLE.DETAIL(nextMotorcycleId));
  }

  function handleAddMotorcycle() {
    if (!isOwner) {
      return;
    }

    router.push(ROUTES.MOTORCYCLE.ADD);
  }

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBack();
        return true;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [handleBack]);

  function confirmDelete() {
    if (!isOwner || deleting) {
      return;
    }

    Alert.alert(
      MOTORCYCLE_COPY.DELETE_CONFIRM_TITLE,
      MOTORCYCLE_COPY.DELETE_CONFIRM_MESSAGE,
      [
        {
          text: COMMON_COPY.CANCEL,
          style: "cancel",
        },
        {
          text: COMMON_COPY.DELETE,
          style: "destructive",
          onPress: handleDelete,
        },
      ],
    );
  }

  async function handleDelete() {
    if (!motorcycleId || !isOwner || deleting) {
      return;
    }

    setDeleting(true);

    try {
      await deleteMotorcycle(motorcycleId);

      Alert.alert(
        MOTORCYCLE_COPY.DELETE_SUCCESS_TITLE,
        MOTORCYCLE_COPY.DELETE_SUCCESS_MESSAGE,
        [
          {
            text: COMMON_COPY.OK,
            onPress: () => router.replace(ROUTES.TABS.GARAGE),
          },
        ],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_COPY.DELETE_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_COPY.DELETE_FAILED_TITLE, message);
    } finally {
      setDeleting(false);
    }
  }

  function handleAddGallery() {
    if (!motorcycleId || !isOwner) {
      return;
    }

    router.push(ROUTES.GALLERY.ADD(motorcycleId));
  }

  function handleOpenMoreMenu() {
    if (!isOwner) {
      return;
    }

    setMoreMenuVisible(true);
  }

  function handleCloseMoreMenu() {
    setMoreMenuVisible(false);
  }

  function handleOpenGalleryPost(post: MotorcycleGalleryPost) {
    setSelectedGalleryPost(post);
  }
  function confirmDeleteGalleryPost(post: MotorcycleGalleryPost) {
    if (!isOwner || deletingGalleryPost) {
      return;
    }

    Alert.alert(
      MOTORCYCLE_IMAGE_COPY.DELETE_POST_CONFIRM_TITLE,
      MOTORCYCLE_IMAGE_COPY.DELETE_POST_CONFIRM_MESSAGE,
      [
        {
          text: COMMON_COPY.CANCEL,
          style: "cancel",
        },
        {
          text: COMMON_COPY.DELETE,
          style: "destructive",
          onPress: () => {
            void handleDeleteGalleryPost(post);
          },
        },
      ],
    );
  }

  function handleOpenReportBuild() {
    if (!user?.id || !motorcycle || isOwner || isBlockedOwner) {
      return;
    }

    setReportModalVisible(true);
  }

  function handleCloseReportBuild() {
    if (reportSubmitting) {
      return;
    }

    setReportModalVisible(false);
  }

  async function handleSubmitReportBuild(params: {
    reason: ReportReason;
    details: string;
  }) {
    if (
      !user?.id ||
      !motorcycle ||
      isOwner ||
      isBlockedOwner ||
      reportSubmitting
    ) {
      return;
    }
    try {
      setReportSubmitting(true);

      await createContentReport({
        reporterId: user.id,
        reportedUserId: motorcycle.user_id,
        motorcycleId: motorcycle.id,
        reason: params.reason,
        details: params.details,
      });

      setReportModalVisible(false);

      Alert.alert(
        SAFETY_COPY.REPORT_SUCCESS_TITLE,
        SAFETY_COPY.REPORT_SUCCESS_MESSAGE,
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        SAFETY_COPY.REPORT_FAILED_TITLE,
        SAFETY_COPY.REPORT_FAILED_MESSAGE,
      );
    } finally {
      setReportSubmitting(false);
    }
  }

  async function handleDeleteGalleryPost(post: MotorcycleGalleryPost) {
    if (!isOwner || deletingGalleryPost) {
      return;
    }

    setDeletingGalleryPost(true);

    const mediaPaths = post.media
      .map((media) => media.media_path)
      .filter((path): path is string => Boolean(path));

    const deletedPostIndex = galleryPosts.findIndex(
      (galleryPost) => galleryPost.id === post.id,
    );

    try {
      /*
       * Hapus database terlebih dahulu.
       * Record media akan ikut terhapus melalui ON DELETE CASCADE.
       */
      await deleteMotorcycleGalleryPost(post.id);

      const remainingPosts = galleryPosts.filter(
        (galleryPost) => galleryPost.id !== post.id,
      );

      setGalleryPosts(remainingPosts);

      /*
       * Bila post yang sedang dibuka dihapus, pindahkan viewer
       * ke post terdekat. Tutup viewer jika tidak ada post tersisa.
       */
      if (selectedGalleryPost?.id === post.id) {
        if (remainingPosts.length === 0) {
          setSelectedGalleryPost(null);
        } else {
          const nextIndex = Math.min(
            Math.max(deletedPostIndex, 0),
            remainingPosts.length - 1,
          );

          const nextPost = remainingPosts.at(nextIndex) ?? null;

          setSelectedGalleryPost(nextPost);
        }
      }

      /*
       * Bersihkan file Storage setelah database berhasil dihapus.
       * Kegagalan cleanup tidak membatalkan penghapusan post.
       */
      if (mediaPaths.length > 0) {
        try {
          await deleteUploadedGalleryMedia(mediaPaths);
        } catch (storageError) {
          console.warn(
            "Gallery Post terhapus, tetapi beberapa file Storage gagal dibersihkan:",
            storageError,
          );
        }
      }

      Alert.alert(
        MOTORCYCLE_IMAGE_COPY.DELETE_POST_SUCCESS_TITLE,
        MOTORCYCLE_IMAGE_COPY.DELETE_POST_SUCCESS_MESSAGE,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_IMAGE_COPY.DELETE_POST_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_IMAGE_COPY.DELETE_POST_FAILED_TITLE, message);
    } finally {
      setDeletingGalleryPost(false);
    }
  }

  function handleCloseGalleryPost() {
    if (deletingGalleryPost) {
      return;
    }

    setSelectedGalleryPost(null);
  }

  if (loading) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <ActivityIndicator color={colors.primary} />
      </Screen>
    );
  }

  if (!motorcycle) {
    return (
      <Screen contentContainerStyle={styles.centerContainer}>
        <EmptyState
          variant="dark"
          title={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_TITLE}
          description={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_DESCRIPTION}
          action={
            <AppButton
              title={COMMON_COPY.BACK}
              variant="secondary"
              onPress={handleBack}
            />
          }
        />
      </Screen>
    );
  }

  if (isBlockedOwner && !isOwner) {
    return (
      <Screen
        backgroundColor={MOTORCYCLE_SHOWCASE_COLORS.background}
        contentContainerStyle={styles.centerContainer}
      >
        <EmptyState
          variant="dark"
          title={SAFETY_COPY.BLOCKED_PROFILE_TITLE}
          description={SAFETY_COPY.BLOCKED_PROFILE_DESCRIPTION}
          action={
            <AppButton
              theme="dark"
              variant="secondary"
              title={COMMON_COPY.BACK}
              onPress={handleBack}
            />
          }
        />
      </Screen>
    );
  }

  return (
    <View style={styles.root}>
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
          <BuildShowcaseHero
            motorcycle={motorcycle}
            hasMultipleMotorcycles={isOwner && ownerMotorcycles.length > 1}
            onPressBack={handleBack}
            onPressAddMotorcycle={isOwner ? handleAddMotorcycle : undefined}
            onPressMotorcyclePicker={
              isOwner ? handleOpenMotorcyclePicker : undefined
            }
          />

          {!isOwner ? (
            <View style={styles.visitorSafetyActions}>
              <Pressable
                accessibilityRole="button"
                onPress={handleOpenReportBuild}
                style={({ pressed }) => [
                  styles.reportButton,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Text style={styles.reportButtonText}>
                  {SAFETY_COPY.REPORT_BUILD_TITLE}
                </Text>
              </Pressable>
            </View>
          ) : null}

          <BuildShowcaseStats summary={motorcycleSummary} />

          {isOwner ? (
            <BuildShowcaseOwnerActions
              onPressEditBuild={handleEdit}
              onPressAddPart={handleAddPart}
              onPressAddGallery={handleAddGallery}
              onPressMore={handleOpenMoreMenu}
            />
          ) : null}

          <BuildShowcaseTabs
            activeTab={activeShowcaseTab}
            onChangeTab={setActiveShowcaseTab}
          />

          {activeShowcaseTab === MOTORCYCLE_SHOWCASE_TABS.SETUP ? (
            <View style={styles.tabContent}>
              <View style={styles.publicSetupNotice}>
                <Text style={styles.publicSetupTitle}>
                  Public Setup Reference
                </Text>

                <Text style={styles.publicSetupDescription}>
                  Part yang ditampilkan di sini dapat dilihat rider lain sebagai
                  referensi dan inspirasi modifikasi.
                </Text>
              </View>

              {groupedParts.length > 0 ? (
                groupedParts.map((group) => (
                  <BuildSetupGroupCard
                    key={group.category}
                    category={group.category}
                    parts={group.parts}
                    showVisibility={isOwner}
                    onPressPart={handleOpenPart}
                  />
                ))
              ) : (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyTitle}>
                    {PART_COPY.EMPTY_LIST_TITLE}
                  </Text>

                  <Text style={styles.emptyDescription}>
                    {PART_COPY.EMPTY_LIST_DESCRIPTION}
                  </Text>
                </View>
              )}
            </View>
          ) : null}

          {activeShowcaseTab === MOTORCYCLE_SHOWCASE_TABS.TIMELINE ? (
            <View style={styles.tabContent}>
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>
                  {MOTORCYCLE_SHOWCASE_COPY.TIMELINE_EMPTY_TITLE}
                </Text>

                <Text style={styles.emptyDescription}>
                  {MOTORCYCLE_SHOWCASE_COPY.TIMELINE_EMPTY_DESCRIPTION}
                </Text>
              </View>
            </View>
          ) : null}

          {activeShowcaseTab === MOTORCYCLE_SHOWCASE_TABS.GALLERY ? (
            <View style={styles.tabContent}>
              {galleryPosts.length > 0 ? (
                <MotorcycleGalleryPostGrid
                  posts={galleryPosts}
                  showVisibility={isOwner}
                  onPressPost={handleOpenGalleryPost}
                />
              ) : (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyTitle}>
                    {MOTORCYCLE_SHOWCASE_COPY.GALLERY_EMPTY_TITLE}
                  </Text>

                  <Text style={styles.emptyDescription}>
                    {MOTORCYCLE_SHOWCASE_COPY.GALLERY_EMPTY_DESCRIPTION}
                  </Text>
                </View>
              )}
            </View>
          ) : null}
        </ScrollView>

        {isOwner ? (
          <>
            <ActionSheetModal
              visible={moreMenuVisible}
              title={MOTORCYCLE_SHOWCASE_COPY.MORE_MENU_TITLE}
              description={MOTORCYCLE_SHOWCASE_COPY.MORE_MENU_DESCRIPTION}
              cancelLabel={MOTORCYCLE_SHOWCASE_COPY.MORE_MENU_CANCEL}
              onClose={handleCloseMoreMenu}
              items={[
                {
                  label: MOTORCYCLE_SHOWCASE_COPY.MORE_MENU_DELETE_BUILD,
                  variant: "danger",
                  icon: <Trash2 size={18} color={colors.danger} />,
                  onPress: confirmDelete,
                },
              ]}
            />

            <MotorcycleSwitcherModal
              visible={motorcycleSwitcherVisible}
              motorcycles={ownerMotorcycles}
              activeMotorcycleId={motorcycleId}
              onClose={handleCloseMotorcyclePicker}
              onSelectMotorcycle={handleSelectMotorcycle}
            />
          </>
        ) : null}

        <ReportContentModal
          visible={reportModalVisible}
          title={SAFETY_COPY.REPORT_BUILD_TITLE}
          submitting={reportSubmitting}
          onClose={handleCloseReportBuild}
          onSubmit={handleSubmitReportBuild}
        />
      </Screen>
      <MotorcycleGalleryPostViewer
        visible={Boolean(selectedGalleryPost)}
        posts={galleryPosts}
        initialPostId={selectedGalleryPost?.id}
        canDelete={isOwner}
        deleting={deletingGalleryPost}
        onClose={handleCloseGalleryPost}
        onDeletePost={confirmDeleteGalleryPost}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingBottom: spacing["5xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  tabContent: {
    padding: spacing.xl,
    gap: spacing["2xl"],
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  emptyBox: {
    padding: spacing.xl,
    borderRadius: 16,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  emptyTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
    color: MOTORCYCLE_SHOWCASE_COLORS.textPrimary,
  },
  emptyDescription: {
    marginTop: spacing.sm,
    fontFamily: "Inter-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  publicSetupNotice: {
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.accent,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  publicSetupTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: MOTORCYCLE_SHOWCASE_COLORS.accent,
  },
  publicSetupDescription: {
    marginTop: spacing.xs,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  visitorSafetyActions: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.background,
  },
  reportButton: {
    alignSelf: "flex-start",
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: MOTORCYCLE_SHOWCASE_COLORS.border,
    backgroundColor: MOTORCYCLE_SHOWCASE_COLORS.surface,
  },
  reportButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: MOTORCYCLE_SHOWCASE_COLORS.textSecondary,
  },
  pressed: {
    opacity: 0.72,
  },
});

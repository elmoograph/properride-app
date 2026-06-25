import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
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
import { colors, spacing } from "@/src/theme";
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

  const [galleryPosts, setGalleryPosts] = useState<MotorcycleGalleryPost[]>([]);

  const [parts, setParts] = useState<Part[]>([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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
      setLoading(false);
      return;
    }

    try {
      const motorcycleData = await getMotorcycleById(motorcycleId);

      if (!motorcycleData) {
        setMotorcycle(null);
        setParts([]);
        setGalleryPosts([]);
        setOwnerMotorcycles([]);

        return;
      }

      const isOwner = motorcycleData.user_id === user?.id;

      const [galleryPostData, partsData, ownerMotorcyclesData] =
        await Promise.all([
          getMotorcycleGalleryPosts(motorcycleId),

          getPartsByMotorcycleId(motorcycleId, {
            includePrivate: isOwner,
          }),

          getMotorcyclesByUserId(motorcycleData.user_id),
        ]);

      setMotorcycle(motorcycleData);
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
      loadDetail();
    }, [loadDetail]),
  );

  useEffect(() => {
    setSelectedGalleryPost(null);
    setActiveShowcaseTab(MOTORCYCLE_SHOWCASE_TABS.SETUP);
  }, [motorcycleId]);

  function handleAddPart() {
    if (!motorcycleId) {
      return;
    }

    router.push(ROUTES.PART.ADD(motorcycleId));
  }

  function handleOpenPart(partId: string) {
    router.push(ROUTES.PART.DETAIL(partId));
  }

  function handleEdit() {
    if (!motorcycleId) {
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
    if (ownerMotorcycles.length <= 1) {
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
    if (!motorcycleId) {
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
    if (!motorcycleId) {
      return;
    }

    router.push(ROUTES.GALLERY.ADD(motorcycleId));
  }

  function handleOpenMoreMenu() {
    setMoreMenuVisible(true);
  }

  function handleCloseMoreMenu() {
    setMoreMenuVisible(false);
  }

  function handleOpenGalleryPost(post: MotorcycleGalleryPost) {
    setSelectedGalleryPost(post);
  }
  function confirmDeleteGalleryPost(post: MotorcycleGalleryPost) {
    if (deletingGalleryPost) {
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
  async function handleDeleteGalleryPost(post: MotorcycleGalleryPost) {
    if (deletingGalleryPost) {
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

          setSelectedGalleryPost(remainingPosts[nextIndex]);
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
            hasMultipleMotorcycles={ownerMotorcycles.length > 1}
            onPressBack={handleBack}
            onPressAddMotorcycle={handleAddMotorcycle}
            onPressMotorcyclePicker={handleOpenMotorcyclePicker}
          />

          <BuildShowcaseStats summary={motorcycleSummary} />

          <BuildShowcaseOwnerActions
            onPressEditBuild={handleEdit}
            onPressAddPart={handleAddPart}
            onPressAddGallery={handleAddGallery}
            onPressMore={handleOpenMoreMenu}
          />

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
                    showVisibility={motorcycle.user_id === user?.id}
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
                  showVisibility={motorcycle.user_id === user?.id}
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
      </Screen>
      <MotorcycleGalleryPostViewer
        visible={Boolean(selectedGalleryPost)}
        posts={galleryPosts}
        initialPostId={selectedGalleryPost?.id}
        canDelete={motorcycle.user_id === user?.id}
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
});

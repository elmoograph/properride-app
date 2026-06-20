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
import {
  AppButton,
  EmptyState,
  InfoRow,
  SectionCard,
  ActionSheetModal,
} from "@/src/components/ui";
import { COMMON_COPY } from "@/src/constants/copy";
import { ROUTES } from "@/src/constants/routes";
import { STORAGE_BUCKETS, STORAGE_FOLDERS } from "@/src/constants/storage";
import { colors, fontFamily, spacing } from "@/src/theme";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { MotorcycleHero } from "@/src/features/motorcycle/components/MotorcycleHero";
import { MOTORCYCLE_COPY } from "@/src/features/motorcycle/constants/motorcycle.constants";
import {
  deleteMotorcycle,
  getMotorcycleById,
  getMotorcyclesByUserId,
} from "@/src/features/motorcycle/repositories/motorcycle.repository";
import type { Motorcycle } from "@/src/features/motorcycle/types/motorcycle.types";
import { MotorcycleGalleryGrid } from "@/src/features/motorcycleImage/components/MotorcycleGalleryGrid";
import { MotorcycleGalleryModal } from "@/src/features/motorcycleImage/components/MotorcycleGalleryModal";
import { MOTORCYCLE_IMAGE_COPY } from "@/src/features/motorcycleImage/constants/motorcycleImage.constants";
import {
  createMotorcycleImage,
  deleteMotorcycleImage,
  getMotorcycleImages,
} from "@/src/features/motorcycleImage/repositories/motorcycleImage.repository";
import type { MotorcycleImage } from "@/src/features/motorcycleImage/types/motorcycleImage.types";
import {
  formatCc,
  formatMileage,
  formatOptionalValue,
} from "@/src/utils/format";
import { pickImageFromLibrary } from "@/src/utils/pickImage";
import { deleteUploadedImage, uploadImage } from "@/src/utils/uploadImage";
import { PART_COPY } from "@/src/features/part/constants/part.constants";
import { getPartsByMotorcycleId } from "@/src/features/part/repositories/part.repository";
import { PartCategoryGroupSection } from "@/src/features/part/components/PartCategoryGroupSection";
import { PartsSummaryCard } from "@/src/features/part/components/PartsSummaryCard";
import {
  calculatePartSummary,
  groupPartsByCategory,
} from "@/src/features/part/utils/partSummary";
import { PartFilterBar } from "@/src/features/part/components/PartFilterBar";
import {
  filterParts,
  getPartFilterCategories,
} from "@/src/features/part/utils/partFilter";
import { PART_SORT_OPTIONS } from "@/src/features/part/constants/part.constants";
import type {
  Part,
  PartSortOption,
} from "@/src/features/part/types/part.types";
import { sortParts } from "@/src/features/part/utils/partSort";
import { MotorcycleInfoGrid } from "@/src/features/motorcycle/components/MotorcycleInfoGrid";
import { MotorcycleSummaryCard } from "@/src/features/motorcycle/components/MotorcycleSummaryCard";
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
import {
  enableImmersiveMode,
  disableImmersiveMode,
} from "@/src/utils/systemBars";
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
  const [galleryImages, setGalleryImages] = useState<MotorcycleImage[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [partSearchQuery, setPartSearchQuery] = useState("");
  const [selectedPartCategory, setSelectedPartCategory] = useState<string>(
    PART_COPY.FILTER_ALL,
  );
  const [partSortOption, setPartSortOption] = useState<PartSortOption>(
    PART_SORT_OPTIONS.NEWEST,
  );
  const [selectedGalleryImage, setSelectedGalleryImage] =
    useState<MotorcycleImage | null>(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [deletingGalleryImage, setDeletingGalleryImage] = useState(false);

  const partFilterCategories = getPartFilterCategories(parts);

  const filteredParts = filterParts({
    parts,
    selectedCategory: selectedPartCategory,
    searchQuery: partSearchQuery,
  });

  const sortedParts = sortParts(filteredParts, partSortOption);

  const partSummary = calculatePartSummary(sortedParts);
  const groupedParts = groupPartsByCategory(sortedParts);

  const motorcycleSummary = calculateMotorcycleDetailSummary({
    parts,
    galleryImages,
  });

  const loadDetail = useCallback(async () => {
    if (!motorcycleId) {
      setLoading(false);
      return;
    }

    try {
      const motorcycleData = await getMotorcycleById(motorcycleId);

      if (!motorcycleData) {
        setMotorcycle(null);
        setGalleryImages([]);
        setParts([]);
        setOwnerMotorcycles([]);

        return;
      }

      const isOwner = motorcycleData.user_id === user?.id;

      const [galleryData, partsData, ownerMotorcyclesData] = await Promise.all([
        getMotorcycleImages(motorcycleId),
        getPartsByMotorcycleId(motorcycleId, {
          includePrivate: isOwner,
        }),
        getMotorcyclesByUserId(motorcycleData.user_id),
      ]);

      setMotorcycle(motorcycleData);
      setGalleryImages(galleryData);
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

  async function refreshGallery() {
    if (!motorcycleId) {
      return;
    }

    const nextGalleryImages = await getMotorcycleImages(motorcycleId);
    setGalleryImages(nextGalleryImages);
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadDetail();
    }, [loadDetail]),
  );
  useEffect(() => {
    enableImmersiveMode();

    return () => {
      disableImmersiveMode();
    };
  }, []);
  function handleChangePartCategory(category: string) {
    setSelectedPartCategory(category);
  }

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

  function handleBackToGarage() {
    router.replace(ROUTES.TABS.GARAGE);
  }
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
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBackToGarage();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

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

  async function handleAddGalleryImage() {
    if (!user || !motorcycleId) {
      return;
    }

    try {
      const imageUri = await pickImageFromLibrary();

      if (!imageUri) {
        return;
      }

      setUploadingGallery(true);

      const uploadedImage = await uploadImage({
        bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
        folder: STORAGE_FOLDERS.MOTORCYCLE_GALLERY,
        userId: user.id,
        uri: imageUri,
      });

      await createMotorcycleImage({
        motorcycle_id: motorcycleId,
        user_id: user.id,
        image_url: uploadedImage.publicUrl,
        image_path: uploadedImage.path,
      });

      await refreshGallery();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_IMAGE_COPY.UPLOAD_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_IMAGE_COPY.UPLOAD_FAILED_TITLE, message);
    } finally {
      setUploadingGallery(false);
    }
  }

  function handleOpenGalleryImage(image: MotorcycleImage) {
    setSelectedGalleryImage(image);
  }

  function handleCloseGalleryImage() {
    if (deletingGalleryImage) {
      return;
    }

    setSelectedGalleryImage(null);
  }

  function confirmDeleteGalleryImage() {
    Alert.alert(
      MOTORCYCLE_IMAGE_COPY.DELETE_CONFIRM_TITLE,
      MOTORCYCLE_IMAGE_COPY.DELETE_CONFIRM_MESSAGE,
      [
        {
          text: COMMON_COPY.CANCEL,
          style: "cancel",
        },
        {
          text: COMMON_COPY.DELETE,
          style: "destructive",
          onPress: handleDeleteGalleryImage,
        },
      ],
    );
  }

  async function handleDeleteGalleryImage() {
    if (!selectedGalleryImage) {
      return;
    }

    setDeletingGalleryImage(true);

    try {
      if (selectedGalleryImage.image_path) {
        await deleteUploadedImage({
          bucket: STORAGE_BUCKETS.MOTORCYCLE_IMAGES,
          path: selectedGalleryImage.image_path,
        });
      }

      await deleteMotorcycleImage(selectedGalleryImage.id);

      setSelectedGalleryImage(null);
      await refreshGallery();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : MOTORCYCLE_IMAGE_COPY.DELETE_FAILED_MESSAGE;

      Alert.alert(MOTORCYCLE_IMAGE_COPY.DELETE_FAILED_TITLE, message);
    } finally {
      setDeletingGalleryImage(false);
    }
  }

  function handleOpenMoreMenu() {
    setMoreMenuVisible(true);
  }

  function handleCloseMoreMenu() {
    setMoreMenuVisible(false);
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
          title={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_TITLE}
          description={MOTORCYCLE_COPY.DETAIL_NOT_FOUND_DESCRIPTION}
          action={
            <AppButton
              title={COMMON_COPY.BACK}
              variant="secondary"
              onPress={handleBackToGarage}
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
        <BuildShowcaseHero
          motorcycle={motorcycle}
          hasMultipleMotorcycles={ownerMotorcycles.length > 1}
          onPressBack={handleBackToGarage}
          onPressAddMotorcycle={handleAddMotorcycle}
          onPressMotorcyclePicker={handleOpenMotorcyclePicker}
        />

        <BuildShowcaseStats summary={motorcycleSummary} />

        <BuildShowcaseOwnerActions
          onPressEditBuild={handleEdit}
          onPressAddPart={handleAddPart}
          onPressAddGallery={handleAddGalleryImage}
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
                Public setup reference
              </Text>
              <Text style={styles.publicSetupDescription}>
                Parts shown here can be viewed by other riders for modification
                inspiration.
              </Text>
            </View>

            {groupedParts.length > 0 ? (
              groupedParts.map((group) => (
                <BuildSetupGroupCard
                  key={group.category}
                  category={group.category}
                  parts={group.parts}
                  onPressPart={handleOpenPart}
                />
              ))
            ) : (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>
                  {MOTORCYCLE_SHOWCASE_COPY.NO_PARTS_TITLE}
                </Text>

                <Text style={styles.emptyDescription}>
                  {MOTORCYCLE_SHOWCASE_COPY.NO_PARTS_DESCRIPTION}
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
            {galleryImages.length > 0 ? (
              <MotorcycleGalleryGrid
                images={galleryImages}
                onPressImage={handleOpenGalleryImage}
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

      <MotorcycleGalleryModal
        visible={Boolean(selectedGalleryImage)}
        image={selectedGalleryImage}
        deleting={deletingGalleryImage}
        onClose={handleCloseGalleryImage}
        onDelete={confirmDeleteGalleryImage}
      />
      <MotorcycleSwitcherModal
        visible={motorcycleSwitcherVisible}
        motorcycles={ownerMotorcycles}
        activeMotorcycleId={motorcycle.id}
        onClose={handleCloseMotorcyclePicker}
        onSelectMotorcycle={handleSelectMotorcycle}
      />
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
    </Screen>
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

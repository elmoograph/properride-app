import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ZoomableGalleryImageProps = {
  uri: string;
  active: boolean;
  onZoomChange?: (zoomed: boolean) => void;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2;

export function ZoomableGalleryImage({
  uri,
  active,
  onZoomChange,
}: ZoomableGalleryImageProps) {
  const scale = useSharedValue(MIN_SCALE);
  const savedScale = useSharedValue(MIN_SCALE);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  useEffect(() => {
    if (active) {
      return;
    }

    scale.value = withTiming(MIN_SCALE);
    savedScale.value = MIN_SCALE;

    translateX.value = withTiming(0);
    translateY.value = withTiming(0);

    savedTranslateX.value = 0;
    savedTranslateY.value = 0;

    onZoomChange?.(false);
  }, [
    active,
    onZoomChange,
    savedScale,
    savedTranslateX,
    savedTranslateY,
    scale,
    translateX,
    translateY,
  ]);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = clamp(savedScale.value * event.scale, MIN_SCALE, MAX_SCALE);
    })
    .onEnd(() => {
      if (scale.value <= MIN_SCALE + 0.01) {
        scale.value = withTiming(MIN_SCALE);
        savedScale.value = MIN_SCALE;

        translateX.value = withTiming(0);
        translateY.value = withTiming(0);

        savedTranslateX.value = 0;
        savedTranslateY.value = 0;

        if (onZoomChange) {
          runOnJS(onZoomChange)(false);
        }

        return;
      }

      savedScale.value = scale.value;

      if (onZoomChange) {
        runOnJS(onZoomChange)(true);
      }
    });

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, stateManager) => {
      if (scale.value > MIN_SCALE) {
        stateManager.activate();
        return;
      }

      stateManager.fail();
    })
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;

      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd((_event, success) => {
      if (!success) {
        return;
      }

      if (scale.value > MIN_SCALE) {
        scale.value = withTiming(MIN_SCALE);
        savedScale.value = MIN_SCALE;

        translateX.value = withTiming(0);
        translateY.value = withTiming(0);

        savedTranslateX.value = 0;
        savedTranslateY.value = 0;

        if (onZoomChange) {
          runOnJS(onZoomChange)(false);
        }

        return;
      }

      scale.value = withTiming(DOUBLE_TAP_SCALE);
      savedScale.value = DOUBLE_TAP_SCALE;

      if (onZoomChange) {
        runOnJS(onZoomChange)(true);
      }
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    doubleTapGesture,
    panGesture,
  );

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={{ uri }}
          style={[styles.image, animatedImageStyle]}
          resizeMode="cover"
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type ContextInterface = {
  translateX: number;
  translateY: number;
};

const innerBoxSize = 80;
const boundaryRadius = innerBoxSize * 2;

export const DragAndDrop: FC<any> = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < boundaryRadius + innerBoxSize / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View style={styles.boundaryContainer}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.loaderStyle, animatedStyles]} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    height: innerBoxSize,
    width: innerBoxSize,
    backgroundColor: '#FFA726',
    borderRadius: 20,
  },
  boundaryContainer: {
    height: boundaryRadius * 2,
    width: boundaryRadius * 2,
    borderRadius: (boundaryRadius * 2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFA726',
  },
});

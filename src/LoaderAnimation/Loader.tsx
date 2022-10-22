import React, {FC, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const Loader: FC<any> = () => {
  const progress = useSharedValue(0.5);
  const scale = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 100) / 2,
      transform: [
        {scale: scale.value},
        {rotate: `-${progress.value * Math.PI * 2}rad`},
      ],
    };
  }, []);
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 500}), -1, true);
    scale.value = withRepeat(withTiming(1.5, {duration: 500}), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={[styles.loaderStyle, animatedStyles]} />;
};

const styles = StyleSheet.create({
  loaderStyle: {height: 100, width: 100, backgroundColor: 'lightblue'},
});

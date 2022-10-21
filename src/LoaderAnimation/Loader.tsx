import React, {FC, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

export const Loader: FC<{}> = () => {
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
    progress.value = withRepeat(withSpring(1), -1, true);
    scale.value = withRepeat(withSpring(1.5), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={[styles.loaderStyle, animatedStyles]} />;
};

const styles = StyleSheet.create({
  loaderStyle: {height: 100, width: 100, backgroundColor: 'lightblue'},
});

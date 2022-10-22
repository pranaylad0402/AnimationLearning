import React, {FC} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const SIZE = width * 0.7;

interface PageProps {
  item: string;
  index: number;
  scrollOffset: Animated.SharedValue<number>;
}

export const RenderPage: FC<PageProps> = ({item, index, scrollOffset}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const animatedStyles = useAnimatedStyle(() => {
    //Scalaing the inner box in the screen based on scroll offset value
    const scale = interpolate(
      scrollOffset.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    //Changing the inner box borserradius in the screen based on scroll offset value
    const borderRadius = interpolate(
      scrollOffset.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale: scale}],
      borderRadius: borderRadius,
    };
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => {
    // Moving the text in y Axis based on sccroll offset value
    const translateTextY = interpolate(
      scrollOffset.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );
    //Changing the opacity of text based on scroll offset value
    const opacity = interpolate(
      scrollOffset.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: translateTextY}],
      opacity: opacity,
    };
  });
  return (
    <View
      style={[
        {
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
        },
        styles.pageContainer,
      ]}
      key={index.toString()}>
      <Animated.View style={[styles.square, animatedStyles]} />
      <Animated.View style={[styles.absolute, animatedTextStyle]}>
        <Text style={styles.textStyle}>{item}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5 )',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {fontWeight: '700', color: 'white', fontSize: 40},
  absolute: {position: 'absolute'},
});

import React, {FC} from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {RenderPage} from './components/Page';

const data = ['Hello', 'There', "What's Up"];

export const InterpolateScrollview: FC<any> = () => {
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    //FInding the scroll offset
    scrollOffset.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}>
      {data.map((item, index) => (
        <RenderPage
          index={index}
          item={item}
          scrollOffset={scrollOffset}
          key={index.toString()}
        />
      ))}
    </Animated.ScrollView>
  );
};

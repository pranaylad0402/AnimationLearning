import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DragAndDrop} from './src/PanGestureHandler/DragAndDrop';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <View style={styles.container}>
        <DragAndDrop />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', flex: 1},
  gestureHandler: {flex: 1},
});

export default App;

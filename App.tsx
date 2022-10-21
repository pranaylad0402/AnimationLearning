import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Loader} from './src/LoaderAnimation/Loader';

const App = () => {
  return (
    <View style={styles.container}>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', flex: 1},
});

export default App;

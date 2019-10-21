import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {green, dark} from '../colorPallete';

const Loading = props => {
  return (
    <View style={styles.container}>
      <SkypeIndicator style={{justifyContent: 'flex-end'}} color={green} />
      <View style={{flex: 1}}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: dark,
  },
});

export default Loading;

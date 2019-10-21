import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {green, dark} from '../colorPallete';

const Loading = props => {
  return (
    <View style={{flex: 1}}>
      <BarIndicator color={green} style={styles.indicator} />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    color: dark,
  },
});

export default Loading;

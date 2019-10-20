import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Container} from 'native-base';
import {green} from '../colorPallete';

const Loading = props => {
  return (
    <Container style={styles.container}>
      <ActivityIndicator size="large" color={green} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;

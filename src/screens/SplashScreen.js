import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, AsyncStorage} from 'react-native';
import Logo from '../assets/images/logo.png';

import {green} from '../colorPallete';

export class SplashScreen extends Component {

  async componentDidMount() {
    const { navigate } = this.props.navigation;
    try {
      const token = await AsyncStorage.getItem('token');
      setTimeout(() => {
        token ? navigate('ForYou') : navigate('Welcome');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Logo} style={{ width: 300, height: 250, marginBottom: 20 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: green,
  },
});

export default SplashScreen;

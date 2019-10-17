import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import WhiteLogo from '../../assets/images/white-logo.png';

import {green} from '../../colorPallete';

export class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image source={WhiteLogo} style={{width: 250, height: 200}} />
          <Text style={styles.title}>Your New Manga Reader</Text>
        </View>
        <View style={styles.introContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.button}>
            <Text style={styles.buttonText}>Login with Email</Text>
          </TouchableOpacity>
          <Text style={styles.divider}>────── OR Register Account ──────</Text>
          <TouchableOpacity
            onPress={() => console.log('register screen')}
            style={styles.button}>
            <Text style={styles.buttonText}>Register an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    color: green,
    marginVertical: 10,
  },
  introContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    width: 250,
    marginVertical: 20,
    backgroundColor: green,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  divider: {
    color: '#b0b0b0',
  },
});

export default Welcome;

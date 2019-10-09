import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';

const LoginButton = props => {
  let button;
  
  if (props.isValid.email && props.isValid.password) {
    button =
    <Button
      style={styles.validButton}
      onPress={props.onPress}
    >
      <Text style={styles.text}>Login</Text>
    </Button>
  } else {
    button = 
    <Button style={styles.invalidButton} disabled>
      <Text style={[styles.text, { color: '#bbb' }]}>Login</Text>
    </Button>
  }

  return button;
};

const styles = StyleSheet.create({
  validButton: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#00b900',
    borderColor: '#dadada',
  },
  invalidButton: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#ddd',
    borderColor: '#dadada',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  }
});

export default LoginButton;

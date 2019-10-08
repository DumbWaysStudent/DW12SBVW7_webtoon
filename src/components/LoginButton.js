import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';

const LoginButton = props => {
  let button;
  
  if (props.isValid) {
    button =
    <Button style={styles.validButton}>
      <Text style={{ fontWeight: 'bold' }}>Log In</Text>
    </Button>
  } else {
    button = 
    <Button style={styles.invalidButton} disabled>
      <Text style={{ color: '#06d106', fontWeight: 'bold' }}>Log In</Text>
    </Button>
  }

  return button;
};

const styles = StyleSheet.create({
  validButton: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#06d106',
    borderColor: '#dadada',
    borderWidth: 1,
  },
  invalidButton: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#ddd',
    borderColor: '#dadada',
    borderWidth: 1,
  },
});

export default LoginButton;

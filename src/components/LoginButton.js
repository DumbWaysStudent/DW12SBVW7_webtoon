import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';

const LoginButton = props => {
  let button;
  
  if (props.isValid.email && props.isValid.password) {
    button =
    <Button style={styles.validButton}>
      <Text style={styles.text}>Login</Text>
    </Button>
  } else {
    button = 
    <Button style={styles.invalidButton} disabled>
      <Text style={[styles.text, { color: '#06d106' }]}>Login</Text>
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
    // borderWidth: 1,
  },
  invalidButton: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#ddd',
    borderColor: '#dadada',
    // borderWidth: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  }
});

export default LoginButton;

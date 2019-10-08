import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Form, Item, Input, Text, Icon } from 'native-base';

import LoginButton from '../components/LoginButton';

// Helpers
import {emailValidation} from '../helpers/validation';

export class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    security: true,
    isValidEmail: false,
  };

  checkEmail(input) {
    const isTrue = emailValidation(input);

    if (isTrue) {
      this.setState({isValidEmail: true});
    } else {
      this.setState({isValidEmail: false});
    }

    this.setState({email: input});
  }

  _changeIcon() {
    this.setState({security: !this.state.security});
  }

  render() {
    return (
      <Container style={{backgroundColor: '#fafafa'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: '5%',
          }}>
          <Text style={styles.title}>LOG IN</Text>
          <Text style={styles.subtitle}>Login with your account WEBTOON</Text>
        </View>
        <View style={{flex: 2, paddingHorizontal: 20}}>
          <Form>
            <Item rounded style={styles.form}>
              <Input
                placeholder="Email"
                style={{fontSize: 15}}
                onChangeText={this.checkEmail.bind(this)}
              />
            </Item>
            <Item rounded style={styles.form}>
              <Input
                placeholder="Password"
                style={{fontSize: 15}}
                secureTextEntry={this.state.security}
              />
              <Icon
                name={this.state.security ? 'eye' : 'eye-off'}
                onPress={this._changeIcon.bind(this)}
              />
            </Item>
          </Form>
          <LoginButton isValid={this.state.isValidEmail} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#06d106',
  },
  subtitle: {
    fontSize: 15,
    letterSpacing: 1,
    color: '#06d106',
  },
  form: {
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Login;

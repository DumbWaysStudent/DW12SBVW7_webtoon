import React, {Component} from 'react';
import {StyleSheet, View, AsyncStorage} from 'react-native';
import {Container, Form, Item, Input, Text, Icon} from 'native-base';

import axios from '../../helpers/axios';
import {emailValidation} from '../../helpers/validation';

import LoginButton from '../../components/LoginButton';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    security: true,
    isValidEmail: false,
    isValidPassword: false,
    eyeColor: '#c3c3c3',
  };

  handleSubmitLogin = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: '/login',
        data: {
          email: this.state.email,
          password: this.state.password,
        },
      });
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('dataUser', JSON.stringify(data.dataUser));

      this.props.navigation.navigate('ForYou');
    } catch (error) {
      console.error(error);
    }
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

  checkPassword(input) {
    if (input.length < 1) {
      this.setState({isValidPassword: false});
    } else {
      this.setState({isValidPassword: true});
    }

    this.setState({password: input});
  }

  changeIcon() {
    let eyeColor;
    if (this.state.security) {
      eyeColor = '#555';
    } else {
      eyeColor = '#c3c3c3';
    }

    this.setState({
      security: !this.state.security,
      eyeColor,
    });
  }

  render() {
    const dataLogin = {
      email: this.state.isValidEmail,
      password: this.state.isValidPassword,
    };

    return (
      <Container style={styles.container}>
        <View style={styles.topWrapper}>
          <Text style={styles.title}>LOG IN</Text>
          <Text style={styles.subtitle}>Login with your account SANTOON</Text>
        </View>
        <View style={styles.bottomWrapper}>
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
                onChangeText={this.checkPassword.bind(this)}
              />
              <Icon
                name={this.state.security ? 'eye-off' : 'eye'}
                onPress={this.changeIcon.bind(this)}
                style={{color: this.state.eyeColor}}
              />
            </Item>
          </Form>
          <LoginButton isValid={dataLogin} onPress={this.handleSubmitLogin} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#00b900',
  },
  subtitle: {
    fontSize: 15,
    letterSpacing: 1,
    color: '#00b900',
  },
  form: {
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  topWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '5%',
  },
  bottomWrapper: {
    flex: 2,
    paddingHorizontal: 20,
  },
});

export default Login;

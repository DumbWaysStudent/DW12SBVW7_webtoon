import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../../helpers/axios';
import {NavigationEvents} from 'react-navigation';

import Picture from '../../components/Picture';
import {dark, green} from '../../colorPallete';

import { API } from 'react-native-dotenv';


export class Profile extends Component {
  static navigationOptions = ({navigation}) => {
    const name = navigation.getParam('name');
    const image = navigation.getParam('image');
    return {
      title: 'Profile',
      headerTintColor: dark,
      headerRight: (
        <Icon
          name="pencil"
          size={25}
          color={green}
          style={{marginRight: 20}}
          onPress={() =>
            navigation.navigate('EditProfile', {
              name,
              image,
            })
          }
        />
      ),
    };
  };

  state = {
    name: '',
    image: '',
  };

  async componentDidMount() {
    const dataUser = await AsyncStorage.getItem('dataUser');
    const user = JSON.parse(dataUser);
    this.props.navigation.setParams({
      name: user.name,
      image: API + '/' + user.imageUrl,
    });
    this.setState({
      name: user.name,
      image: user.image,
    });
  }

  fetchUser = async () => {
    const dataUser = await AsyncStorage.getItem('dataUser');
    const user = JSON.parse(dataUser);
    const {data} = await axios({
      method: 'GET',
      url: `/api/v1/user/${user.id}/profile`,
    });
    const setImage = data.imageUrl ? API + '/' + data.imageUrl : '';
    this.setState({
      name: data.name,
      image: setImage,
    });
    await AsyncStorage.setItem('dataUser', JSON.stringify(data.dataUser));
  };

  handleLogout = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      await AsyncStorage.removeItem('token');
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onDidFocus={this.fetchUser} />
        <View style={styles.profile}>
          <Picture image={this.state.image} />
          <Text style={styles.yourName}>{this.state.name}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('MyWebtoon')}>
          <View
            style={[
              styles.content,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={styles.textContent}>My Webtoon Creation</Text>
            <Icon name="chevron-right" color="#ccc" size={25} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handleLogout()}>
          <View
            style={[
              styles.content,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.textContent]}>Log Out</Text>
            <Icon name="chevron-right" color="#ccc" size={25} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourName: {
    color: dark,
    fontSize: 25,
    marginTop: 20,
  },
  profile: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  content: {
    padding: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginVertical: 5,
  },
  textContent: {
    fontSize: 18,
  },
});

export default Profile;

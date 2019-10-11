import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Picture from '../components/Picture';

import { dark, green } from '../colorPallete';

export class Profile extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
      headerTintColor: dark,
      headerRight: (
        <Icon
          name="pencil"
          size={25}
          color={green}
          style={{marginRight: 20}}
          onPress={() => navigation.navigate('EditProfile')}
        />
      ),
    };
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.profile}>
          <Picture />
          <Text style={styles.yourName}>Your Name</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('MyWebtoon')}
        >
          <View
            style={[
              styles.content,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={styles.textContent}>My Webtoon Creation</Text>
            <Icon
              name="chevron-right"
              color="#ccc"
              size={25}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('logout')}>
          <Text
            style={[
              styles.textContent,
              {padding: 10, borderColor: '#d3d3d3', borderWidth: 1},
            ]}>
            Log Out
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourName: {
    color: dark,
    fontSize: 25,
    marginTop:20,
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
    marginBottom: 1,
  },
  textContent: {
    fontSize: 18,
  },
});

export default Profile;

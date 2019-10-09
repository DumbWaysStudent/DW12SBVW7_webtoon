import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Profile extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={{fontSize: 15}}>Profile</Text>
          <TouchableWithoutFeedback onPress={() => console.log('edit profile')}>
            <Icon name="pencil" size={25} color="#009b00" />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.profile}>
          <View style={styles.profileImage}>
            <Icon name="user" color="#ccc" size={140} />
          </View>
          <Text style={{fontSize: 23}}>Your Name</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => console.log('change screen')}>
          <View style={[styles.content, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.textContent}>My Webtoon Creation</Text>
            <Icon name="chevron-right" color='#ccc' size={25} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('logout')}>
          <Text style={[styles.textContent, { padding: 10, borderColor: '#d3d3d3', borderWidth: 1, }]}>Log Out</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    elevation: 2,
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

import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import axios from '../../helpers/axios';

import Picture from '../../components/Picture';

export class EditProfile extends Component {
  state = {
    avatarSource: null,
    name: '',
  };

  async componentDidMount() {
    const dataUser = await AsyncStorage.getItem('dataUser');
    const user = JSON.parse(dataUser);
    this.setState({
      name: user.name,
      image: user.imageUrl,
    });
  }

  handleUploadPhoto = () => {
    ImagePicker.showImagePicker(response => {
      // Same code as in above section!
      // console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const data = new FormData();
        data.append('name', 'avatar');
        data.append('fileData', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={{fontSize: 18}}>Edit Profile</Text>
          <Icon
            name="check"
            size={25}
            color="#009b00"
            onPress={() => this.props.navigation.pop()}
          />
        </View>
        <View style={styles.profile}>
          <Picture avatarSource={this.state.avatarSource} />
          <View style={styles.camera}>
            <Icon name="camera" size={20} onPress={this.handleUploadPhoto} />
          </View>
          <TextInput
            style={styles.nameInput}
            placeholder="Your Name"
            value={this.state.name}
            onChange={input => this.setState({name: input})}
          />
        </View>
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
    flex: 1,
    paddingVertical: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  camera: {
    padding: 5,
    borderRadius: 30,
    marginTop: -40,
    marginLeft: 110,
    backgroundColor: '#fff',
  },
  nameInput: {
    width: 300,
    paddingHorizontal: 16,
    marginVertical: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default EditProfile;

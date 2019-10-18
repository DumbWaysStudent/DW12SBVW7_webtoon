import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import axios from '../../helpers/axios';

import Picture from '../../components/Picture';

export class EditProfile extends Component {
  state = {
    name: '',
    image: '',
    dataImage: null,
  };

  componentDidMount() {
    const name = this.props.navigation.getParam('name');
    const image = this.props.navigation.getParam('image');
    this.setState({
      name,
      image,
    });
  }

  handleImagePicker = () => {
    ImagePicker.showImagePicker(response => {
      if (response.uri) {
        const dataImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        this.setState({image: response.uri, dataImage});
      }
    });
  };

  handleUpload = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const dataUser = await AsyncStorage.getItem('dataUser');
      const user = JSON.parse(dataUser);

      const data = new FormData();
      data.append('name', this.state.name);
      if (this.state.dataImage) data.append('img', this.state.dataImage);

      const response = await axios({
        method: 'PUT',
        url: `/api/v1/user/${user.id}/profile`,
        data,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
          this.props.navigation.pop();
      }
    } catch (error) {
      console.error(error);
    }
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
            onPress={this.handleUpload}
          />
        </View>
        <View style={styles.profile}>
          <Picture image={this.state.image} />
          <View style={styles.camera}>
            <Icon name="camera" size={20} onPress={this.handleImagePicker} />
          </View>
          <TextInput
            style={styles.nameInput}
            placeholder="Your Name"
            value={this.state.name}
            onChangeText={input => this.setState({name: input})}
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

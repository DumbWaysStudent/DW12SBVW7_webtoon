import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import axios from '../helpers/axios';

// import {SmallHorizontalCard} from '../components/Card';

import {green, lightGrey, dark} from '../colorPallete';

const dim = Dimensions.get('window');

export class CreateWebtoon extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerRight: (
        <Icon
          name="check"
          size={25}
          color={green}
          style={{marginRight: 15}}
          onPress={params.handleCreate}
        />
      ),
    };
  };

  state = {
    data: [],
    title: '',
    genre: '',
    image: '',
    dataImage: null,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleCreate: this.handleCreate,
    });
  }

  handleUploadPhoto = () => {
    ImagePicker.showImagePicker(response => {
      if (response.uri) {
        const source = {uri: response.uri};
        const dataImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        this.setState({image: source, dataImage});
      }
    });
  };

  handleCreate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const dataUser = await AsyncStorage.getItem('dataUser');
      const user = JSON.parse(dataUser);

      const data = new FormData();
      data.append('title', this.state.title);
      data.append('genre', this.state.genre);
      data.append('img', this.state.dataImage);

      const response = await axios({
        method: 'POST',
        url: `/api/v1/user/${user.id}/sanstoon`,
        data,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);

      if (response.status == 201) {
        this.props.navigation.pop();
        this.setState({
          title: '',
          genre: '',
          image: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    // const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={input => this.setState({title: input})}
        />

        <Text style={styles.textTitle}>Genre</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={input => this.setState({genre: input})}
        />

        <Text style={styles.textTitle}>Cover Image</Text>
        <TouchableWithoutFeedback onPress={this.handleUploadPhoto}>
          <View style={styles.coverContainer}>
            {!this.state.image ? (
              <>
                <Icon name="photo" size={40} color={dark} />
                <Text style={{fontSize: 13, color: dark, marginTop: 10}}>
                  Select Image
                </Text>
              </>
            ) : (
              <Image
                source={this.state.image}
                style={{height: 200, width: dim.width}}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: 15,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: lightGrey,
    height: 40,
  },
  uploadBtn: {
    marginTop: 10,
    marginHorizontal: 10,
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: green,
    borderRadius: 5,
  },
  coverContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#bbb',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
});

export default CreateWebtoon;

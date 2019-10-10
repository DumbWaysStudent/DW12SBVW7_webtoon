import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import Item from '../components/Item';
import {green} from '../colorPallete';

// dummy episode
import {episodes} from '../__dummy__/data';

export class CreateEpisode extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Icon
          name="check"
          size={25}
          color="#009b00"
          style={{marginRight: 20}}
          onPress={() => console.log('add webtoon')}
        />
      ),
    };
  };

  state = {
    episodes: episodes,
    imgSource: null,
  };

  handleUploadImage = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source_data = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imgSource: source,
        });
      }
    });
  };

  handleDeleteImage = id => {
    console.log('delete image with id ' + id);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.textTitle}> Name </Text>
          <TextInput style={styles.titleInput} />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>Add Images</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.episodes}
            renderItem={({item, index}) => (
              <Item
                handleDeleteImage={this.handleDeleteImage}
                item={item}
                index={index}
              />
            )}
            keyExtractor={item => item.name}
          />
          <TouchableHighlight
            style={styles.addImageBtn}
            onPress={this.handleUploadImage}>
            <Text style={styles.btnText}> + Image </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 17,
  },
  titleInput: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  addImageBtn: {
    backgroundColor: green,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },
});

export default CreateEpisode;

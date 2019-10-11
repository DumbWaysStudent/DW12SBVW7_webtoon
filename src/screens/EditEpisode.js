import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import { green, lightGrey } from '../colorPallete';

// Components
// import Item from '../components/Item';
import {SmallHorizontalCard} from '../components/Card';

// Dummy Data
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
          onPress={() => console.log('edit episode')}
        />
      ),
    };
  };

  state = {
    episodes: episodes,
    title: '',
    imgSource: null,
  };

  componentDidMount() {
    const title = this.props.navigation.getParam('title');
    this.setState({ title });
  }

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
        this.setState({
          imgSource: source,
        });
      }
    });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>Name</Text>
        <TextInput value={this.state.title} style={styles.titleInput} />
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>Add Images</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.episodes}
            renderItem={({item}) => (
              <SmallHorizontalCard data={item} navigation={navigation} />
            )}
            keyExtractor={item => item.name}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              style={[styles.button, {flex: 1}]}
              onPress={this.handleUploadImage}>
              <Text style={styles.btnText}> + Image </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.button, {flex: 1, backgroundColor: 'red'}]}
              onPress={() => console.log('delete episode')}>
              <Text style={styles.btnText}>Delete Episode</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: 17,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  titleInput: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: lightGrey,
  },
  button: {
    backgroundColor: green,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },
});

export default CreateEpisode;

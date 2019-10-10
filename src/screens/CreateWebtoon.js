import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {green} from '../colorPallete';

const dummyData = [
  {
    episode: '5',
    image:
      'https://swebtoon-phinf.pstatic.net/20180830_36/1535615172886xSese_JPEG/1535615172834143667.jpg?type=q90',
    published: '8 January 2019',
  },
  {
    episode: '4',
    image:
      'https://swebtoon-phinf.pstatic.net/20180827_132/1535380329264w7rd9_JPEG/1535380329232143659.jpg?type=q90',
    published: '28 December 2018',
  },
  {
    episode: '3',
    image:
      'https://swebtoon-phinf.pstatic.net/20180820_103/1534768339463nG720_JPEG/1534768339426143643.jpg?type=q90',
    published: '21 December 2018',
  },
  {
    episode: '2',
    image:
      'https://swebtoon-phinf.pstatic.net/20180815_26/1534307033273c3ku7_PNG/thumb_1534307013586143634.png?type=q90',
    published: '15 December 2018',
  },
  {
    episode: '1',
    image:
      'https://swebtoon-phinf.pstatic.net/20180816_264/15343831943986uGfh_JPEG/1534383194362143623.jpg?type=q90',
    published: '8 December 2018',
  },
  {
    episode: '0',
    image:
      'https://swebtoon-phinf.pstatic.net/20180816_60/1534383160207RqTJG_JPEG/1534383160169143610.jpg?type=q90',
    published: '1 December 2018',
  },
];

export class CreateWebtoon extends Component {
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
    data: dummyData,
  };

  _renderImage = ({webtoon}) => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <View style={{borderWidth: 1, borderColor: '#ccc'}}>
          <Image
            source={{uri: webtoon.image}}
            style={{width: 80, height: 80}}
            resizeMode="stretch"
          />
        </View>
        <View style={{alignSelf: 'center', marginLeft: 20}}>
          <Text style={{marginBottom: 10, fontWeight: 'bold', fontSize: 15}}>
            Ep. {webtoon.episode}
          </Text>
          <Text style={{color: '#aaa', fontSize: 12}}>
            {webtoon.episode} Episode(s)
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 17}}>Title</Text>
          <TextInput style={styles.titleInput} />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 17, marginVertical: 5}}>Episode</Text>
          <FlatList
            data={this.state.data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <this._renderImage webtoon={item} />}
            keyExtractor={item => item.episode}
          />
        </View>
        <TouchableHighlight
          style={{
            backgroundColor: green,
            padding: 10,
            marginVertical: 10,
          }}
          onPress={() => this.props.navigation.navigate('CreateEpisode')}>
          <Text style={{textAlign: 'center', fontSize: 17, color: 'white'}}>
            + Add Episode
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInput: {
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});

export default CreateWebtoon;

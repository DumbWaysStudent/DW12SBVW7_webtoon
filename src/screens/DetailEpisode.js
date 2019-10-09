import React, { Component } from 'react';
import { Image, Dimensions, FlatList, Share } from 'react-native';
import { Icon } from 'native-base';

const BannerWidth = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const images = [
  'https://swebtoon-phinf.pstatic.net/20190123_235/1548235775159edGIC_JPEG/1548235775138143615.jpg?type=q90',
  'https://swebtoon-phinf.pstatic.net/20190123_171/1548235775143U20lA_JPEG/1548235775124143615.jpg?type=q90',
  'https://swebtoon-phinf.pstatic.net/20190123_144/1548235775143HBeD2_JPEG/1548235775096143617.jpg?type=q90',
];

function Item({images}) {
  return (
    <Image
      source={{uri: images}}
      style={{width: BannerWidth, height: Height}}
    />
  );
}

export class DetailEpisode extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: `Episode ${navigation.getParam('episode')}`,
      headerStyle: {
        backgroundColor: '#3d3d3d',
        elevation: 0,
        shadowOpacity: 0,
      },
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
      headerTintColor: '#fff',
      headerRight: (
        <Icon
          name="share"
          size={25}
          style={{marginRight: 15, color: '#fff'}}
          onPress={() =>
            Share.share({
              message: 'Webtoon aing yeuh!',
            })
          }
        />
      ),
    };
  };
  render() {
    return (
      <FlatList
        data={images}
        renderItem={({item}) => <Item images={item} />}
        keyExtractor={item => item}
      />
    );
  }
}

export default DetailEpisode;

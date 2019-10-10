import React, {Component} from 'react';
import {Image, Dimensions, FlatList, Share} from 'react-native';
import {Icon} from 'native-base';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const images = [
  'https://swebtoon-phinf.pstatic.net/20190123_235/1548235775159edGIC_JPEG/1548235775138143615.jpg?type=q90',
  'https://swebtoon-phinf.pstatic.net/20190123_171/1548235775143U20lA_JPEG/1548235775124143615.jpg?type=q90',
  'https://swebtoon-phinf.pstatic.net/20190123_144/1548235775143HBeD2_JPEG/1548235775096143617.jpg?type=q90',
];

function Item({ images, width, height }) {
  return (
    <Image
      source={{ uri: images }}
      style={{ width, height, alignSelf: 'center' }}
      resizeMode='stretch'
      // resizeMode={width < height ? 'stretch' : 'center'}
    />
  );
}

export class DetailEpisode extends Component {
  state = {
    screenWidth: Width,
    screenHeight: Height,
  };

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

  updateLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    console.log(width, height)
    this.setState({
      screenWidth: width,
      screenHeight: height,
    });
  }


  render() {
    return (
      <FlatList
        contentContainerStyle={{ backgroundColor: '#f0f0f0' }}
        data={images}
        renderItem={({item}) => (
          <Item
            images={item}
            width={this.state.screenWidth}
            height={this.state.screenHeight}
          />
        )}
        onLayout={this.updateLayout}
        keyExtractor={item => item}
      />
    );
  }
}

export default DetailEpisode;

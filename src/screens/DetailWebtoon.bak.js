import React, {Component} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Share,
  TouchableWithoutFeedback,
} from 'react-native';
import { Header } from 'react-navigation';
import { Icon } from 'native-base';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 250;
const details = [
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

function Item({detail, navigation}) {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('DetailEpisode', {episode: detail.episode})
      }>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: '#bbb',
          flexDirection: 'row',
        }}>
        <Image source={{uri: detail.image}} style={{height: 100, width: 100}} />
        <View style={{margin: 25, justifyContent: 'space-around'}}>
          <Text style={{fontSize: 15}}>EPISODE {detail.episode}</Text>
          <Text style={{fontSize: 12, color: '#bbb'}}>{detail.published}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export class DetailSanstoon extends Component {
  static navigationOptions = ({navigation}) => {
    const image = navigation.getParam('image');
    return {
      title: navigation.getParam('title'),
      headerStyle: {
        backgroundColor: 'transparent',        
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#fff',
      headerBackground: (
        <View style={{width: BannerWidth, height: BannerHeight}}>
          <Image source={{uri: image}} style={StyleSheet.absoluteFill} />
        </View>
      ),
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
    const { navigation } = this.props;
    const headerHeight = Header.HEIGHT;
    return (
      <View style={styles.container}>
        <View style={{ width: BannerWidth, height: BannerHeight - headerHeight }}></View>
        <FlatList
          data={details}
          renderItem={({item}) => (
            <Item detail={item} navigation={navigation} />
          )}
          keyExtractor={item => item.episode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  bannerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
});

export default DetailSanstoon;
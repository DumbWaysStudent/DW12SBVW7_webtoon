import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { green } from '../colorPallete';

const myWebtoon = [
  {
    title: 'The Secret of Angel',
    image:
      'https://swebtoon-phinf.pstatic.net/20180517_245/1526523689921yBvud_JPEG/thumb_ipad.jpg',
    totalEpisode: 220,
  },
  {
    title: 'Pasutri Gaje',
    image:
      'https://swebtoon-phinf.pstatic.net/20190426_97/1556275077945LqnpT_JPEG/thumb_ipad.jpg',
    totalEpisode: 109,
  },
  {
    title: 'Young Mom',
    image:
      'https://swebtoon-phinf.pstatic.net/20190826_128/1566745786647tiaSe_JPEG/thumb_ipad.jpg',
    totalEpisode: 190,
  },
  {
    title: 'Tower of God',
    image:
      'https://swebtoon-phinf.pstatic.net/20190318_291/1552868599909GoVLY_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg',
    totalEpisode: 518,
  },
  {
    title: 'The Weight of Our Sky',
    image:
      'https://swebtoon-phinf.pstatic.net/20191009_67/1570573083141kuCms_JPEG/The-Weight-of-Our-Sky-Mobile-Banner.jpg',
    totalEpisode: 19,
  },
];

export class MyWebtoon extends Component {
  Item = ({myWebtoon}) => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 10, marginLeft: 10}}>
        <View style={{borderWidth: 1, borderColor: '#ccc'}}>
          <Image
            source={{uri: myWebtoon.image}}
            style={{width: 80, height: 80}}
            resizeMode="stretch"
          />
        </View>
        <View style={{alignSelf: 'center', marginLeft: 20}}>
          <Text style={{marginBottom: 10, fontWeight: 'bold', fontSize: 15}}>
            {myWebtoon.title}
          </Text>
          <Text style={{color: '#aaa', fontSize: 12}}>
            {myWebtoon.totalEpisode} Episode(s)
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={myWebtoon}
          renderItem={({item}) => <this.Item myWebtoon={item} />}
          keyExtractor={item => item.title}
        />
        <View style={styles.iconContainer}>
          <Icon
            name="plus-circle"
            size={60}
            color={green}
            onPress={() => this.props.navigation.navigate('CreateWebtoon')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    width: 60,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default MyWebtoon;

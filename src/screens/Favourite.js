import React, { Component } from 'react';
import { Text, View, FlatList, Image } from 'react-native';

import SearchBar from '../components/SearchBar';

const favourites = [{
  title: 'The Secret of Angel',
  image: 'https://swebtoon-phinf.pstatic.net/20180517_245/1526523689921yBvud_JPEG/thumb_ipad.jpg',
  countFav: 2120,
}, {
  title: 'Pasutri Gaje',
  image: 'https://swebtoon-phinf.pstatic.net/20190426_97/1556275077945LqnpT_JPEG/thumb_ipad.jpg',
  countFav: 109,
}, {
  title: 'Young Mom',
  image: 'https://swebtoon-phinf.pstatic.net/20190826_128/1566745786647tiaSe_JPEG/thumb_ipad.jpg',
  countFav: 1900,
}, {
  title: 'Tower of God',
  image: 'https://swebtoon-phinf.pstatic.net/20190318_291/1552868599909GoVLY_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg',
  countFav: 5189,
}];

export class Favourite extends Component {

  Item = ({ favourites }) => {
    return (
      <View style={{ flexDirection: 'row', marginVertical: 10, marginLeft: 10 }}>
        <View style={{ borderWidth: 1, borderColor: '#ccc' }}>
          <Image source={{ uri: favourites.image }} style={{ width: 130, height: 130 }} />
        </View>
        <View style={{ alignSelf: 'center', marginLeft: 20 }}>
          <Text style={{ marginBottom:10, fontWeight: 'bold', fontSize: 15 }}>{favourites.title}</Text>
          <Text style={{ color: '#aaa', fontSize: 12 }}>{favourites.countFav} Favourite</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1 }}>
        <SearchBar />
        <FlatList
          data={favourites}
          renderItem={({ item }) => <this.Item favourites={item} />}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

export default Favourite;

import React, { Component } from 'react';
import { ScrollView, StyleSheet, YellowBox } from 'react-native';
import { Content, Container, Text } from 'native-base';

// Ignore Yellow Warnings
YellowBox.ignoreWarnings(['Warning: ']);

// Components
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import Favourite from '../components/Favourite';
import All from '../components/All';

// Dummy Data
import { recomended, favourites, webtoons, user } from '../__dummy__/data';

const banners = [
  {
    id: 1,
    title: 'Soul on Hold',
    image:
      'https://swebtoon-phinf.pstatic.net/20190924_130/15692809888262D7bJ_GIF/Soul-on-Hold-Mobile-Banner.gif',
    isFavourite: true,
  },
  {
    id: 2,
    title: 'The Secret of Angel',
    image:
      'https://swebtoon-phinf.pstatic.net/20180517_245/1526523689921yBvud_JPEG/thumb_ipad.jpg',
      isFavourite: true,
  },
  {
    id: 3,
    title: 'Pasutri Gaje',
    image:
      'https://swebtoon-phinf.pstatic.net/20190426_97/1556275077945LqnpT_JPEG/thumb_ipad.jpg',
      isFavourite: false,
  },
  {
    id: 4,
    title: 'The Weight of Our Sky',
    image:
      'https://swebtoon-phinf.pstatic.net/20191009_67/1570573083141kuCms_JPEG/The-Weight-of-Our-Sky-Mobile-Banner.jpg',
      isFavourite: false,
  },
  {
    id: 5,
    title: 'Lucid',
    image:
      'https://swebtoon-phinf.pstatic.net/20191004_287/15701423965927AeR3_JPEG/Lucid-Mobile-Banner.jpg',
      isFavourite: true,
  },
];

/**
 * FETCH TOP, FAVOURITE AND ALL WEBTOONS
 */

export class ForYou extends Component {
  state = {
    user: user.name,
    recomended: recomended,
    favourites: favourites,
    webtoons: webtoons,
  };

  handleSearch = title => {
    console.log(title);
  };

  render() {
    const {navigation} = this.props;
    return (
      <Container style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
            <SearchBar handleSearch={this.handleSearch} />
            <Text style={styles.recomended}>Recomended For You</Text>
            <Banner recomended={this.state.recomended} />
          </Content>
          <Content>
            <Favourite navigation={navigation} favourites={favourites} />
            <All navigation={navigation} dataSource={banners} />
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  recomended: {
    padding: 10,
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4cd137',
  },
});

export default ForYou;

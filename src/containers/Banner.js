import React, { Component } from 'react';
import { Image, View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-banner-carousel';

import SearchBar from '../components/SearchBar';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 250;

export class Banner extends Component {
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{width: BannerWidth, height: BannerHeight}}
          source={{uri: image}}
        />
      </View>
    );
  }

  render() {
    const { dataSource } = this.props;
    return (
      <View>
        <SearchBar />
        <View style={styles.bannerContainer}>
          <Carousel
            pageIndicatorStyle={styles.unactiveIndicators}
            activePageIndicatorStyle={styles.activeIndicators}
            pageIndicatorOffset={20}
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={BannerWidth}>
            {dataSource.map((banner, idx) => this.renderPage(banner.image, idx))}
          </Carousel>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  unactiveIndicators: {
    // backgroundColor: '#d0d0d0',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  activeIndicators: {
    backgroundColor: '#32ff7e',
  },
  bannerContainer: {
    borderBottomWidth: 5,
    borderBottomColor: '#e3e3e3',
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4',
  }
});

export default Banner;

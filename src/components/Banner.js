import React, {Component} from 'react';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';

const dim = Dimensions.get('window');
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 250;

export class Banner extends Component {
  state = {
    bannerWidth: dim.width,
    bannerHeight: 250,
  };

  renderImage(webtoon, index) {
    console.log(webtoon)
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.navigation.navigate('DetailWebtoon', {
          title: webtoon.title,
          image: webtoon.bannerImage
        })}
        key={index}
      >
        <View>
          <Image
            style={{width: BannerWidth, height: BannerHeight}}
            source={{uri: webtoon.bannerImage}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const {recomended} = this.props;
    return (
      <Carousel
        pageIndicatorStyle={styles.unactiveIndicators}
        activePageIndicatorStyle={styles.activeIndicators}
        pageIndicatorOffset={20}
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}>
        {recomended.map((webtoon, idx) =>
          this.renderImage(webtoon, idx),
        )}
      </Carousel>
    );
  }
}

const styles = StyleSheet.create({
  unactiveIndicators: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  activeIndicators: {
    backgroundColor: 'white',
  },
});

export default Banner;

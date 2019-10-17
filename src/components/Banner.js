import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { BallIndicator } from 'react-native-indicators';

import { green } from '../colorPallete';

const dim = Dimensions.get('window');

export class Banner extends Component {
  state = {
    bannerWidth: dim.width,
    bannerHeight: 250,
  };

  renderLoading() {
    return (
      <View style={{ width: this.state.bannerWidth, height: this.state.bannerHeight, justifyContent: 'center' }}>
        <BallIndicator color={green} />
      </View>
    );
  }

  renderImage(sanstoon, index) {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate('DetailWebtoon', {
            id: sanstoon.id,
            title: sanstoon.title,
            image: sanstoon.image,
            genre: sanstoon.genre,
          })
        }
        key={index}>
        <View>
          <Image
            style={{width: this.state.bannerWidth, height: this.state.bannerHeight}}
            source={{uri: sanstoon.image}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const {sanstoons} = this.props;
    return (
      <Carousel
        pageIndicatorStyle={styles.unactiveIndicators}
        activePageIndicatorStyle={styles.activeIndicators}
        pageIndicatorOffset={20}
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={this.state.bannerWidth}>
        {sanstoons
          ? sanstoons.map((sanstoon, idx) => this.renderImage(sanstoon, idx))
          : this.renderLoading()}
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

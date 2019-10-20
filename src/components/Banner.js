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

export class Banner extends Component {
  state = {
    bannerWidth: dim.width,
    bannerHeight: 250,
  };

  renderImage(santoon, index) {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate('DetailWebtoon', {
            id: santoon.id,
            title: santoon.title,
            image: santoon.image,
            genre: santoon.genre,
          })
        }
        key={index}>
        <View>
          <Image
            style={{
              width: this.state.bannerWidth,
              height: this.state.bannerHeight,
            }}
            source={{uri: santoon.image}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const {santoons} = this.props;
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
        {santoons.map((santoon, idx) => this.renderImage(santoon, idx))}
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

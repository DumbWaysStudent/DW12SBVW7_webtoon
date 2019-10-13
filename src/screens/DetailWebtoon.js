import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Share,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const details = [
  {
    episode: '7',
    image:
      'https://swebtoon-phinf.pstatic.net/20180830_36/1535615172886xSese_JPEG/1535615172834143667.jpg?type=q90',
    published: '8 January 2019',
  },
  {
    episode: '6',
    image:
      'https://swebtoon-phinf.pstatic.net/20180830_36/1535615172886xSese_JPEG/1535615172834143667.jpg?type=q90',
    published: '8 January 2019',
  },
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

export class DetailWebtoon extends Component {
  state = {
    scrollY: new Animated.Value(0),
  };

  renderEpisode() {
    return (
      <View style={styles.scrollViewContent}>
        {details.map((detail, i) => (
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('DetailEpisode', {
                episode: detail.episode,
              })
            }>
            <View key={i} style={styles.card}>
              <Image
                source={{uri: detail.image}}
                style={{height: 80, width: 80}}
              />
              <View style={{marginLeft: 15, justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 15}}>EPISODE {detail.episode}</Text>
                <Text style={{fontSize: 12, color: '#bbb'}}>
                  {detail.published}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          {this.renderEpisode()}
        </ScrollView>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={{uri: this.props.navigation.getParam('image')}}
          />
          <View style={styles.bar}>
            <Icon
              name="md-arrow-back"
              size={25}
              style={{marginLeft: 15, color: '#fff'}}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={styles.title}>
              {this.props.navigation.getParam('title')}
            </Text>
            <Icon
              name="md-share"
              size={25}
              style={{marginRight: 20, color: '#fff'}}
              onPress={() =>
                Share.share({
                  message: 'Webtoon aing yeuh!',
                })
              }
            />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  bar: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  card: {
    height: 80,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});

export default DetailWebtoon;

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
  Dimensions,
} from 'react-native';
import axios from '../helpers/axios';
import convertDate from '../helpers/date';
import Icon from 'react-native-vector-icons/Ionicons';
import {BallIndicator} from 'react-native-indicators';

import {green} from '../colorPallete';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class DetailWebtoon extends Component {
  state = {
    scrollY: new Animated.Value(0),
    episodes: null,
  };

  async componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const {data} = await axios({
      method: 'GET',
      url: `/sanstoons/${id}/episodes`,
    });

    this.setState({episodes: data});
  }

  renderEpisode = () => {
    const {episodes} = this.state;

    let renderContent;
    if (episodes == null) {
      renderContent = (
        <View style={styles.bottomContainer}>
          <BallIndicator color={green} />
        </View>
      );
    } else if (episodes.length) {
      renderContent = (
        <View>
          {episodes.map((episode, i) => (
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate('DetailEpisode', {
                  title: episode.title,
                  santoonId: this.props.navigation.getParam('id'),
                  episodeId: episode.id,
                })
              }>
              <View key={i} style={styles.card}>
                <Image
                  source={{uri: episode.image}}
                  style={{height: 80, width: 80}}
                />
                <View style={{marginLeft: 15, justifyContent: 'space-evenly'}}>
                  <Text style={{fontSize: 16}}>{episode.title}</Text>
                  <Text style={{fontSize: 12, color: '#bbb'}}>
                    {convertDate(new Date(episode.createdAt))}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      );
    } else if (!episodes.length) {
      renderContent = (
        <View style={styles.bottomContainer}>
          <Text style={{fontSize: 13}}>
            The creator not yet published any episode.
          </Text>
        </View>
      );
    }

    return <View style={styles.scrollViewContent}>{renderContent}</View>;
  };

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
  bottomContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height:
      Dimensions.get('window').height - (HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailWebtoon;

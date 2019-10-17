import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  YellowBox,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import {Content, Container, Text} from 'native-base';
import axios from '../helpers/axios';
// import objectClone from '../helpers/clone';

// Ignore Yellow Warnings
YellowBox.ignoreWarnings(['Warning: ']);

// Components
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import Favorite from '../components/Favorite';
import AllSanstoon from '../components/AllSanstoon';

import {dark} from '../colorPallete';

export class ForYou extends Component {
  state = {
    sanstoons: null,
    favorites: null,
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');

    const {data} = await axios({
      method: 'GET',
      url: '/sanstoons',
      headers: {
        Authorization: token,
      },
    });

    const favorites = data.filter(item => item.isFavorite);

    this.setState({
      sanstoons: data,
      favorites,
    });
  }

  handleFavorite = async (status, id) => {
    const token = await AsyncStorage.getItem('token');
    const method = status ? 'DELETE' : 'POST';
    const message = status
      ? 'Removed from My Favorite'
      : 'Added to My Favorite';
    const {data} = await axios({
      method,
      url: `/sanstoons/${id}/favorite`,
      headers: {
        Authorization: token,
      },
    });
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    const favorites = data.filter(item => item.isFavorite);
    this.setState({
      sanstoons: data,
      favorites,
    });
  };

  handleSearch = title => {};

  render() {
    const {navigation} = this.props;
    return (
      <Container style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
            <SearchBar handleSearch={this.handleSearch} />
            <Text style={styles.recomended}>Recomended For You</Text>
            <Banner
              sanstoons={this.state.sanstoons}
              navigation={this.props.navigation}
            />
          </Content>
          <Content>
            <Favorite
              navigation={navigation}
              favorites={this.state.favorites}
            />
            <AllSanstoon
              navigation={navigation}
              handleFavorite={this.handleFavorite}
              sanstoons={this.state.sanstoons}
            />
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
    color: dark,
    backgroundColor: 'white',
  },
});

export default ForYou;

import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  YellowBox,
  AsyncStorage,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Content, Container, Text} from 'native-base';
import {NavigationEvents} from 'react-navigation';

// Redux
import {connect} from 'react-redux';
import {findAllToons} from '../redux/actions/santoonAction';

// Ignore Yellow Warnings
YellowBox.ignoreWarnings(['Warning: ']);

// Components
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import Favorite from '../components/Favorite';
import AllSanstoon from '../components/AllSanstoon';

import {dark, green} from '../colorPallete';

export class ForYou extends Component {
  state = {
    sanstoons: [],
    favorites: [],
  };

  // componentDidMount() {
  //   this.fetchAllToons();
  // }

  fetchAllToons = async () => {
    // const token = await AsyncStorage.getItem('token');
    
    // const {data} = await axios({
    //   method: 'GET',
    //   url: '/api/v1/santoons',
    //   headers: {
    //     Authorization: token ? token : '',
    //   },
    // });
    // console.log(data);
    
    // const favorites = data.filter(item => item.isFavorite);
    
    // this.setState({
      //   sanstoons: data,
      //   favorites,
      // });

      this.props.dispatch(findAllToons());
    };

  handleFavorite = async (status, id) => {
    const token = await AsyncStorage.getItem('token');
    const method = status ? 'DELETE' : 'POST';
    const message = status
      ? 'Removed from My Favorite'
      : 'Added to My Favorite';
    // const {data} = await axios({
    //   method: method,
    //   url: `/api/v1/sanstoons/${id}/favorite`,
    //   headers: {
    //     Authorization: token,
    //   },
    // });
    // ToastAndroid.showWithGravity(
    //   message,
    //   ToastAndroid.SHORT,
    //   ToastAndroid.CENTER,
    // );
    // const favorites = data.filter(item => item.isFavorite);
    // this.setState({
    //   sanstoons: data,
    //   favorites,
    // });
  };

  handleSearch = title => {};

  renderLoading() {
    return (
      <Container style={{flex: 1}}>
        <ActivityIndicator size="large" color={green} />
      </Container>
    );
  }

  render() {
    const {navigation, santoons, isLoading} = this.props;
    return (
      <Container style={{flex: 1, backgroundColor: '#fff'}}>
        <NavigationEvents
          onDidFocus={this.fetchAllToons}
          onDidBlur={() => this.setState({sanstoons: [], favorites: []})}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar handleSearch={this.handleSearch} />
          <Content>
            <Text style={styles.recomended}>Recomended For You</Text>
            <Banner santoons={santoons} navigation={this.props.navigation} />
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

const mapStateToProps = state => {
  return {
    santoons: state.santoonReducer.santoons,
    isLoading: state.santoonReducer.isLoading,
  };
};

export default connect(mapStateToProps)(ForYou);

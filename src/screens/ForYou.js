import React, {Component} from 'react';
import {ScrollView, StyleSheet, YellowBox, ToastAndroid} from 'react-native';
import {Content, Container, Text} from 'native-base';
import {NavigationEvents} from 'react-navigation';

// Components
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import Favorite from '../components/Favorite';
import AllToons from '../components/AllToons';
import Loading from '../hoc/Loading';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import {findAllToons, handleFavorite} from '../redux/actions/toon';

// Ignore Yellow Warnings
YellowBox.ignoreWarnings(['Warning: ']);

import {dark} from '../colorPallete';

export class ForYou extends Component {
  fetchAllToons = () => {
    const token = this.props.token;
    this.props.dispatch(findAllToons(token));
  };

  handleFavorite = (status, id) => {
    const request = status ? 'DELETE' : 'POST';
    const message = status
      ? 'Removed from My Favorite'
      : 'Added to My Favorite';
    const token = this.props.token;

    if (!token) {
      return ToastAndroid.showWithGravity(
        `Please login to add to your favorite lists.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    this.props.dispatch(handleFavorite(id, request, token));
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  handleSearch = title => {
    console.log(title, 'title');
  };

  render() {
    const {navigation, santoons, isLogin} = this.props;
    return (
      <Container style={{flex: 1, backgroundColor: '#fff'}}>
        <NavigationEvents onWillFocus={this.fetchAllToons} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar handleSearch={this.handleSearch} />
          <Content>
            <Text style={styles.recomended}>Recomended For You</Text>
            <Banner santoons={santoons} navigation={this.props.navigation} />
          </Content>
          <Content>
            {isLogin && (
              <Favorite
                navigation={navigation}
                favorites={this.props.favorites}
              />
            )}
            <AllToons
              navigation={navigation}
              handleFavorite={this.handleFavorite}
              santoons={santoons}
            />
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    isLogin: state.auth.isLogin,
    token: state.auth.token,
    santoons: state.toonReducer.santoons,
    favorites: state.toonReducer.favorites,
    isLoading: state.toonReducer.isLoading,
  };
};

export default compose(
  connect(mapStateToProps),
  Loading,
)(ForYou);

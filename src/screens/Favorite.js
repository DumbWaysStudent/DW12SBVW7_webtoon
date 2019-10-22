import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {BarIndicator} from 'react-native-indicators';
import {green} from '../colorPallete';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import {findMyFavorites} from '../redux/actions/toon';

// Components
import Loading from '../hoc/Loading';
import SearchBar from '../components/SearchBar';
import {SmallHorizontalCard} from '../components/Card';

export class Favourite extends PureComponent {
  state = {
    favorites: null,
  };

  fetchData = () => {
    const token = this.props.token;
    this.props.dispatch(findMyFavorites(token));
  };

  renderLoading() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <BarIndicator color={green} />
      </View>
    );
  }

  handleSearch = async title => {
    // const token = await AsyncStorage.getItem('token');
    // const {data} = await axios({
    //   method: 'GET',
    //   url: `/santoons?is_favorite=true&title=${title}`,
    //   headers: {
    //     Authorization: token,
    //   },
    // });
    // this.setState({favorites: data});
  };

  render() {
    const {navigation, favorites, isLogin} = this.props;

    let renderContent;
    if (favorites.length) {
      renderContent = (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <SmallHorizontalCard
              data={item}
              navigation={navigation}
              text="Favorite(s)"
              route="DetailWebtoon"
            />
          )}
          keyExtractor={item => item.title}
        />
      );
    } else {
      renderContent = (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {isLogin
              ? `You don't have any favorited comic.`
              : `You should login first to list your favorite manga.`}
          </Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={this.fetchData} />
        <SearchBar handleSearch={this.handleSearch} />
        {renderContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 14,
    color: '#b0b0b0',
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    token: state.auth.token,
    favorites: state.toonReducer.favorites,
    isLoading: state.toonReducer.isLoading,
  };
};

export default compose(
  connect(mapStateToProps),
  Loading,
)(Favourite);

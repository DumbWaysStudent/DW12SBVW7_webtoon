import React, {PureComponent} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {SkypeIndicator} from 'react-native-indicators';
import {green} from '../colorPallete';

// Redux
import {connect} from 'react-redux';
import {findMyFavorites} from '../redux/actions/toonAction';

// Components
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
        <SkypeIndicator color={green} />
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
    const {navigation, favorites, isLoading, isLogin} = this.props;

    let renderContent;
    if (isLoading) {
      renderContent = (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <SkypeIndicator color={green} />
        </View>
      );
    } else if (favorites.length) {
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
    } else if (!favorites.length) {
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
    token: state.authReducer.token,
    isLogin: state.authReducer.isLogin,
    favorites: state.toonReducer.favorites,
    isLoading: state.toonReducer.isLoading,
  };
};

export default connect(mapStateToProps)(Favourite);

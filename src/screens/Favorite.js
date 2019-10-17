import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, AsyncStorage} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import axios from '../helpers/axios';
import {BallIndicator} from 'react-native-indicators';

import {green} from '../colorPallete';

// Components
import SearchBar from '../components/SearchBar';
import {SmallHorizontalCard} from '../components/Card';

export class Favourite extends Component {
  state = {
    favorites: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const token = await AsyncStorage.getItem('token');

    const {data} = await axios({
      method: 'GET',
      url: `/sanstoons?is_favorite=true`,
      headers: {
        Authorization: token,
      },
    });

    this.setState({favorites: data});
  };

  renderLoading() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <BallIndicator color={green} />
      </View>
    );
  }

  handleSearch = async title => {
    const token = await AsyncStorage.getItem('token');

    const {data} = await axios({
      method: 'GET',
      url: `/sanstoons?is_favorite=true&title=${title}`,
      headers: {
        Authorization: token,
      },
    });

    this.setState({favorites: data});
  };

  render() {
    const {navigation} = this.props;
    const {favorites} = this.state;

    let renderContent;
    if (favorites == null) {
      renderContent = (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <BallIndicator color={green} />
        </View>
      );
    } else if (favorites.length) {
      renderContent = (
        <FlatList
          data={this.state.favorites}
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
            You don't have any favorited comic.
          </Text>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <NavigationEvents
          onDidFocus={this.fetchData}
          onDidBlur={() => this.setState({favorites: null})}
        />
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

export default Favourite;

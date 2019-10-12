import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

// Components
import SearchBar from '../components/SearchBar';
import {SmallHorizontalCard} from '../components/Card';

// Dummy Data
import {favourites} from '../__dummy__/data';

export class Favourite extends Component {
  state = {
    favourites: favourites,
  };

  handleSearch = title => {
    console.log(title);
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <SearchBar handleSearch={this.handleSearch} />
        <FlatList
          data={this.state.favourites}
          renderItem={({item}) => (
            <SmallHorizontalCard
              data={item}
              navigation={navigation}
              text="Favourite"
              route="DetailWebtoon"
            />
          )}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

export default Favourite;

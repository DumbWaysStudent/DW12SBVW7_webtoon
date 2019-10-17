import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {BallIndicator} from 'react-native-indicators';

import {lightGrey, dark, green} from '../colorPallete';
import trunc from '../helpers/trunc';

function VerticalCard({navigation, favorite, checker}) {
  let rightMargin = checker.index == checker.length - 1 ? 10 : 0;
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('DetailWebtoon', {
          title: favorite.title,
          image: favorite.image,
        })
      }>
      <View style={[styles.favCard, {marginRight: rightMargin}]}>
        <Image source={{uri: favorite.image}} style={styles.imageSize} />
        <Text style={styles.favTitleText}>{trunc(favorite.title)}</Text>
        <Text style={styles.favSubText}>{favorite.author}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

class Favourite extends Component {
  state = {
    favorites: null,
  };

  render() {
    const {favorites} = this.props;
    const len = favorites ? favorites.length : null;

    let renderContent;

    if (favorites == null) {
      renderContent = (
        <View style={{height: 190, alignSelf: 'center'}}>
          <BallIndicator color={green} />
        </View>
      );
    } else if (favorites.length) {
      renderContent = (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {favorites
            ? favorites.map((favorite, idx) => (
                <VerticalCard
                  key={favorite.id}
                  favorite={favorite}
                  checker={{index: idx, length: len}}
                  navigation={this.props.navigation}
                />
              ))
            : null}
        </ScrollView>
      );
    } else if (!favorites.length) {
      renderContent = (
        <View
          style={[
            styles.favCard,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={[styles.favSubText, {textAlign: 'center'}]}>
            You don't have any favorited comic.
          </Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Text style={styles.textTitle}>Your Favorites</Text>
        {renderContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
    color: dark,
  },
  imageSize: {
    width: 140,
    height: 130,
  },
  favCard: {
    marginLeft: 10,
    width: 140,
    height: 190,
    borderWidth: 0.5,
    borderColor: lightGrey,
    borderRadius: 5,
    overflow: 'hidden',
  },
  favTitleText: {
    color: dark,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  favSubText: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: '#b0b0b0',
  },
});

export default Favourite;

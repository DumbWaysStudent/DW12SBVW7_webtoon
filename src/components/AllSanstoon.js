import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { green, dark, lightGrey } from '../colorPallete';

function HorizontalCard({sanstoon, navigation, handleFavorite}) {
  const favouritedBtn = {
    backgroundColor: '#fff',
    borderColor: green,
  };
  const favouritedText = {
    color: green,
  };

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('DetailWebtoon', {
          id: sanstoon.id,
          title: sanstoon.title,
          image: sanstoon.image,
          genre: sanstoon.genre,
        })
      }>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageSize} source={{uri: sanstoon.image}} />
        </View>
        <View style={{marginLeft: 25}}>
          <Text style={styles.titleCardText}>{sanstoon.title}</Text>
          <TouchableOpacity
            style={[
              styles.favButton,
              sanstoon.isFavorite ? favouritedBtn : null,
            ]}
            onPress={() => handleFavorite(sanstoon.isFavorite, sanstoon.id)}>
            <Text
              style={[
                styles.textFavourite,
                sanstoon.isFavorite ? favouritedText : null,
              ]}>
              {sanstoon.isFavorite ? '✓ Favorite' : '+ Favorite'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

class AllSanstoon extends Component {
  render() {
    const {sanstoons} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>All Mangas</Text>
        {sanstoons &&
          sanstoons.map(sanstoon => {
            return (
              <HorizontalCard
                key={sanstoon.id}
                handleFavorite={this.props.handleFavorite}
                navigation={this.props.navigation}
                sanstoon={sanstoon}
              />
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  textTitle: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageSize: {
    width: 100,
    height: 100,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: lightGrey,
    overflow: 'hidden',
  },
  favButton: {
    backgroundColor: green,
    marginVertical: 10,
    alignItems: 'center',
    width: 100,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: green,
  },
  titleCardText: {
    color: dark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  textFavourite: {
    padding: 6,
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default AllSanstoon;

import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {green, dark, lightGrey} from '../colorPallete';
import {validateImageUrl} from '../helpers/validation';

function HorizontalCard({santoon, navigation, handleFavorite}) {
  const favouritedBtn = {
    backgroundColor: 'white',
    borderColor: green,
  };
  const favouritedText = {
    color: green,
  };

  const image = validateImageUrl(santoon.image);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('DetailWebtoon', {
          id: santoon.id,
          title: santoon.title,
          image: image,
          genre: santoon.genre,
        })
      }>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageSize} source={{uri: image}} />
        </View>
        <View style={{marginLeft: 25}}>
          <Text style={styles.titleCardText}>{santoon.title}</Text>
          <TouchableOpacity
            style={[
              styles.favButton,
              santoon.isFavorite ? favouritedBtn : null,
            ]}
            onPress={() => handleFavorite(santoon.isFavorite, santoon.id)}>
            <Text
              style={[
                styles.textFavourite,
                santoon.isFavorite ? favouritedText : null,
              ]}>
              {santoon.isFavorite ? '✓ Favorite' : '+ Favorite'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

class AllToons extends Component {
  render() {
    const {santoons} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>All Mangas</Text>
        {santoons.map(santoon => {
          return (
            <HorizontalCard
              key={santoon.id}
              handleFavorite={this.props.handleFavorite}
              navigation={this.props.navigation}
              santoon={santoon}
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
    backgroundColor: 'white',
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

export default AllToons;

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
import objectClone from '../helpers/clone';


function HorizontalCard({webtoon, navigation, handleFavouriteBtn}) {
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
          title: webtoon.title,
          image: webtoon.url,
        })
      }>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageSize}
            source={{uri: webtoon.url}}
          />
        </View>
        <View style={{marginLeft: 25}}>
          <Text style={styles.titleCardText}>{webtoon.title}</Text>
          <TouchableOpacity
            style={[
              styles.favButton,
              webtoon.isFavourite ? favouritedBtn : null,
            ]}
            onPress={() => handleFavouriteBtn(webtoon.id)}
          >
            <Text
              style={[
                styles.textFavourite,
                webtoon.isFavourite ? favouritedText : null,
              ]}>
              {webtoon.isFavourite ? '✓ Favorite' : '+ Favorite'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

class All extends Component {

  state = {
    webtoons: this.props.dataSource,
  }

  handleFavouriteBtn = id => {
    const newArray = objectClone(this.state.webtoons);
    const webtoons = newArray.map(webtoon => {
      const newObj = Object.assign({}, webtoon);
      if (webtoon.id == id) {
        newObj.isFavourite = !newObj.isFavourite;
      }
      return newObj;
    });
    this.setState({ webtoons });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>All Sanstoon</Text>
        {this.state.webtoons.map(webtoon => (
          <HorizontalCard
            key={webtoon.id}
            handleFavouriteBtn={this.handleFavouriteBtn}
            navigation={this.props.navigation}
            webtoon={{
              url: webtoon.image,
              title: webtoon.title,
              id: webtoon.id,
              isFavourite: webtoon.isFavourite,
            }}
          />
        ))}
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
    padding: 7,
    color: '#fff',
    fontSize: 13,
  },
});

export default All;

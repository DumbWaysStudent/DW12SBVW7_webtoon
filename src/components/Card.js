import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import {dark, lightGrey} from '../colorPallete';

export const SmallHorizontalCard = ({data, navigation, text, route}) => {
  const {image, title} = data;
  const navigate = () => navigation.navigate(route, {title, image});

  let subTitle;

  if (data.favouriteCount) {
    subTitle = data.favouriteCount;
  } else if (data.totalEpisode) {
    subTitle = data.totalEpisode;
  } else if (data.createdAt) {
    subTitle = data.createdAt;
  }

  return (
    <TouchableWithoutFeedback onPress={navigate}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={{width: 80, height: 80}} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.mainTitleText}>{title}</Text>
          <Text style={styles.subTitleText}>
            {subTitle} {text ? text : null}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 80,
    borderWidth: 0.5,
    borderColor: lightGrey,
    overflow: 'hidden',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  mainTitleText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: dark,
  },
  subTitleText: {
    color: '#aaa',
    fontSize: 12,
  },
});

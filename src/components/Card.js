import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {dark, lightGrey} from '../colorPallete';
import {validateImageUrl} from '../helpers/validation';

export const SmallHorizontalCard = ({
  data,
  navigation,
  text,
  route,
  button,
  eventTrigger,
}) => {
  const {title, name, id, genre} = data;
  const image = validateImageUrl(data.image);

  const navigate = () => navigation.navigate(route, {title, image, name, id, genre});
  let subTitle;

  const renderDeleteButton = (
    <TouchableOpacity
      style={styles.deleteBtn}
      onPress={() => eventTrigger(data.id)}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  if (text == 'Favorite(s)') {
    subTitle = data.favoriteCount;
  } else if (text == 'Episode(s)') {
    subTitle = data.episodes;
  }

  // if (data.favoriteCount) {
  //   subTitle = data.favoriteCount;
  // } else if (data.episodes) {
  //   subTitle = data.episodes;
  // } else if (data.createdAt) {
  //   subTitle = data.createdAt;
  // }

  return (
    <TouchableWithoutFeedback onPress={route ? navigate : null}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={{width: 80, height: 80}} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.mainTitleText}>{title ? title : data.name}</Text>
          {button ? (
            renderDeleteButton
          ) : (
            <Text style={styles.subTitleText}>
              {subTitle} {text ? text : null}
            </Text>
          )}
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
  deleteBtn: {
    backgroundColor: 'white',
    width: 100,
    padding: 5,
    borderWidth: 2,
    borderColor: '#ff5e57',
    borderRadius: 5,
  },
  deleteText: {
    textAlign: 'center',
    color: '#ff5e57',
  },
});

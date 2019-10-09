import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const All = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>All Webtoons</Text>
      {props.dataSource.map((banner, idx) => (
        <TouchableWithoutFeedback
          key={idx}
          onPress={() =>
            props.navigation.navigate('Details', {
              title: banner.title,
              image: banner.image,
            })
          }>
          <View key={idx} style={styles.itemContainer}>
            <Image style={styles.imageSize} source={{uri: banner.image}} />
            <View style={{marginLeft: 25}}>
              <Text>{banner.title}</Text>
              <TouchableOpacity style={styles.favButton}>
                <Text style={styles.textFavourite}>+ Favourite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  textTitle: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageSize: {
    width: 130,
    height: 130,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  favButton: {
    backgroundColor: '#4cd137',
    marginVertical: 10,
    alignItems: 'center',
    width: 90,
    borderRadius: 5,
  },
  textFavourite: {
    padding: 5,
    color: '#fff',
  },
});

export default All;

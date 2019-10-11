import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import { lightGrey, dark } from '../colorPallete';
import trunc from '../helpers/trunc';

function VerticalCard({ navigation, favourite, checker }) {
  let rightMargin = checker.index == checker.length - 1 ? 10 : 0;
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('DetailWebtoon', {
        title:favourite.title,
        image: favourite.image,
      })}
    >
      <View style={[styles.favCard, { marginRight: rightMargin }]}>
        <Image
          source={{uri: favourite.image}}
          style={{width: 140, height: 130}}
          resizeMode='stretch'
        />
        <Text style={styles.favTitleText}>{trunc(favourite.title)}</Text>
        <Text style={styles.favSubText}>ORIGINAL</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

class Favourite extends Component {
  render() {
    const len = this.props.favourites.length;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.textTitle}>Your Favourite</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.props.favourites.map((favourite, idx) => (
            <VerticalCard
              key={favourite.id}
              favourite={favourite}
              checker={{index: idx, length:len}}
              navigation={this.props.navigation}
            />
          ))}
        </ScrollView>
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
    width: 130,
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

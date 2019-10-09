import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import trunc from '../helpers/trunc';

const Favorite = props => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{paddingHorizontal: 12}}>
        <Text style={styles.textTitle}>Your Favourite</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {props.dataSource.map((banner, idx) => (
          <TouchableWithoutFeedback
            key={idx}
            onPress={() =>
              props.navigation.navigate('DetailWebtoon', {
                title: banner.title,
                image: banner.image,
              })
            }>
            <View style={{ flex: 1, marginHorizontal: 5, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
              <View>
                <Image width={130} height={130} style={styles.imageSize} source={{uri: banner.image}} resizeMode='stretch' />
              </View>
              <View style={{ padding: 5 }}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 14, flex: 1}}>
                  {trunc(banner.title)}
                </Text>
                <Text style={{ color: '#bbb', fontSize: 11 }}>ORIGINAL</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageSize: {
    width: 130,
    height: 130,
  },
});

export default Favorite;

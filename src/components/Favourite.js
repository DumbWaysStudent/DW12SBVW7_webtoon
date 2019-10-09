import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';

const Favorite = props => {
  return (
    <View style={{ flex: 1, marginBottom: 10, backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 12 }}>
        <Text style={styles.textTitle}>Your Favourite</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {props.dataSource.map((banner, idx) => (
          <View style={{marginHorizontal: 5, marginTop: 10 }} key={idx}>
            <View style={{borderWidth: 1, borderColor: '#ccc'}}>
              <Image style={styles.imageSize} source={{uri: banner.image}} />
            </View>
            <Text style={{padding: 5, fontWeight: 'bold', textAlign: 'center'}}>
              {banner.title}
            </Text>
          </View>
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

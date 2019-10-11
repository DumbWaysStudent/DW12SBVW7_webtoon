import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SmallHorizontalCard} from '../components/Card';

import {green, lightGrey} from '../colorPallete';

const dummyData = [
  {
    title: 'Ep. 5',
    image:
      'https://swebtoon-phinf.pstatic.net/20180830_36/1535615172886xSese_JPEG/1535615172834143667.jpg?type=q90',
    createdAt: '8 January 2019',
  },
  {
    title: 'Ep. 4',
    image:
      'https://swebtoon-phinf.pstatic.net/20180827_132/1535380329264w7rd9_JPEG/1535380329232143659.jpg?type=q90',
    createdAt: '28 December 2018',
  },
  {
    title: 'Ep. 3',
    image:
      'https://swebtoon-phinf.pstatic.net/20180820_103/1534768339463nG720_JPEG/1534768339426143643.jpg?type=q90',
    createdAt: '21 December 2018',
  },
  {
    title: 'Ep. 2',
    image:
      'https://swebtoon-phinf.pstatic.net/20180815_26/1534307033273c3ku7_PNG/thumb_1534307013586143634.png?type=q90',
    createdAt: '15 December 2018',
  },
  {
    title: 'Ep. 1',
    image:
      'https://swebtoon-phinf.pstatic.net/20180816_264/15343831943986uGfh_JPEG/1534383194362143623.jpg?type=q90',
    createdAt: '8 December 2018',
  },
  {
    title: 'Ep. 0',
    image:
      'https://swebtoon-phinf.pstatic.net/20180816_60/1534383160207RqTJG_JPEG/1534383160169143610.jpg?type=q90',
    createdAt: '1 December 2018',
  },
];

export class CreateWebtoon extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Icon
          name="check"
          size={25}
          color="#009b00"
          style={{marginRight: 20}}
          onPress={() => console.log('add webtoon')}
        />
      ),
    };
  };

  state = {
    data: dummyData,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textTitle}>Title</Text>
        <TextInput style={styles.titleInput} />
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>Episode</Text>
          <FlatList
            contentContainerStyle={{marginTop: 10}}
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            renderItem={({item}) => (
              <SmallHorizontalCard
                data={item}
                navigation={navigation}
                route="EditWebtoon"
              />
            )}
            keyExtractor={item => item.title}
          />
        </View>
        <TouchableHighlight
          style={styles.addBtn}
          onPress={() => this.props.navigation.navigate('CreateEpisode')}>
          <Text style={styles.btnText}>+ Add Episode</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: 17,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  titleInput: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: lightGrey,
  },
  addBtn: {
    backgroundColor: green,
    padding: 10,
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
  },
});

export default CreateWebtoon;

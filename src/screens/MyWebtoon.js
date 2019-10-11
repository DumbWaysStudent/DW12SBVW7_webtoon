import React, {Component} from 'react';
import {Text, View, FlatList, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { green } from '../colorPallete';

// Components
import {SmallHorizontalCard} from '../components/Card';

// Dummy Data
import { myWebtoon } from '../__dummy__/data';

export class MyWebtoon extends Component {

  state = {
    myWebtoon: myWebtoon,
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{marginTop: 20}}
          data={this.state.myWebtoon}
          renderItem={({item}) => (
            <SmallHorizontalCard
              data={item}
              navigation={navigation}
              text="Episode(s)"
              route="EditWebtoon"
            />
          )}
          keyExtractor={item => item.title}
        />
        <View style={styles.iconContainer}>
          <Icon
            name="plus-circle"
            size={60}
            color={green}
            onPress={() => this.props.navigation.navigate('CreateWebtoon')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    width: 60,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default MyWebtoon;

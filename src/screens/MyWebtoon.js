import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../helpers/axios';

import {green} from '../colorPallete';

// Components
import {SmallHorizontalCard} from '../components/Card';

export class MyWebtoon extends Component {
  state = {
    myWebtoon: [],
  };

  componentDidMount() {
    this.fetchMyToons();
  }

  fetchMyToons = async () => {
    const token = await AsyncStorage.getItem('token');
    const dataUser = await AsyncStorage.getItem('dataUser');
    const user = JSON.parse(dataUser);

    const {data} = await axios({
      method: 'GET',
      url: `/api/v1/user/${user.id}/sanstoons`,
      headers: {
        Authorization: token,
      },
    });

    this.setState({myWebtoon: data});
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onDidFocus={this.fetchMyToons} />
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

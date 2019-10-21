import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {green} from '../colorPallete';

// Component
import {SmallHorizontalCard} from '../components/Card';

// Redux
import {connect} from 'react-redux';
import {findMyCreation} from '../redux/actions/userCreationAction';

export class MyWebtoon extends Component {
  state = {
    myWebtoon: [],
  };

  fetchMyToons = () => {
    const {user, token} = this.props;
    this.props.dispatch(findMyCreation(user.id, token));
  };

  render() {
    const {navigation, myCreations} = this.props;
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onDidFocus={this.fetchMyToons} />
        <FlatList
          contentContainerStyle={{marginTop: 20}}
          data={myCreations}
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

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    myCreations: state.userCreationReducer.myCreations,
  };
};

export default connect(mapStateToProps)(MyWebtoon);

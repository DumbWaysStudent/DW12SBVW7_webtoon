import React from 'react';
import {Icon} from 'native-base';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

// Screens
import Login from './screens/Login';
import ForYou from './screens/ForYou';
import Favourite from './screens/Favourite';
import Profile from './screens/Profile';

const PublicNavigation = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const PrivateNavigation = createBottomTabNavigator(
  {
    ForYou: {
      screen: ForYou,
      navigationOptions: {
        header: null,
        tabBarLabel: 'For You',
        tabBarIcon: ({tintColor}) => (
          <Icon name="grid" color={tintColor} size={25} />
        ),
      },
    },
    Favourite: {
      screen: Favourite,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Favourite',
        tabBarIcon: ({tintColor}) => (
          <Icon name="heart" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="person" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#00b900',
      inactiveTintColor: '#ccc',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
      },
    },
  },
);

const RootNav = createSwitchNavigator({
  PublicNavigation: PublicNavigation,
  PrivateNavigation: PrivateNavigation,
});

export default createAppContainer(RootNav);

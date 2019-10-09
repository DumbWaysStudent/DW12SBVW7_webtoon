import React from 'react';
import {Icon} from 'native-base';
// import Icon from 'react-native'
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
import Details from './screens/Details';


const PublicNavigation = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const BottomNavigation = createBottomTabNavigator(
  {
    ForYou: {
      screen: ForYou,
      navigationOptions: {
        tabBarLabel: 'For You',
        tabBarIcon: ({tintColor}) => (
          <Icon name="grid" color={tintColor} size={25} />
        ),
      },
    },
    Favourite: {
      screen: Favourite,
      navigationOptions: {
        tabBarLabel: 'Favourite',
        tabBarIcon: ({tintColor}) => (
          <Icon name="heart" color={tintColor} size={25} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
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

const PrivateNavigation = createStackNavigator({
  BottomNavigation: {
    screen: BottomNavigation,
    navigationOptions: {
      header: null,
    }
  },
  Details: {
    screen: Details,
  }
});

const RootNav = createSwitchNavigator({
  // PublicNavigation: PublicNavigation,
  PrivateNavigation: PrivateNavigation,
});

export default createAppContainer(RootNav);

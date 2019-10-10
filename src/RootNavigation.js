import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import DetailWebtoon from './screens/DetailWebtoon';
import DetailEpisode from './screens/DetailEpisode';

// Profile
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';

const PublicNavigation = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const ProfileNavigation = createStackNavigator({
  Profile: Profile,
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      header: null,
    }
  }
});

const BottomNavigation = createBottomTabNavigator(
  {
    ForYou: {
      screen: ForYou,
      navigationOptions: {
        tabBarLabel: 'For You',
        tabBarIcon: ({tintColor}) => (
          <Icon name="th-large" color={tintColor} size={25} />
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
      screen: ProfileNavigation,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" color={tintColor} size={25} />
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
        elevation: 6,
        paddingTop: 10,
      },
    },
  },
);

const PrivateNavigation = createStackNavigator({
  BottomNavigation: {
    screen: BottomNavigation,
    navigationOptions: {
      header: null,
    },
  },
  DetailWebtoon: {
    screen: DetailWebtoon,
  },
  DetailEpisode: {
    screen: DetailEpisode,
  },
});

const RootNav = createSwitchNavigator({
  // PublicNavigation: PublicNavigation,
  PrivateNavigation: PrivateNavigation,
});

export default createAppContainer(RootNav);

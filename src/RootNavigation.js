import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { green, lightGrey } from './colorPallete';

// Public Route
import Login from './screens/Login';

// Private Route
import ForYou from './screens/ForYou';
import Favourite from './screens/Favourite';
import DetailWebtoon from './screens/DetailWebtoon';
import DetailEpisode from './screens/DetailEpisode';

// Profile
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';

// Webtoon CRUD
import MyWebtoon from './screens/MyWebtoon';
import CreateWebtoon from './screens/CreateWebtoon';
import CreateEpisode from './screens/CreateEpisode';
import EditWebtoon from './screens/EditWebtoon';

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
      activeTintColor: green,
      inactiveTintColor: lightGrey,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderTopColor: 'black',
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
  MyWebtoon: {
    screen: MyWebtoon,
    navigationOptions: {
      title: 'My Webtoon',
    },
  },
  CreateWebtoon: {
    screen: CreateWebtoon,
    navigationOptions: {
      title: 'Create Webtoon'
    }    
  },
  CreateEpisode: {
    screen: CreateEpisode,
    navigationOptions: {
      title: 'Create Episode',
    },
  },
  EditWebtoon: {
    screen: EditWebtoon,
    navigationOptions: {
      title: 'Edit Webtoon',
    }
  }
});

const RootNav = createSwitchNavigator({
  // PublicNavigation: PublicNavigation,
  PrivateNavigation: PrivateNavigation,
});

export default createAppContainer(RootNav);

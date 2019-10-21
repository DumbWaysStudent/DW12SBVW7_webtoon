import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { green, lightGrey } from './colorPallete';

// Splash Screen
import SplashScreen from './screens/SplashScreen';

// Auth Route
import Welcome from './screens/auth/Welcome';
import Login from './screens/auth/Login';

// Private Route
import ForYou from './screens/ForYou';
import Favorite from './screens/Favorite';
import DetailWebtoon from './screens/DetailWebtoon';
import DetailEpisode from './screens/DetailEpisode';

// Profile Stack
import Profile from './screens/profile/Profile';
import EditProfile from './screens/profile/EditProfile';

// Webtoon CRUD
import MyCreation from './screens/MyCreation';
import CreateWebtoon from './screens/CreateWebtoon';
import CreateEpisode from './screens/CreateEpisode';
import EditWebtoon from './screens/EditWebtoon';
import EditEpisode from './screens/EditEpisode';

const AuthStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    }
  },
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
    Favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarLabel: 'Favorites',
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
    navigationOptions: {
      header: null,
    }
  },
  DetailEpisode: {
    screen: DetailEpisode,
  },
  MyCreation: {
    screen: MyCreation,
    navigationOptions: {
      title: 'My Creation',
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
  },
  EditEpisode: {
    screen: EditEpisode,
    navigationOptions: {
      title: 'Edit Episode',
    }
  }
});

const RootNav = createSwitchNavigator({
  SplashScreen: SplashScreen,
  AuthStack: AuthStack,
  PrivateNavigation: PrivateNavigation,
});

export default createAppContainer(RootNav);

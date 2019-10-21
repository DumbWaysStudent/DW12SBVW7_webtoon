import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {dark, green} from '../../colorPallete';
import {URI} from 'react-native-dotenv';

// Component
import Picture from '../../components/Picture';

// Redux
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/authActions';

export class Profile extends Component {
  static navigationOptions = ({navigation}) => {
    const name = navigation.getParam('name');
    const image = navigation.getParam('image');
    return {
      title: 'Profile',
      headerTintColor: dark,
      headerRight: (
        <Icon
          name="pencil"
          size={25}
          color={green}
          style={{marginRight: 20}}
          onPress={() =>
            navigation.navigate('EditProfile', {
              name,
              image,
            })
          }
        />
      ),
    };
  };

  handleLogout = () => {
    this.props.dispatch(logout());
    if (this.props.isLogin) {
      this.props.navigation.navigate('Welcome');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  validationLogin() {
    if (this.props.isLogin) {
      this.props.navigation.navigate('MyCreation');
    } else {
      return ToastAndroid.showWithGravity(
        `You should login to create your own manga.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }

  render() {
    const {user, isLogin} = this.props;
    return (
      <View style={{flex: 1}}>
        <View style={styles.profile}>
          <Picture
            image={user.imageUrl ? URI + user.imageUrl : user.imageUrl}
          />
          <Text style={styles.yourName}>
            {isLogin ? user.name : 'No Account'}
          </Text>
        </View>

        <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
          <TouchableWithoutFeedback onPress={() => this.validationLogin()}>
            <View style={[styles.content]}>
              <Icon name="book" color={dark} size={25} />
              <Text style={styles.textContent}>My Webtoon Creation</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.handleLogout()}>
            <View style={[styles.content]}>
              <Icon name="user" color={dark} size={25} />
              <Text style={[styles.textContent]}>
                {isLogin ? 'Logout' : 'Login'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourName: {
    color: dark,
    fontSize: 20,
    marginTop: 10,
  },
  profile: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImage: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  content: {
    padding: 10,
    height: 50,
    flexDirection: 'row',
    width: '80%',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  textContent: {
    fontSize: 18,
    marginLeft: 20,
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isLogin,
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps)(Profile);

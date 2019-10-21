import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationEvents} from 'react-navigation';
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

  componentDidMount() {
    // const dataUser = await AsyncStorage.getItem('dataUser');
    // const user = JSON.parse(dataUser);
    // this.props.navigation.setParams({
    //   name: user.name,
    //   image: API + '/' + user.imageUrl,
    // });
    // this.setState({
    //   name: user.name,
    //   image: user.image,
    // });
  }

  fetchUser = () => {
    // const dataUser = await AsyncStorage.getItem('dataUser');
    // const user = JSON.parse(dataUser);
    // const {data} = await axios({
    //   method: 'GET',
    //   url: `/api/v1/user/${user.id}/profile`,
    // });
    // const setImage = data.imageUrl ? API + '/' + data.imageUrl : '';
    // this.setState({
    //   name: data.name,
    //   image: setImage,
    // });
    // await AsyncStorage.setItem('dataUser', JSON.stringify(data.dataUser));
  };

  handleLogout = () => {
    this.props.dispatch(logout());
    if (this.props.isLogin) {
      this.props.navigation.navigate('Welcome');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    const {user, isLogin} = this.props;
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onDidFocus={this.fetchUser} />
        <View style={styles.profile}>
          <Picture image={user.imageUrl ? URI + user.imageUrl : ''} />
          <Text style={styles.yourName}>{user.name}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('MyCreation')}>
          <View
            style={[
              styles.content,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={styles.textContent}>My Webtoon Creation</Text>
            <Icon name="chevron-right" color="#ccc" size={25} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.handleLogout()}>
          <View
            style={[
              styles.content,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.textContent]}>
              {isLogin ? 'Logout' : 'Login'}
            </Text>
            <Icon name="chevron-right" color="#ccc" size={25} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourName: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  },
  profile: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: dark,
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
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginVertical: 5,
  },
  textContent: {
    fontSize: 18,
  },
});

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isLogin,
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps)(Profile);

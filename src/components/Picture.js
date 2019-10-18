import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Picture extends Component {
  render() {
    const {image} = this.props;
    let renderImage;
    if (image) {
      renderImage = <Image source={{uri: image}} style={styles.profilePic} />;
    } else {
      renderImage = <Icon name="user" color="#ccc" size={140} />;
    }

    return (
      <View style={styles.profile}>
        <View style={styles.profileImage}>{renderImage}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  profile: {
    width: 150,
    height: 150,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'gray',
  },
});

export default Picture;

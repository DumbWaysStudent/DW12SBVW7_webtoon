import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import { Content, Container } from 'native-base';

import Banner from '../containers/Banner';
import Favourite from '../components/Favourite';
import All from '../components/All';

const banners = [{
  title: 'The Secret of Angel',
  image: 'https://swebtoon-phinf.pstatic.net/20180517_245/1526523689921yBvud_JPEG/thumb_ipad.jpg'
}, {
  title: 'Pasutri Gaje',
  image: 'https://swebtoon-phinf.pstatic.net/20190426_97/1556275077945LqnpT_JPEG/thumb_ipad.jpg'
}, {
  title: 'The Weight of Our Sky',
  image: 'https://swebtoon-phinf.pstatic.net/20191009_67/1570573083141kuCms_JPEG/The-Weight-of-Our-Sky-Mobile-Banner.jpg'
}, {
  title: 'Lucid',
  image: 'https://swebtoon-phinf.pstatic.net/20191004_287/15701423965927AeR3_JPEG/Lucid-Mobile-Banner.jpg'
}];

export class ForYou extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <Content>
            <Banner dataSource={banners} />
          </Content>
          <Content>
            <Favourite
              dataSource={banners}
              navigation={navigation}
            />
            <All
              dataSource={banners}
              navigation={navigation}
            />
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

export default ForYou;

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
  title: 'Young Mom',
  image: 'https://swebtoon-phinf.pstatic.net/20190826_128/1566745786647tiaSe_JPEG/thumb_ipad.jpg'
}, {
  title: 'Tower of God',
  image: 'https://swebtoon-phinf.pstatic.net/20190318_291/1552868599909GoVLY_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg'
}];

export class ForYou extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ flex: 1, backgroundColor: '#4cd137' }}>
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

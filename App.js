import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {Root} from 'native-base';

import RootNavigation from './src/RootNavigation';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <RootNavigation />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

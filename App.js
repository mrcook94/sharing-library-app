/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import MainNavigation from 'routers/MainNavigation';
import NavigationService from 'routers/NavigationService';
import { Provider } from 'react-redux';
import configureStore from './src/redux/stores/configureStore';
import RootView from 'screens/RootView';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootView>
          <MainNavigation
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </RootView>
      </Provider>
    );
  }
}
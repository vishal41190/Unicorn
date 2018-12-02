/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, StyleSheet,StatusBar, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };


  render() {

    const middleware = [ thunk ];

    const store = createStore(
      reducer,
      applyMiddleware(...middleware)
    )

    _handleFinishLoading = () => {
      this.setState({ isLoadingComplete: true });
    };
    
    return (
      <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
      </Provider>
    );

    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

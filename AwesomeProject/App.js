/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text
} from 'react-native'
import AppView from './components/webView'

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppView />
    );
  }

}

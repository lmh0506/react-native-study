/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text
} from 'react-native'
import MyDatePicker from './components/datePicker'

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MyDatePicker />
    );
  }

}

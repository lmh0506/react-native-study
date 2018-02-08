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
// import { StackNavigator } from 'react-navigation'
// import SectionList from './components/sectionList';
// import MovieList from './components/movieLsit'

// export default App = StackNavigator({
//   Main: {screen: MovieList},
//   Profile: {screen: SectionList}
// })

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

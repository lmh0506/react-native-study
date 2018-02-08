/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default class Flex extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.Column, styles.Center, styles.itemStretch]}>
        <View style={{height: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 50, backgroundColor: 'steelblue'}} />
      </View>  
    );
  }

}

const styles = StyleSheet.create({
  Column: {
    flex: 1,
    flexDirection: 'column'
  },
  Row: {
    flex: 1,
    flexDirection: 'row'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  spaceAround: {
    justifyContent: 'space-around'
  },
  flexEnd: {
    justifyContent: 'flex-end'
  },
  flexStart: {
    justifyContent: 'flex-start'
  },
  Center: {
    justifyContent: 'center'
  },
  itemStart: {
    alignItems: 'flex-start'
  },
  itemCenter: {
    alignItems: 'center'
  },
  itemEnd: {
    alignItems: 'flex-end'
  },
  itemStretch: {
    alignItems: 'stretch'
  }
});

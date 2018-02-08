import React, { Component } from 'react';
import { StyleSheet, Text, View, AccessibilityInfo } from 'react-native';

export default class MySectionList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      screenReaderEnabled: false
    }
  }

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      'change',
      this._handleScreenReaderToggled
    )

    AccessibilityInfo.fetch().done(isEnable => {
      this.setState({
        screenReaderEnabled: isEnable
      })
    })
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      'change',
      this._handleScreenReaderToggled
    )
  }

  _handleScreenReaderToggled = isEnable => {
    this.setState({
      screenReaderEnabled: isEnable
    })
  }

  render() {
    return (
      <View>
        <Text>
          the screen reader is {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})

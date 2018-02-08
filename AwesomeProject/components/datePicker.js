import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View, DatePickerIOS, DatePickerAndroid, Text, TextInput, Platform, TouchableOpacity } from 'react-native';

class WithLabel extends Component<{}> {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.children}
          </Text>
        </View>
      </View>
    )
  }
}
class Heading extends Component<{}> {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    )
  }
}

class Android extends Component<{}> {
  openDataPick = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // 要设置默认值为今天的话，使用`new Date()`即可。
        // 下面显示的会是2020年5月25日。月份是从0开始算的。
        date: new Date(2020, 4, 25)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.openDataPick}>
          <Text>openDataPick</Text>
        </TouchableOpacity>
    )
  }
}

class IOS extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
    }
  }

  onDateChange = date => {
    this.setState({date})
  }

  onTimezoneChange = e => {
    let offset = parseInt(e.nativeEvent.text, 10)
    if(isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset})
  }

  render() {
    return (
      <View style={{marginTop: 20}}>
        <WithLabel label="Value:">
          <Text>
            {
              this.state.date.toLocaleDateString() + ' ' +
              this.state.date.toLocaleTimeString()
            }
          </Text>
        </WithLabel>
        <WithLabel label="Timezone:">
          <TextInput
            onChange={this.onTimezoneChange}
            style={styles.textinput}
            value={this.state.timeZoneOffsetInHours.toString()}
          />
          <Text> hours from UTC</Text>
        </WithLabel>
        <Heading label="Date + time picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <Heading label="Date picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <Heading label="Time picker, 10-minute interval" />
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
          minuteInterval={10}
        />
      </View>
    )
  }
}


// IOS.ptopTypes = {
//   date: new Date(),
//   timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
// }

export default class MyDatePicker extends Component<{}> {

  constructor(props) {
    super(props)
  }

  render() {
    const MyComponent = Platform.select({
      ios: () => IOS,
      android: () => Android
    })()
    return (
      <MyComponent />
    )
  }
}

const styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});
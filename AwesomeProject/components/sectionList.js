import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, Button } from 'react-native';

export default class MySectionList extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      data: [
        {title: 'D', data: ['Devin']},
        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        {title: 'D', data: ['Devin']},
        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        {title: 'D', data: ['Devin']},
        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        {title: 'D', data: ['Devin']},
        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        {title: 'D', data: ['Devin']},
        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        {title: 'D', data: ['Devin']},
        {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
      ]
    }
  }

  static navigationOptions = {
    title: 'SectionList'
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.contaner}>
        <SectionList           
          sections={this.state.data}
          renderItem={({item}) => <Text stylerr={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})

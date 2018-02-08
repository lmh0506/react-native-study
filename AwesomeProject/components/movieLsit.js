/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';

export default class MovieList extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      refresh: false
    }

    this.fetchData = this.fetchData.bind(this)
    this._refresh = this._refresh.bind(this)
  }

  static navigationOptions = {
    title: 'MovieList'
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.setState({
      refresh: true
    })
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: this.state.data.concat(data.movies),
          loaded: true,
          refresh: false
        })
      })
  }

  _refresh() {
    this.setState({
      refresh: true
    })
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.movies,
          refresh: false
        })
      })
  }

  render() {
    const { navigate } = this.props.navigation
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <Button 
          title='Go to sectionList'
          onPress={() => navigate('Profile', {name: 'jane'})}
        />
        <FlatList
          data={this.state.data}
          renderItem={this.renderMovie}
          style={styles.list}
          refreshing={this.state.refresh}
          onRefresh={this._refresh}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading movies
        </Text>
      </View>
    )
  }

  renderMovie({item}) {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: item.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});

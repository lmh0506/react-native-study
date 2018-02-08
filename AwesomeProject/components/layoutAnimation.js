import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class MyLayoutAnimation extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      width: 100,
      height: 100
    }
  }

  _onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(700, 
      LayoutAnimation.Types.spring, 
      LayoutAnimation.Properties.scaleXY));
    this.setState({width: this.state.width + 15, height: this.state.height + 15})
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source = {{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                style = {{width: this.state.width, height: this.state.height}}/>
        <View style={[styles.box, {width: this.state.width, height: this.state.height}]}></View>
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Press me!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red'
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

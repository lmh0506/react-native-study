
import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  Easing
} from 'react-native'
import PropTypes from 'prop-types'

export default class Upvote extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      imgArr: [
        require('../assets/images/specialEffects_01.png'),
        require('../assets/images/specialEffects_02.png'),
        require('../assets/images/specialEffects_03.png'),
        require('../assets/images/specialEffects_04.png'),
        require('../assets/images/specialEffects_05.png'),
        require('../assets/images/specialEffects_06.png'),
        require('../assets/images/specialEffects_07.png'),
        require('../assets/images/specialEffects_08.png'),
        require('../assets/images/specialEffects_09.png'),
        require('../assets/images/specialEffects_10.png'),
        require('../assets/images/specialEffects_11.png'),
        require('../assets/images/specialEffects_12.png'),
        require('../assets/images/specialEffects_13.png'),
        require('../assets/images/specialEffects_14.png'),
        require('../assets/images/specialEffects_15.png'),
        require('../assets/images/specialEffects_16.png'),
        require('../assets/images/specialEffects_17.png')
      ],
      imgValue: require('../assets/images/specialEffects_01.png'),
      index: 0
    }
  }

  imgAnimation = () => {
    // while(++count < len) {
    //   requestAnimationFrame(() => {
    //   // console.log(count, i)
    //     this.setState({
    //       index: this.state.index + 1
    //     })
    //     // this.refs.image.setNativeProps({
    //     //   source: this.state.imgArr[count]
    //     // })
    //   })
    // }
    requestAnimationFrame(this.step)
    
  }

  step = () => {
    this.setState({
      index: this.state.index + 1
    })
    console.log(this.state.index)
    if(this.state.index < this.state.imgArr.length - 1) {
      requestAnimationFrame(this.step)
    } else {
      this.setState({
        index: 0
      })
    }
  }

  imgList(index) {
    return this.state.imgArr.map((img, i) => {
      if(i === index) {
        return (
          <Image
            style={{height: this.props.height}} 
            source={img}>
          </Image>
        )
      }
    })
  }

  render() {
    const translateY = -1 * ( this.props.height + this.props.size ) / 2;
    
    return (
      <View style={styles.container} >
        <Text 
          onPress={this.imgAnimation} 
          style={[styles.iconStyle, {fontSize: this.props.size,}]} >&#xe63a;</Text>
        {this.imgList(this.state.index)}
      </View>
    );
  }
}

Upvote.defaultProps = {
  height: 50,
  size: 30
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
    backgroundColor: '#ddd'
  },
  iconStyle: {
    color: 'red',
    fontFamily:'iconfont',
    fontSize: 30,
    width: 30
  }
})

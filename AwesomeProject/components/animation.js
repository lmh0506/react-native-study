/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing
} from 'react-native';

export default class FadeInView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),  // 透明度初始值为0
      translateValue: new Animated.ValueXY({x: 0, y: 0}), // 二维坐标
      rotateValue: new Animated.Value(0),
      bounceValue: new Animated.Value(0.5)
    }
  }

  componentDidMount() {
    // Animated.timing( // 随时间变化而执行的动画类型
    //   this.state.fadeAnim, // 动画中的变量值
    //   {
    //     toValue: 1 // 透明度最终变为1，即完全不透明
    //   }
    // ).start() // 开始执行动画
    this.rotateScaleAnimation()
  }

  startAnimation() {
    this.state.translateValue.setValue({x: 0, y: 0});
    Animated.decay( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
      this.state.translateValue,
      {
        velocity: 10, // 起始速度  必填参数
        deceleration: 0.8 // 速度衰减比例  默认为0.997
      }
    ).start()
  }

  rotateScaleAnimation() {
    this.state.bounceValue.setValue(1.5)
    this.state.rotateValue.setValue(0)
    this.state.translateValue.setValue({x: 0, y: 0})
    this.state.fadeAnim.setValue(1)

    Animated.sequence([
      Animated.sequence([ // 组合动画 parallel (同时执行)、sequence(顺序执行)、stagger(错峰，其实就是插入了delay的parrllel和delay(延迟))
        Animated.spring( // 基础的单词弹跳物理模型
          this.state.bounceValue,
          {
            toValue: 0.8,
            friction: 1, // 摩擦力， 默认为7
            tension: 40 // 张力，默认为40
          }
        ),
        Animated.delay(2000), // 配合sequence 延迟2秒
        Animated.timing( // 从时间范围映射到渐变的值
          this.state.rotateValue,
          {
            toValue: 1,
            duration: 800, // 动画持续时间 默认为500
            easing: Easing.out(Easing.quad), // 一个用于定义曲线的渐变函数
            delay: 0 // 在一段时间之后开始动画  默认为0
          }
        ),
        Animated.decay( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
          this.state.translateValue,
          {
            velocity: 10, // 起始速度  必填参数
            deceleration: 0.8 // 速度衰减比例  默认为0.997
          }
        )
      ]),
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear
      })
    ]).start()
  }

  render() {
    return (
      <Animated.View style={{
        ...this.props.style,
        opacity: this.state.fadeAnim,
        transform: [
          {translateX: this.state.translateValue.x}, // x轴移动
          {translateY: this.state.translateValue.y}, // y轴移动 
          {scale: this.state.bounceValue}, // 缩放
          {rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做映射
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })}
        ]
      }}>
        {this.props.children}
      </Animated.View>
    );
  }

}

const styles = StyleSheet.create({
  
});

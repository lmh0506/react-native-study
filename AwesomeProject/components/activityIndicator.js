import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';

export default class ToggleAnimationActivityIndicator extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {
      animating: true // 是否显示加载动画
    }
  }
  
  showOrHide = () => {
    this.setState({
      animating: !this.state.animating
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 切换显示或隐藏的按钮 */}
        <TouchableOpacity underlayColor="#fff" style={styles.btn} onPress={
          this.showOrHide}>
            <Text style={{color:'#fff', fontSize: 20}}>显示/隐藏</Text>
        </TouchableOpacity>
        {/* 小号的指示器 */}
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="small" />
        {/* 大号的指示器 */}
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  btn:{
    marginTop:10,
    width:150,
    height:35,
    backgroundColor:'#3BC1FF',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4,
  },
});
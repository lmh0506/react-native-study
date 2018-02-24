
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native'

export default class MyModal extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      horizontal: false
    }
  }

  setHorizontal(horizontal) {
    this.setState({
      horizontal
    })
  }

  renderHorizontal() {
    let _scrollView = ScrollView
    return (
      <View>
        <ScrollView 
          ref={scrollView => {_scrollView = scrollView}}
          automaticallyAdjustContentInsets={false}
          onScroll={() => {console.log('onScroll')}}
          scrollEventThrottle={200} // scroll事件被调用的频率（单位是每秒事件数量）
          style={styles.scrollView}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {_scrollView.scrollTo({y: 0})}}>
          <Text>Scroll to top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {_scrollView.scrollToEnd({animated: true})}}>
          <Text>Scroll to bottom</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            this.setHorizontal(!this.state.horizontal)
          }}>
          <Text>change</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderVertical() {
    let _scrollView = ScrollView
    return (
      <View>
        <ScrollView 
          ref={scrollView => {_scrollView = scrollView}}
          horizontal={true}
          style={[styles.scrollView, styles.horizontalScrollView]}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {_scrollView.scrollTo({x: 0})}}>
          <Text>Scroll to start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {_scrollView.scrollToEnd({animated: true})}}>
          <Text>Scroll to end</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            this.setHorizontal(!this.state.horizontal)
          }}>
          <Text>change</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return this.state.horizontal ? this.renderHorizontal() : this.renderVertical()
  }

}

class Thumb extends Component<{}> {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return (
      <View style={[styles.button]}>
        <Image style={styles.img} source={{uri: this.props.uri}}/>
      </View>
    )
  }
}

const THUMBS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
const createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView,
  TouchableNativeFeedback
} from 'react-native'


const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://www.baidu.com/';

export default class MyWebView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      url: DEFAULT_URL,
      staus: 'NO Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true
    }
    this.inputText = ''
  }

  handleTextInputChange = e => {
    let url = e.nativeEvent.text
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url
    }
    this.inputText = url
  }

  injectJS = () => {
    const script = 'document.write("Inject JS")';
    const webview = this.refs[WEBVIEW_REF]
    if (webview) {
      webview.injectJavaScript(script)
    }
  }

  render() {
    this.inputText = this.state.url

    return (
      <View style={[styles.container]}>
        <View style={[styles.addressBarRow]}>
          <TouchableOpacity 
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {'<'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goForward}
            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {'>'}
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={this.state.url}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}/>
          <TouchableOpacity onPress={this.pressGoButton}>
            <View style={styles.goButton}>
              <Text>
                Go!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}>
          <View style={styles.statusBar}>
            <Text style={styles.statusBarText}>
              {this.state.staus}
            </Text>
          </View>  
        </WebView>
        <View style={styles.buttons}>
          {this.state.scalesPageToFit ? 
          <Button
            text="Scaling: ON"
            enabled={true}
            onPress={() => this.setState({scalesPageToFit: false})}>
          </Button> : 
          <Button
            text="Scaling: OFF"
            enabled={true}
            onPress={() => this.setState({scalesPageToFit: true})}></Button>}
          <Button 
            text="Inject JS"
            enabled
            onPress={this.injectJS}></Button>
        </View>
      </View>
    );
  }

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack()
  }

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward()
  }

  reload = () => {
    this.refs[WEBVIEW_REF].reload()
  }

  onShouldStartLoadWithRequest = e => {
    // 在这里写任何加载的逻辑，不要忘记返回
    console.log('startLoad')
    return true
  }

  onNavigationStateChange = navState => {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    })
  }

  onSubmitEditing = e => {
    this.pressGoButton()
  }

  pressGoButton = () => {
    let url = this.inputText.toLowerCase()
    if (url === this.state.url) {
      this.reload()
    } else {
      this.setState({
        url
      })
    }

    // 关闭键盘
    this.refs[TEXT_INPUT_REF].blur()
  }
  
}

class Button extends Component<{}> {
  constructor(props) {
    super(props)
  }
  _handlePress = () => {
    if (this.props.enabled !== false && this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={styles.button}>
          <Text>
            {this.props.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});

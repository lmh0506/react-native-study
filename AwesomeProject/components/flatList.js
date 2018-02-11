
import React, { PureComponent } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  View
} from 'react-native'
import RNTesterPage from '../RNTest/RNTesterPage'
import {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  Spindicator,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption
} from '../RNTest/ListExampleShared'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
}

export default class MyFlatList extends PureComponent<{}> {
  constructor(props) {
    super(props);

    this.state = {
      data: genItemData(100),
      horizontal: false,
      filterText: '',
      fixedHeight: true,
      logViewable: false,
      virtualized: true
    }
  }

  _onChangeFilterText = filterText => {  // 改变筛选内容
    this.setState({filterText})
  }

  _onchangeScrollToIndex = text => { // 滚动到指定位置
    this._listRef.getNode().scrollToIndex({
      viewPosition: 0.5,
      index: Number(text)
    })
  }

  _scrollPos = new Animated.Value(0)
  _scrollSinkX = new Animated.event(
    [{ nativeEvent: { contentOffset: { x: this._scrollPos } } }],
    { useNativeDriver: true }
  )
  _scrollSinkY = Animated.event(
    [{ nativeEvent: { contentOffset: { y: this._scrollPos } } }],
    { useNativeDriver: true }
  )

  _captureRef = ref => { this._listRef = ref }
  _getItemLayout = (data, index) => {
    return getItemLayout(data, index, this.state.horizontal)
  }

  _onEndReached = () => {
    this.setState(state => {
      data: state.data.concat(genItemData(100, state.data.length))
    })
  }

  _onRefresh = () => alert('onRefresh: nothing to refresh :P')

  _renderItemComponent = ({item}) => {
    return (
      <ItemComponent 
        item={item}
        horizontal={this.state.horizontal}
        fixedHeight={this.state.fixedHeight}
        onPress={this._pressItem}
      />
    )
  }

  _pressItem = key => {
    this._listRef.getNode().recordInteraction()
    pressItem(this, key)
  }

  componentDidUpdate() {
    this._listRef.getNode().recordInteraction()
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i')
    const filter = item => {
      return filterRegex.test(item.text) || filterRegex.test(item.title)
    }
    const filteredData = this.state.data.filter(filter)

    return (
      <RNTesterPage
        noSpacer={true}
        noScroll={true}
      >
        <View style={styles.searchRow}>
          <View style={styles.options}>
            <PlainInput
              onChangeText={this._onChangeFilterText}
              placeholder="Search..."
              value={this.state.filterText}
            />
            <PlainInput
              onChangeText={this._onchangeScrollToIndex}
              placeholder="scrollToIndex..."
            />
          </View>
          <View style={styles.options}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'horizontal')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
            <Spindicator value={this._scrollPos} />
          </View>
        </View>
        <SeparatorComponent />
        <AnimatedFlatList 
          ItemSeparatorComponent={SeparatorComponent}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          data={filteredData}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ? this._getItemLayout : undefined}
          horizontal={this.state.horizontal}
          key={(this.state.horizontal ? 'h' : 'v') +
            (this.state.fixedHeight ? 'f' : 'd')
          }
          legacyImplementation={false}
          numColumns={1}
          onEndReached={this._onEndReached}
          onRefresh={this._onRefresh}
          onScroll={this.state.horizontal ? this._scrollSinkX : this._scrollSinkY}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </RNTesterPage>
    );
  }

}

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
});

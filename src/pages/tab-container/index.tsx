import { ComponentType } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

interface ITabContainerState {
  current: number;
}

class TabContainer extends Taro.Component<{}, ITabContainerState> {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  render() {
    const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default TabContainer as ComponentType
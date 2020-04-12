// import { ComponentType } from "react";
import Taro, { Component, Config } from '@tarojs/taro'
import { WebView } from '@tarojs/components'


export default class Leetcode extends Component {
  config: Config = {
    navigationBarTitleText: 'leetcode'
  }
  constructor() {
    super()
    this.state = {
      outerUrl: this.$router.params.outerUrl
    }

  }
  render() {
    return (
      <WebView src={this.state.outerUrl}></WebView>
    )
  }
}

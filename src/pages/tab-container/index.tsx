import { ComponentType } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";

import Index from "../index";
import Rank from "../rank";

interface ITabContainerState {
  current: number;
}

class TabContainer extends Taro.Component<{}, ITabContainerState> {
  config: Config = {
    navigationBarTitleText: "打卡情况"
  };

  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  render() {
    const tabList = [
      {
        title: "今日题目"
      },
      {
        title: "今日榜单"
      },
      {
        title: "昨日榜单"
      }
    ];
    return (
      <AtTabs
        current={this.state.current}
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
      >
        <AtTabsPane current={this.state.current} index={0}>
          <Index />
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <Rank />
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页二的内容
          </View>
        </AtTabsPane>
      </AtTabs>
    );
  }
}

export default TabContainer as ComponentType;

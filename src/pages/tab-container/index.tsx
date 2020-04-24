import { ComponentType } from "react";
import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";

import Index from "../index";
import Rank from "../rank";
import ToDay from "../today";

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

  onShareAppMessage() {
    return {
      title: "力扣打卡",
      imageUrl: '' // 图片路径
    };
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
          <ToDay />
          {/* <Index /> */}
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <Rank date={"today"} />
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <Rank date={"yesterday"} />
        </AtTabsPane>
      </AtTabs>
    );
  }
}

export default TabContainer as ComponentType;

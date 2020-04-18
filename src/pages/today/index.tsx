import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import "./index.scss";
import Statistical from "./statistical";

import { NetworkManager } from "./../../network/network";

interface ITodayProblem {
  indexNum?: string;
  name?: string;
  questionTitleSlug?: string;
  date?: string;
  cnUrl?: string;
  enUrl?: string;
}

interface IStatistical {
  checkedCount?: number | string;
  totalUserCount?: number | string;
  checkRatio?: string;
}

interface ITodayProblemState {
  todayProblem: ITodayProblem;
  statistical: IStatistical;
}

class Day extends Component<ITodayProblem, ITodayProblemState> {
  // 发送请求
  statistical: IStatistical;
  constructor() {
    super();
    this.state = {
      todayProblem: {},
      statistical: {
        checkedCount: "",
        totalUserCount: "",
        checkRatio: ""
      }
    };
  }
  async componentDidShow() {
    await this.getTodayProblem();
    await this.getSummary();
  }

  /**
   * 打开力扣webview
   * @param outerUrl 打开力扣的地址
   */
  toLeetcode(outerUrl?: string) {
    const url = `/pages/leetcode/index?outerUrl=${outerUrl}`;
    Taro.navigateTo({ url });
  }

  /**
   * 获取每日一题信息
   */
  async getTodayProblem() {
    const res = await NetworkManager.getTodayProblem();
    this.setState({
      todayProblem: res[0]
    });
  }

  /**
   * 获取统计信息
   */
  async getSummary() {
    const res = await NetworkManager.getSummary();
    this.setState({
      statistical: res
    });
  }
  render() {
    return (
      <View className="today">
        <View className="banner">
          <View className="back">
            <View className="date">
              {/* {4} / {11} */}
              {this.state.todayProblem.date}
            </View>
            <View className="number">
              {this.state.todayProblem.indexNum}
            </View>
            <View className="problem">
              {this.state.todayProblem.name}
            </View>
          </View>
        </View>
        <Statistical {...this.state.statistical} />
        <View
          className="to_lc"
          onClick={() => this.toLeetcode(this.state.todayProblem.cnUrl)}
        >
          打开力扣，开始挑战 !
        </View>
        <View className="share">
          <Button open-type="share">
            <View className='at-icon at-icon-share'></View>
            <Text>分享</Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default Day;

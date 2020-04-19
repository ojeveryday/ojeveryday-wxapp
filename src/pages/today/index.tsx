import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
// import Statistical from "./statistical";

import { NetworkManager } from "./../../network/network";

interface ITodayProblem {
  indexNum?: string;
  name?: string;
  questionTitleSlug?: string;
  cnUrl?: string;
  enUrl?: string;
}
interface IDate {
  year?: string;
  month?: string;
  day?: string;
}

interface IStatistical {
  checkedCount?: number | string;
  totalUserCount?: number | string;
  checkRatio?: string;
}

interface ITodayProblemState {
  todayProblem: ITodayProblem;
  statistical: IStatistical;
  date: IDate;
}

class Day extends Component<ITodayProblem, ITodayProblemState> {
  // 发送请求
  statistical: IStatistical;
  constructor() {
    super();
    this.state = {
      todayProblem: {},
      date: {},
      statistical: {
        checkedCount: "0",
        totalUserCount: "0",
        checkRatio: "0"
      }
    };
  }

  config: Config = {
    navigationBarTitleText: "每日一题",
    navigationBarBackgroundColor: "#E5EAF5"
  };

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
    let res = await NetworkManager.getTodayProblem();
    res = res[0];
    const date = {
      year: String(new Date(res.date).getFullYear()),
      month: String(new Date(res.date).getMonth() + 1),
      day: String(new Date(res.date).getDate())
    };
    date.month = date.month.length === 2 ? date.month : "0" + date.month;
    this.setState({
      todayProblem: res,
      date
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
    const textStyle = {
      display: "-webkit-box",
      overflow: "hidden",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical"
    };
    return (
      <View className="today">
        <View className="banner">
          <View className="back">
            <View className="date">
              <View className="day">{this.state.date.day}</View>
              <View className="datetime">
                <Text className="month">{this.state.date.month}.</Text>
                <Text className="year">{this.state.date.year}</Text>
              </View>
              {/* {this.state.todayProblem.date} */}
            </View>
            <View className="problem" style={textStyle}>
              {this.state.todayProblem.indexNum}. {this.state.todayProblem.name}
            </View>
            <View className="problem zh" style={textStyle}>
              {this.state.todayProblem.indexNum}. {this.state.todayProblem.name}
            </View>
            <View className="progress">
              <View className="bar"></View>
            </View>
            <View className="footer">
              <Text># 每日题目</Text>
              <Text
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/rank/index"
                  });
                }}
              >
                已打卡: {this.state.statistical.totalUserCount}/
                {this.state.statistical.checkedCount}
                <Text className="at-icon at-icon-chevron-right"></Text>
              </Text>
            </View>
          </View>
        </View>
        <View
          className="to_lc"
          onClick={() => this.toLeetcode(this.state.todayProblem.cnUrl)}
        >
          前往打卡
        </View>
        {/* <View className="share">
          <Button open-type="share">
            <View className='at-icon at-icon-share'></View>
            <Text>分享</Text>
          </Button>
        </View> */}
      </View>
    );
  }
}
export default Day;

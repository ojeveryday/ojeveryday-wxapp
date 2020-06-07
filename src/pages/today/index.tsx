import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";
// import Statistical from "./statistical";
import { NetworkManager } from "./../../network/network";
import "taro-ui/dist/style/components/action-sheet.scss";
import IconFont from "../../iconfont";

import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import { ProblemDetail } from "src/network/model";

interface ITodayProblem {
  problemID: number
  indexNum?: string
  name?: string
  questionTitleSlug: string
  cnUrl: string
  enUrl?: string
}
interface IDate {
  year?: string
  month?: string
  day?: string
}

interface IStatistical {
  checkedCount?: number | string
  totalUserCount?: number | string
  checkRatio?: string
}

interface ITodayProblemState {
  todayProblem: ITodayProblem
  statistical: IStatistical
  date: IDate
  showShare: boolean
  isOpened: boolean
  detail: ProblemDetail
  problemString: string
}

const diffMap = {
  'Easy': { text: '简单', bg: 'easy' },
  'Middle': { text: '中等', bg: 'mid' },
  'Hard': { text: '困难', bg: 'hard' }
}
class Day extends Component<ITodayProblem, ITodayProblemState> {
  // 发送请求
  statistical: IStatistical;
  constructor() {
    super();
    Taro.showLoading({
      title: '加载中...'
    })
    this.state = {
      todayProblem: {
        problemID: 0,
        cnUrl: '',
        questionTitleSlug: '',
      },
      detail: {},
      problemString: '',
      isOpened: false,
      date: {},
      statistical: {
        checkedCount: "0",
        totalUserCount: "0",
        checkRatio: "0"
      },
      showShare: false,
    };
  }

  config: Config = {
    navigationBarTitleText: "每日一题",
    navigationBarBackgroundColor: "#E5EAF5"
  };

  async componentDidShow() {
    this.setState({
      showShare: false
    })
    const questinTitleSlug = await this.getTodayProblem();
    await this.getProblemDetail(questinTitleSlug)
    await this.getSummary();
    Taro.hideLoading()
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
    const MonthMap = {
      '1': 'Jan',
      '2': 'Feb',
      '3': 'Mar',
      '4': 'Apr',
      '5': 'May',
      '6': 'Jun',
      '7': 'Jul',
      '8': 'Aug',
      '9': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec',
    }
    let res = await NetworkManager.getTodayProblem();
    res = res[0];
    const date = {
      year: String(new Date(res.date).getFullYear()),
      month: String(new Date(res.date).getMonth() + 1),
      day: String(new Date(res.date).getDate())
    };
    date.month = MonthMap[date.month];
    this.setState({
      todayProblem: res,
      date
    });
    return res.questionTitleSlug
  }
  /** 
   * 获取题目详细信息
   */
  async getProblemDetail(slug: string) {
    const problemDetail = await NetworkManager.getProblem(undefined, slug)
    this.setState({ detail: problemDetail, problemString: problemDetail.translatedContent.replace(/\<\w+\>|\<\/\w+\>|\&\w+|/g, '').replace(/\s/g, '').replace(/\/|\\/, '') })
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
  getProgressWidth() {
    let width = Number(this.state.statistical.checkedCount) / Number(this.state.statistical.totalUserCount) * 100
    width = width > 100 ? 100 : Number(width.toFixed(2))
    return ({ width: width + "%" })
  }
  componentDidHide() {
    setTimeout(() => {
      this.setState({
        isOpened: false,
        showShare: false
      })
    }, 0);
  }
  /**
   * 页面右上角转发
   */
  onShareAppMessage() {
    this.setState({
      showShare: true
    })
    return {
      title: '每日一题'
    }
  }

  setClipboardData(url) {
    Taro.setClipboardData({
      data: url
    })
  }

  render() {

    const { indexNum, questionTitleSlug } = this.state.todayProblem
    const { translatedTitle, difficulty } = this.state.detail
    const { problemString } = this.state
    return (
      <View className={this.state.showShare ? "today show_share" : "today"}>
        <View className='banner'>
          <View className='back'>
            <View className='date'>
              <View className='date_box'>
                <View className='day'>
                  {this.state.date.day}
                </View>
                <View className='datetime'>
                  <Text className='month'>{this.state.date.month}.</Text>
                  <Text className='year'>{this.state.date.year}</Text>
                </View>
              </View>

            </View>
            {/* <View className="problem">
              {this.state.todayProblem.indexNum}. {this.state.todayProblem.questionTitleSlug}
            </View> */}
            <View className='problem'>
              <View className={'problem_diff ' + (difficulty && diffMap[difficulty].bg)} >{difficulty && diffMap[difficulty].text}</View>
              <View className='problem_name'>{indexNum}. {translatedTitle}</View>
              <View className='problem_detail'>{problemString}</View>
              <View className='showAll' onClick={() => {
                if (questionTitleSlug) {
                  Taro.navigateTo({
                    url: `/pages/detail/index?slug=${questionTitleSlug}`
                  });
                }
              }}
              >全文</View>
            </View>
            <View className='progress'>
              <View className='bar' style={this.getProgressWidth()}></View>
            </View>
            <View className='footer'>
              <Text># 每日LeetCode</Text>
              <Text
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/rank/index"
                  });
                }}
              >
                已打卡: {this.state.statistical.checkedCount}/
                {this.state.statistical.totalUserCount}
                <Text className='at-icon at-icon-chevron-right'></Text>
              </Text>
            </View>
          </View>
        </View>
        <View className='bottom_box'>
          <View
            className='to_lc'
            onClick={() => this.setState({ isOpened: true })}
          >
            前往打卡
          </View>
          <View className='bottom_r'>
            <View className='ranking'
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/rank/index"
                });
              }}
            >
              <IconFont
                size={30}
                name='icon_lc_ranking'
                color='rgba(94, 130, 245, 1)'
              />
              <Text>打卡排名</Text>
            </View>
            <View className='share'
              onClick={() => {
                this.setState({
                  showShare: true
                })
              }}
            >
              <Button openType='share'>
                <IconFont
                  size={30}
                  name='icon_lc_share'
                  color='rgba(94, 130, 245, 1)'
                />
                <Text>分享</Text>
              </Button>
            </View>
          </View>
        </View>
        <AtActionSheet isOpened={this.state.isOpened} cancelText='取消' title='点击下列按钮，会自动复制题目链接，前往浏览器粘贴打开即可' onClose={() => this.setState({ isOpened: false })}>
          <AtActionSheetItem onClick={() => this.setClipboardData(this.state.todayProblem.cnUrl)}>
            复制中文版力扣地址
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => this.setClipboardData(this.state.todayProblem.enUrl)}>
            复制英文版 LeetCode 地址
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}
export default Day;

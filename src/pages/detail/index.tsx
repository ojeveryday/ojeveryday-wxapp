import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { NetworkManager } from "./../../network/network";
// import { propagateMaybeChanged } from 'mobx/lib/core/observable';
import { ProblemDetail } from '../../network/model'
import "./index.scss";

interface ProblemProps { }
interface ProblemState {
  problemDetail: ProblemDetail
}
const diffMap = {
  'Easy': { text: '简单', bg: 'easy' },
  'Middle': { text: '中等', bg: 'mid' },
  'Hard': { text: '困难', bg: 'hard' }
}
/**
 * 需要注意的是，在项目的 config/index.js 文件中，有 copy 模板与样式的操作
 */
export default class ParseRichTextPage extends Taro.Component<ProblemProps, ProblemState>{

  constructor(args) {
    super(args);
    this.state = {
      problemDetail: {
        content: 'loading please waiting',
        translatedContent: '加载中,请稍后'
      }
    }
  }
  componentDidMount() {
    this.getData()
  }
  async getData() {
    const { id, slug } = this.$router.params
    const problemDetail = await NetworkManager.getProblem(id, slug)
    this.setState({ problemDetail });
  }
  config: Config = {
    navigationBarBackgroundColor: '#E5EAF5',
    backgroundColor: '#E5EAF5',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '题目详情',
    usingComponents: {
      'parser': '../../components/parser/parser' // 引入插件包
    }
  };
  render() {
    const { difficulty, translatedContent, translatedTitle, frontendId } = this.state.problemDetail
    return (
      <View>
        <View className='name'>
          {frontendId}. {translatedTitle}
        </View>
        <View className={`difficulty ${difficulty && diffMap[difficulty].bg}`}>
          {difficulty && diffMap[difficulty].text}
        </View>
        <View className='problemDetail'>
          <parser html={translatedContent}></parser>
        </View>
      </View>
    );
  }
}
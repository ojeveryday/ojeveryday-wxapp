import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { NetworkManager } from "./../../network/network";
// import { propagateMaybeChanged } from 'mobx/lib/core/observable';
import { ProblemDetail } from "../../network/model";
import "./index.scss";

interface IProblemProps { }
interface IProblemState {
  problemDetail: ProblemDetail;
}
/**
 * 需要注意的是，在项目的 config/index.js 文件中，有 copy 模板与样式的操作
 */
export default class ParseRichTextPage extends Taro.Component<
  IProblemProps,
  IProblemState
  > {
  constructor(args) {
    super(args);
    this.state = {
      problemDetail: {
        content: "loading please waiting",
        translatedContent: "加载中,请稍后"
      }
    };
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const { id, slug } = this.$router.params;
    const problemDetail = await NetworkManager.getProblem(id, slug);
    this.setState({ problemDetail });
  }

  config: Config = {
    navigationBarBackgroundColor: "#E5EAF5",
    backgroundColor: "#E5EAF5",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "题目详情",
    usingComponents: {
      parser: "../../components/parser/parser" // 引入插件包
    }
  };
  onShareAppMessage() {
    return {
      title: "快来看看今天的每日一题难不难"
    };
  }

  render() {
    const {
      difficulty,
      translatedContent,
      translatedTitle,
      frontendId
    } = this.state.problemDetail;
    return (
      <View>
        <View className="name" data-diff={difficulty}>
          {frontendId}. {translatedTitle}
        </View>
        <View className="problemDetail">
          <parser html={translatedContent} />
        </View>
      </View>
    );
  }
}

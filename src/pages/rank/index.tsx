import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import RankItem from "../../components/rank-item";
import RankMeItem from "../../components/bind-me-item";
import ListView from "taro-listview";
import "./index.scss";
import { NetworkManager, RankItemModel } from "../../network/network";
import IconFont from "../../iconfont";
import BindingItem from "../../components/bind-item";
import BindingIdActionSheet from "../../components/bind-sheet";
import { observer, inject } from "@tarojs/mobx";


interface IRankProps {
  date?: string | "today" | "yesterday";
  rankStore: {
    bindUserId: string | null;
  }
}
interface IRankState {
  items: RankItemModel[];
  isLoaded: boolean;
  hasMore: boolean;
  isEmpty: boolean;
  isOpenBindActionSheet: boolean;
}
@inject((store) => {
  return { rankStore: store.rankStore }
})
@observer
class Rank extends Taro.Component<IRankProps, IRankState> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      hasMore: true,
      isEmpty: false,
      isOpenBindActionSheet: false
    };
  }

  config: Config = {
    navigationBarTitleText: "每日榜单",
    navigationBarBackgroundColor: "#E5EAF5"
  };

  refList = {};
  isUpdated = false;
  pageIndex = 1;

  async componentDidMount() {
    // 获取全 rank 数据
    this.fetchDatas();
    const items = await this.fetchDatas();
    this.setState({
      items: items,
      isLoaded: false,
      isEmpty: false
    });

    // 获取个人数据
  }

  async fetchDatas(page = 1) {
    const date: string = this.props.date ? this.props.date : "today";
    if (date === "today") {
      return NetworkManager.getTodayRank(page);
    } else if (date === "yesterday") {
      return NetworkManager.getYesterdayRank(page);
    } else {
      return NetworkManager.getRank(date);
    }
  }

  insRef = node => {
    this.refList = node;
  };

  pullDownRefresh = async _rest => {
    if (this.isUpdated) return;
    const items = await this.fetchDatas();
    this.isUpdated = false;
    this.setState({
      items: items,
      isEmpty: false
    });
    _rest();
  };

  onScrollToLower = async fn => {
    if (this.isUpdated) return;
    const { items } = this.state;
    const addItems = await this.fetchDatas(++this.pageIndex);
    this.isUpdated = false;
    this.setState({
      items: items.concat(addItems)
    });
    fn();
  };

  render() {
    const { items, hasMore, isOpenBindActionSheet } = this.state;
    const { rankStore: { bindUserId } } = this.props
    return (
      <View className="lazy-view">
        <BindingIdActionSheet isOpened={isOpenBindActionSheet} />
        <ListView
          lazy
          style={{ height: "100vh", backgroundColor: "#E5EAF5" }}
          ref={node => this.insRef(node)}
          hasMore={hasMore}
          onPullDownRefresh={fn => this.pullDownRefresh(fn)}
          footerLoadedText="到底了"
          onScrollToLower={fn => this.onScrollToLower(fn)}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <IconFont
              size={30}
              name="icon_lc_ranking"
              color="rgba(11,11,51,1)"
            />
            <View
              style={{
                fontSize: "16px",
                fontFamily: "PingFangSC-Medium,PingFang SC",
                color: "rgba(11,11,51,1)",
                marginLeft: "4px"
              }}
            >
              打卡排名
            </View>
          </View>

          {bindUserId ? (
            <RankMeItem key={`bind-user`} rank={-1} />
          ) : (
              <BindingItem
                onClick={() => {
                  this.setState({ isOpenBindActionSheet: true });
                }}
              />
            )}

          {items.map((item, index) => {
            return (
              <RankItem
                key={`${index}-${item}`}
                rank={index + 1}
                model={item}
              />
            );
          })}
        </ListView>
      </View>
    );
  }
}

export default Rank;

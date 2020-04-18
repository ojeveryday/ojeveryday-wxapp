import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import RankItem from "../../components/rank-item";
import ListView from "taro-listview";

import { NetworkManager, RankItemModel } from "../../network/network";

interface IRankProps {
  date?: string | "today" | "yesterday";
}

interface IRankState {
  items: RankItemModel[];
  isLoaded: boolean;
  hasMore: boolean;
  isEmpty: boolean;
}

class Rank extends Taro.Component<IRankProps, IRankState> {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      hasMore: true,
      isEmpty: false
    };
  }

  refList = {};
  pageIndex = 1;

  async componentDidMount() {
    this.fetchDatas();
    const items = await this.fetchDatas();
    this.setState({
      items: items,
      isLoaded: false,
      isEmpty: false
    });
  }

  async fetchDatas(page: number = 1) {
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
    this.pageIndex = 1;
    const items = await this.fetchDatas();
    this.setState({
      items: items,
      isLoaded: false,
      isEmpty: false
    });
    _rest();
  };

  onScrollToLower = async fn => {
    const { items } = this.state;
    const addItems = await this.fetchDatas(++this.pageIndex);
    console.log(this.pageIndex);
    this.setState({
      items: items.concat(addItems)
    });
    fn();
  };

  render() {
    const { items, isLoaded, hasMore, isEmpty } = this.state;
    return (
      <View className="lazy-view">
        <ListView
          lazy
          style={{ height: "100vh" }}
          ref={node => this.insRef(node)}
          hasMore={hasMore}
          onPullDownRefresh={fn => this.pullDownRefresh(fn)}
          footerLoadedText={"暂时只显示前 100 名"}
          onScrollToLower={fn => this.onScrollToLower(fn)}
        >
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

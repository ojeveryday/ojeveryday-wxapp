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
      return NetworkManager.getTodayRank();
    } else if (date === "yesterday") {
      return NetworkManager.getYesterdayRank();
    } else {
      return NetworkManager.getRank(date);
    }
  }

  insRef = node => {
    this.refList = node;
  };

  pullDownRefresh = async _rest => {
    const items = await this.fetchDatas();
    this.setState({
      items: items,
      isLoaded: false,
      isEmpty: false
    });
    _rest();
  };

  render() {
    const { items, isLoaded, hasMore, isEmpty } = this.state;
    return (
      <View className="lazy-view">
        <ListView
          lazy
          ref={node => this.insRef(node)}
          onPullDownRefresh={fn => this.pullDownRefresh(fn)}
          footerLoadedText={"暂时只显示前 100 名"}
        >
          {items.slice(0, 100).map((item, index) => {
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

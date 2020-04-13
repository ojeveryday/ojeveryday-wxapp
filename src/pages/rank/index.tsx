import { ComponentType } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import RankItem from "../../components/rank-item";

import { NetworkManager, RankItemModel } from "../../network/network";

interface IRankProps {
  date?: string | "today" | "yesterday";
}

interface IRankState {
  items: RankItemModel[];
}

class Rank extends Taro.Component<IRankProps, IRankState> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.fetchDatas();
  }

  fetchDatas() {
    const date: string = this.props.date ? this.props.date : "today";
    const callback: { (items: RankItemModel[]): void } = (
      items: RankItemModel[]
    ) => {
      this.setState({ items: items });
    };
    if (date === "today") {
      NetworkManager.getTodayRank().then(callback);
    } else if (date === "yesterday") {
      NetworkManager.getYesterdayRank().then(callback);
    } else {
      NetworkManager.getRank(date).then(callback);
    }
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {this.state.items.map((item, index) => {
          return (
            <RankItem key={`${index}-${item}`} rank={index + 1} model={item} />
          );
        })}
      </View>
    );
  }
}

export default Rank;

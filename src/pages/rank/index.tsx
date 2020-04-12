import { ComponentType } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import RankItem from "../../components/rank-item";

import { NetworkManager, RankItemModel } from "../../network/network";

interface IRankProps {
  date?: string;
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
    const date: string = this.props.date ? this.props.date : "2020-04-13";
    NetworkManager.getRank(date).then((items: RankItemModel[]) => {
      this.setState({ items: items });
      console.log(items);
    });
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

export default Rank as ComponentType;

import { ComponentType } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import RankItem from "../../components/rank-item";

class Rank extends Taro.Component {
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => {
          return <RankItem key={`${index}-${item}`} />;
        })}
      </View>
    );
  }
}

export default Rank as ComponentType;

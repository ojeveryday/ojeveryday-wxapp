import { View, Image, Text, Button } from "@tarojs/components";
import styles from "./index.scss";
import IconFont from "../../iconfont";

import { RankItemModel } from "../../network/network";

interface IRankIconItemProps {
  value: string;
  icon: string;
  size?: number;
}

interface IRankItemProps {
  model: RankItemModel;
  rank: number;
}

interface IRankItemState {
  is_punched: boolean;
}

class RankItem extends Taro.Component<IRankItemProps, IRankItemState> {
  constructor(props: IRankItemProps) {
    super(props);
    this.state = {
      is_punched: false
    };
  }

  rankIconItem(props: IRankIconItemProps) {
    const { value, icon, size } = props;
    return (
      <View
        style={{ display: "flex", alignItems: "center", paddingRight: "20px" }}
      >
        <IconFont size={size ? size : 50} name={icon} />
        <Text style={{ paddingLeft: "7px" }}>{value}</Text>
      </View>
    );
  }

  render() {
    const check: boolean = this.props.model.checked === 1;
    return (
      <View
        style={{
          height: "100px",
          margin: "1px",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <View
          style={{
            width: "96px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: "60px",
              height: "60px",
              marginTop: "10px",
              borderRadius: "30px",
              flex: "0 0 auto"
            }}
            src={this.props.model.avatar}
          />
          <View
            style={{
              width: "40px",
              height: "16px",
              backgroundColor: check ? "green" : "#EF4684",
              display: "flex",
              alignItems: "center",
              position: "relative",
              top: "-10px",
              right: "-14px",
              borderRadius: "20px",
              border: "2px solid #fff;",
              flex: "0 0 auto"
            }}
          >
            <Text
              className={styles.avatar_state_label}
              style={{
                fontSize: "8px",
                width: "100%",
                textAlign: "center",
                color: "white"
              }}
            >
              {check ? "已打卡" : "未打卡"}
            </Text>
          </View>
          <Text style={{ fontSize: "14", position: "relative", top: "-10px" }}>
            No.{this.props.rank}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <View
            style={{
              marginTop: "20px",
              height: "35px",
              display: "flex",
              alignItems: "center",
              marginLeft: "8px",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                fontSize: "22px"
              }}
            >
              {this.props.model.username}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              marginLeft: "8px",
              height: "50px"
            }}
          >
            {this.rankIconItem({ value: "21天", icon: "day" })}
            {this.rankIconItem({ value: "12121", icon: "good", size: 36 })}
            {this.rankIconItem({ value: "8", icon: "daka", size: 36 })}
          </View>
        </View>
      </View>
    );
  }
}

export default RankItem;

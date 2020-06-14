import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";

import "./index.scss";

interface IBindingItemProps {
  onClick: { (): void };
}
interface IBindingItemState { }

class BindingItem extends Taro.Component<IBindingItemProps, IBindingItemState> {
  constructor(props: IBindingItemProps) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          height: "75px",
          margin: "10px 0 ",
          background: "#5E82F5",
          borderRadius: "4px",
          border: "0px solid rgba(151,151,151,1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: "#E5EAF5",
            fontFamily: "PingFangSC-Regular,PingFang SC",
            fontSize: "12px",
            paddingTop: "10px"
          }}
        >
          绑定力扣用户名，实时查看个人打卡榜单
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "8px"
          }}
        >
          <AtButton
            type="secondary"
            size="small"
            circle={true}
            customStyle={{
              fontFamily: "PingFangSC-Semibold,PingFang SC",
              fontSize: "10px"
              // height: "22px"
            }}
            onClick={() => {
              this.props.onClick();
            }}
          >
            前往绑定
          </AtButton>
        </View>
      </View>
    );
  }
}

export default BindingItem;

import { View, Image, Text } from "@tarojs/components";
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

  render() {
    const check: boolean = this.props.model.checked === 1;
    return (
      <View
        style={{
          height: "66px",
          margin: "10px",
          background: "rgba(255,255,255,1)",
          borderRadius: "4px",
          border: "0px solid rgba(151,151,151,1)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexShrink: 0
          }}
        >
          <View
            style={{
              fontSize: "15px",
              fontFamily: "PingFangSC-Semibold,PingFang SC",
              color: "rgba(94,130,245,1)",
              lineHeight: "21px",
              paddingLeft: "30px"
            }}
          >
            {"1"}
          </View>
          <Image
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "19px",
              border: "0px solid rgba(151,151,151,1)",
              marginLeft: "19px"
            }}
            src={this.props.model.avatar}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "11px",
              width: "150px"
            }}
          >
            <Text
              style={{
                fontSize: "14px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(11,11,51,1)",
                width: "150px"
              }}
            >
              {this.props.model.username}
            </Text>
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(11,11,51,0.3)",
                lineHeight: "14px"
              }}
            >
              {this.props.model.checkedTime}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "44px",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(11,11,51,1)"
              }}
            >
              {this.props.model.totalChecked}天
            </Text>
            <Text
              style={{
                fontSize: "10px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(11,11,51,0.3)",
                lineHeight: "14px"
              }}
            >
              累计打卡
            </Text>
          </View>
          {check ? (
            <View
              style={{
                marginLeft: "40px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <IconFont size={30} name={"good"} color="#5E82F5" />
              <Text
                style={{
                  fontSize: "10px",
                  fontFamily: "PingFangSC-Semibold,PingFang SC",
                  color: "rgba(11,11,51,0.3)",
                  lineHeight: "14px",
                  marginLeft: "3px"
                }}
              >
                {this.props.model.upvoteNumber}
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginLeft: "40px",
                width: "50px",
                height: "22px",
                background: "rgba(13,14,54,0.3)",
                borderRadius: "11px",
                border: "0px solid rgba(151,151,151,1)",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                  width: "100%",
                  fontFamily: "PingFangSC-Semibold,PingFang SC",
                  color: "rgba(255,255,255,0.6)",
                  textAlign: "center"
                }}
              >
                未打卡
              </Text>
            </View>
          )}
        </View>
      </View>

      // <View
      //   style={{
      //     height: "100px",
      //     margin: "1px",
      //     display: "flex",
      //     justifyContent: "space-around"
      //   }}
      // >
      //   <View
      //     style={{
      //       width: "96px",
      //       display: "flex",
      //       flexDirection: "column",
      //       alignItems: "center"
      //     }}
      //   >
      //     <Image
      //       style={{
      //         width: "60px",
      //         height: "60px",
      //         marginTop: "10px",
      //         borderRadius: "30px",
      //         flex: "0 0 auto"
      //       }}
      //       src={this.props.model.avatar}
      //     />
      //     <View
      //       style={{
      //         width: "40px",
      //         height: "16px",
      //         backgroundColor: check ? "green" : "#EF4684",
      //         display: "flex",
      //         alignItems: "center",
      //         position: "relative",
      //         top: "-10px",
      //         right: "-14px",
      //         borderRadius: "20px",
      //         border: "2px solid #fff;",
      //         flex: "0 0 auto"
      //       }}
      //     >
      //       <Text
      //         className={styles.avatar_state_label}
      //         style={{
      //           fontSize: "8px",
      //           width: "100%",
      //           textAlign: "center",
      //           color: "white"
      //         }}
      //       >
      //         {check ? "已打卡" : "未打卡"}
      //       </Text>
      //     </View>
      //     <Text style={{ fontSize: "14", position: "relative", top: "-10px" }}>
      //       No.{this.props.rank}
      //     </Text>
      //   </View>

      //   <View
      //     style={{
      //       flex: 1,
      //       display: "flex",
      //       flexDirection: "column"
      //     }}
      //   >
      //     <View
      //       style={{
      //         marginTop: "10px",
      //         height: "35px",
      //         display: "flex",
      //         alignItems: "center",
      //         marginLeft: "8px",
      //         justifyContent: "space-between"
      //       }}
      //     >
      //       <Text
      //         style={{
      //           fontSize: "18px"
      //         }}
      //       >
      //         {this.props.model.username}
      //       </Text>
      //     </View>
      //     {check && (
      //       <View
      //         style={{
      //           display: "flex",
      //           marginLeft: "8px",
      //           height: "50px"
      //         }}
      //       >
      //         {this.rankIconItem({
      //           value: `${this.props.model.totalChecked}天`,
      //           icon: "day"
      //         })}
      //         {this.rankIconItem({
      //           value: `${this.props.model.upvoteNumber}`,
      //           icon: "good",
      //           size: 24
      //         })}
      //         {this.rankIconItem({
      //           value: this.props.model.checkedTime.slice(11),
      //           icon: "daka",
      //           size: 24
      //         })}
      //       </View>
      //     )}
      //   </View>
      // </View>
    );
  }
}

export default RankItem;

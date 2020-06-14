import { View, Image, Text } from "@tarojs/components";
import IconFont from "../../iconfont";

import { RankItemModel } from "../../network/network";

interface IRankMeItemProps {
  model: RankItemModel;
  rank: number;
}

interface IRankMeItemState {
  is_punched: boolean;
}

class RankMeItem extends Taro.Component<IRankMeItemProps, IRankMeItemState> {
  constructor(props: IRankMeItemProps) {
    super(props);
    this.state = {
      is_punched: false
    };
  }

  render() {
    let check: boolean = false;
    if (this.props.model && this.props.model.checked && this.props.model.checked === 1) {
      check = true;
    }
    return (
      <View
        style={{
          height: "66px",
          background: "rgba(229,234,245,1)",
          borderRadius: "4px",
          border: "2px solid rgba(255,255,255,1)",
          position: "relative"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
            paddingRight: "10px",
            overflow: "hidden",
            width: "100%",
            height: "100%"
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexShrink: 0,
              justifyContent: "center"
            }}
          >
            <View
              style={{
                fontSize: "15px",
                fontFamily: "PingFangSC-Semibold,PingFang SC",
                color: "rgba(94,130,245,1)",
                lineHeight: "21px",
                marginLeft: "10px",
                width: "27px"
              }}
            >
              {this.props.rank > 0 ? this.props.rank : " "}
            </View>
            <Image
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "19px",
                border: "0px solid rgba(151,151,151,1)",
                marginLeft: "10px"
              }}
              src={this.props.model.avatar}
            />
            <View
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                marginLeft: "11px",
                marginRight: "10px"
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontFamily: "PingFangSC-Semibold,PingFang SC",
                  color: "rgba(11,11,51,1)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "105px"
                }}
              >
                {this.props.model.username}
              </Text>

              <Text
                style={{
                  fontSize: "10px",
                  fontFamily: "PingFangSC-Semibold,PingFang SC",
                  color: "rgba(11,11,51,0.3)",
                  lineHeight: "14px",
                  width: "105px"
                }}
              >
                {check ? this.props.model.checkedTime : ""}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {check ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <IconFont size={30} name={"icon_lc_like"} color="#5E82F5" />
                <Text
                  style={{
                    fontSize: "10px",
                    fontFamily: "PingFangSC-Semibold,PingFang SC",
                    color: "rgba(11,11,51,0.3)",
                    lineHeight: "14px",
                    width: "14px",
                    marginLeft: "2px"
                  }}
                >
                  {this.props.model.upvoteNumber}
                </Text>
              </View>
            ) : (
                <View
                  style={{
                    width: "50px",
                    height: "22px",
                    background: "rgba(13,14,54,0.3)",
                    borderRadius: "11px",
                    border: "0px solid rgba(151,151,151,1)",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "5px"
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
            <View
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
          </View>
        </View>
        <Image
          src={"../../assets/images/icon_ranking_me.png"}
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            top: "0",
            left: "0"
          }}
        />
      </View>
    );
  }
}

export default RankMeItem;

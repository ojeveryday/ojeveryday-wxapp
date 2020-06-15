import Taro, { Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtCalendar, AtFloatLayout } from "taro-ui"
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
  showDate: boolean
  dateState: string
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
      showDate: false,
      dateState: "today"
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

  /**
    * @author fzyt
    * @desc AtFloatLayout 关闭触发方法
    * @param 无
    **/
  handleClose() {
    this.setState({
      showDate: false
    })
  }

  /**
    * @author fzyt
    * @desc selectDate 选择日期方法
    * @param 无
    **/
  selectDate = async () => {
    const date: string = this.state.dateState;
    const items = await NetworkManager.getRank(date);
    this.setState({
      items: items,
      showDate: false
    });
  }

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
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: "26px"
            }}
          >
            <IconFont
              size={30}
              name="icon_lc_ranking"
              color="rgba(11,11,51,1)"
            />
            <View
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <IconFont
                size={30}
                name='icon_lc_ranking'
                color='rgba(11,11,51,1)'
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
            <View
              onClick={() => {
                this.setState({
                  showDate: true
                })
              }}
            >
              <IconFont
                size={30}
                name={"daka"}
                color="rgba(11,11,51,1)"
              />
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
        <AtFloatLayout isOpened={this.state.showDate} title='请选择日期' onClose={this.handleClose.bind(this)}>
          <AtCalendar maxDate={new Date()} onSelectDate={(SelectDate) => this.setState({ dateState: SelectDate.value.start })} />
          <View className="rank">
            <View
              className="sel_date"
              onClick={() => this.selectDate()}
            >
              查看此日排名
            </View>
          </View>
        </AtFloatLayout>
      </View>
    );
  }
}

export default Rank;

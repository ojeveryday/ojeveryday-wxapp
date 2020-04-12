
import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './statistical.scss'

interface IStatistical {
  checkedCount: number | string,
  totalUserCount: number | string,
  checkRatio: string,
}

class Statistical extends Component<IStatistical> {

  render() {
    return (
      <View className="statistical">
        <View className="card">
          <Text className="number">{this.props.totalUserCount}</Text>
          <Text className="label">统计人数</Text>
        </View>
        <View className="card over">
          <Text className="number ">{this.props.checkedCount}</Text>
          <Text className="label">打卡人数</Text>
        </View>
        <View className="card ratio">
          <Text className="number">{this.props.checkRatio}</Text>
          <Text className="label">打卡率</Text>
        </View>
      </View>
    )
  }
}
export default Statistical;

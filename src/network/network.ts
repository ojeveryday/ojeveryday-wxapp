import Taro from "@tarojs/taro";

import { RankItemModel } from "./model";

class NetworkManager {
  static host: string = "http://ojeveryday.com/";

  static makeUri(path: string) {
    return `${NetworkManager.host}${path}`;
  }

  static async resolveRequest(option) {
    return Taro.request(option).then(res => {
      const { statusCode, data } = res;
      if (statusCode >= 200 && statusCode < 300) {
        return data;
      } else {
        throw new Error(`Error code ${statusCode}`);
      }
    });
  }

  static async getRank(date: string): Promise<RankItemModel[]> {
    const option = {
      url: NetworkManager.makeUri("checkDayInfo/day"),
      data: {
        date: date
      }
    };
    return NetworkManager.resolveRequest(option);
  }

  static async getTodayProblem() {
    const params = {
      url: "http://ojeveryday.com/problem/todayProblem"
    };
    return NetworkManager.resolveRequest(params);
  }
}

export { NetworkManager, RankItemModel };

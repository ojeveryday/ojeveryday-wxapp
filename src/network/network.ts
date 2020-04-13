import Taro from "@tarojs/taro";

import { RankItemModel } from "./model";

import { formatDate } from "../utils/date_helper";

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

  static async getTodayRank(): Promise<RankItemModel[]> {
    const today = new Date();
    const dateFormat = formatDate(today);
    return this.getRank(dateFormat);
  }

  static async getYesterdayRank(): Promise<RankItemModel[]> {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dateFormat = formatDate(yesterday);
    return this.getRank(dateFormat);
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

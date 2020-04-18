import Taro from "@tarojs/taro";

import { RankItemModel } from "./model";

import { formatDate } from "../utils/date_helper";

class NetworkManager {
  static host: string = "https://ojeveryday.com/";

  static makeUri(path: string) {
    return `${NetworkManager.host}${path}`;
  }

  static async resolveRequest(option) {
    option.header = {
      Authorization: "Basic YWRtaW46YWRtaW4="
    };
    return Taro.request(option).then(res => {
      const { statusCode, data } = res;
      if (statusCode >= 200 && statusCode < 300) {
        return data;
      } else {
        throw new Error(`Error code ${statusCode}`);
      }
    });
  }

  static async getTodayRank(page: number = 1): Promise<RankItemModel[]> {
    const today = new Date();
    const dateFormat = formatDate(today);
    return this.getRank(dateFormat, page);
  }

  static async getYesterdayRank(page: number = 1): Promise<RankItemModel[]> {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dateFormat = formatDate(yesterday);
    return this.getRank(dateFormat, page);
  }

  static async getRank(
    date: string,
    page: number = 1
  ): Promise<RankItemModel[]> {
    const option = {
      url: NetworkManager.makeUri("checkDayInfo/day/page"),
      data: {
        date: date,
        pageNum: page
      }
    };
    return NetworkManager.resolveRequest(option);
  }

  static async getTodayProblem() {
    const params = {
      url: NetworkManager.makeUri("problem/todayProblem")
    };
    return NetworkManager.resolveRequest(params);
  }

  static async getSummary() {
    const params = {
      url: NetworkManager.makeUri("checkDayInfo/summary")
    };
    return NetworkManager.resolveRequest(params);
  }
}

export { NetworkManager, RankItemModel };

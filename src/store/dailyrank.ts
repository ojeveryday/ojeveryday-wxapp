import { observable, action } from "mobx";
import Taro from "@tarojs/taro";
import { NetworkManager, RankItemModel } from "../network/network"
class DailyRankStore {
  @observable bindUserId: string | null = null;
  @observable bindUserInfo: RankItemModel = {
    sortId: "",
    username: "",
    address: "",
    avatar: "",
    totalChecked: 0,
    checked: 0,
    checkedTime: "null",
    upvoteNumber: 0
  }
  constructor() {
    this.getLeetCodeUserId();
  }
  getLeetCodeUserId() {
    try {
      const saveUserId = Taro.getStorageSync("bind_user_id");
      this.setBindUserId(saveUserId);
      if (saveUserId) {
        return saveUserId;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  saveLeetCodeUserId(user_id: string) {
    try {
      Taro.setStorageSync("bind_user_id", user_id);
      this.setBindUserId(user_id)
      console.log("save => ", user_id);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  clear() {
    Taro.clearStorageSync();
  }

  @action.bound
  async setBindUserId(one: string) {
    this.bindUserId = one;
    if (one) {
      const result = await NetworkManager.getUserRank(one);
      if (result && result.length) {
        this.setBindUserInfo(result[0])
      }
    }
  }
  @action.bound
  setBindUserInfo(one: RankItemModel) {
    this.bindUserInfo = one;
  }
}

const dailyRankStore = new DailyRankStore();
export default dailyRankStore;

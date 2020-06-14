import { observable, action } from "mobx";
import Taro from "@tarojs/taro";

class DailyRankStore {
  @observable bindUserId: string | null = null;

  constructor() {
    this.bindUserId = this.getLeetCodeUserId();
  }

  getLeetCodeUserId() {
    try {
      const saveUserId = Taro.getStorageSync("bind_user_id");
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
  setBindUserId(one: string) {
    this.bindUserId = one;
  }
}

const dailyRankStore = new DailyRankStore();
export { dailyRankStore };

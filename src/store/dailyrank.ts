class DailyRankStore {
  getLeetCodeUserId() {
    try {
      const saveUserId = Taro.getStorageSync("user_id");
      if (saveUserId) {
        return saveUserId;
      }
    } catch (e) {
      return null;
    }
  }
}

const dailyRankStore = new DailyRankStore();
export { dailyRankStore };

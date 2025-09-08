import { defineStore } from "pinia";
const useLayoutSettingStore = defineStore("layoutSettingStore", {
  state() {
    return {
      isFold: false, //用于控制菜单折叠还是收起
      refresh: false,
    };
  },
  actions: {
    changeIsFold() {
      this.isFold = !this.isFold;
    },
  },
});
export default useLayoutSettingStore;

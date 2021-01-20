<template>
  <div class="home-index">
    <router-view class="view"></router-view>
    <yu-tabbar :pData="funcList"></yu-tabbar>
  </div>
</template>

<script>
import YuTabbar from "components/common/nav/YuTabbar";
export default {
  name: "HomeIndex",
  data() {
    return {
      funcList: [
        {
          name: "任务",
          defaultIcon: "orders-o",
          activeIcon: "column",
          dot: false,
          to: "/home/task",
        },
        {
          name: "应用",
          defaultIcon: "apps-o",
          activeIcon: "apps-o",
          dot: false,
          to: "/home/mainfuncs",
        },
        {
          name: "看板",
          defaultIcon: "chart-trending-o",
          activeIcon: "chart-trending-o",
          dot: false,
          to: "/home/data",
        },
        {
          name: "我的",
          defaultIcon: "manager-o",
          activeIcon: "manager",
          dot: false,
          to: "/home/profile",
        },
      ],
    };
  },
  created() {
    //请求权限数据,主要是判断是否有数据看板权限
  },
  components: {
    YuTabbar,
  },
  mounted() {},
};
</script>

<style scoped>
.view {
  width: 100vw;
  height: calc(100vh - 49px);
}
</style>

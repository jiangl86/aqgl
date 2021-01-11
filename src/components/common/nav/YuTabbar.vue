<template>
  <div class="yu-tabbar" ref="tabbar">
    <yu-tabbar-item
      v-for="(item, index) in pData"
      :key="item.name"
      :index="index"
      :name="item.name"
      :defaultIcon="item.defaultIcon"
      :activeIcon="item.activeIcon"
      :dot="item.dot"
      :to="item.to"
    ></yu-tabbar-item>
  </div>
</template>

<script>
import YuTabbarItem from "./YuTabbarItem";
export default {
  name: "YuTabbar",
  props: {
    pData: {
      type: Array,
      default: function () {
        return [
          {
            name: "任务",
            defaultIcon: "orders-o",
            activeIcon: "column",
            dot: true,
            to: "/test",
          },
          {
            name: "应用",
            defaultIcon: "apps-o",
            activeIcon: "apps",
            dot: false,
            to: "/funcs",
          },
          {
            name: "看板",
            defaultIcon: "chart-trending-o",
            activeIcon: "chart-trending",
            dot: false,
            to: "/data",
          },
          {
            name: "我的",
            defaultIcon: "user-o",
            activeIcon: "user",
            dot: false,
            to: "/me",
          },
        ];
      },
    },
    barColor: {
      type: String,
      default: "#406dfc",
    },
  },
  data() {
    return {};
  },
  components: {
    YuTabbarItem,
  },
  mounted() {
    this.$refs.tabbar.style.backgroundColor = this.barColor;
  },
};
</script>

<style scoped>
.yu-tabbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 49px;
}
</style>

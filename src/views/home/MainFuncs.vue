<template>
  <div class="home-mainfuncs">
    <yu-top-nav :showBack="false" name="安全应用">
      <div slot="func-actions" class="nav-funcs">
        <yu-icon
          :icon="require('assets/images/common/camera.png')"
          :size="24"
          class="icon"
        ></yu-icon>
        <yu-icon
          :icon="require('assets/images/common/scan.png')"
          :size="24"
        ></yu-icon></div
    ></yu-top-nav>
    <yu-scroll class="scroll" ref="scroll">
      <yu-grid :pData="commonFuncs" bgColor="#406dfc"> </yu-grid>
      <yu-grid :pData="funcList"> </yu-grid>
    </yu-scroll>
  </div>
</template>

<script>
import YuTopNav from "components/common/nav/YuTopNav";
import YuGrid from "components/common/nav/YuGrid";
import YuIcon from "components/common/basic/YuIcon";
import YuScroll from "components/common/scroll/YuScroll";

import { getMainFuncs } from "service/home/funcs";
export default {
  name: "MainFuncs",
  data() {
    return {
      funcList: null,
      commonFuncs: [
        {
          code: "ewm",
          text: "二维码",
          icon: require("assets/images/mainfunc/main_ewm.png"),
          to: "/ewm",
        },
        {
          code: "ssp",
          text: "随手拍",
          icon: require("assets/images/mainfunc/main_ssp.png"),
          to: "/danger/ssp",
        },
        {
          code: "yhpc",
          text: "隐患排查",
          icon: require("assets/images/mainfunc/main_app_yhpc.png"),
          to: "/danger/yhpc",
        },
        {
          code: "yhcz",
          text: "隐患处置",
          icon: require("assets/images/mainfunc/main_app_yhcz.png"),
          to: "/danger/yhcz",
        },
      ],
    };
  },
  components: {
    YuGrid,
    YuTopNav,
    YuIcon,
    YuScroll,
  },
  created() {
    //后面切换回promise写法
    this.funcList = getMainFuncs();
  },
  mounted() {
    this.$refs.scroll && this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.nav-funcs {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
}
.nav-funcs .icon {
  margin-right: 20px;
}

.scroll {
  margin-top: 44px;
  width: 100vw;
  height: calc(100vh - 93px);
  overflow: hidden;
}
</style>

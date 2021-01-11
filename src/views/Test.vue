<template>
  <div class="test">
    <yu-grid :pData="funcs" :space="10" :columnNum="3"></yu-grid>
    <yu-icon icon="refund-o" :size="24" dot></yu-icon>
    <yu-tabbar></yu-tabbar>
  </div>
</template>

<script>
import YuGrid from "components/common/nav/YuGrid";
import YuIcon from "components/common/basic/YuIcon";
import YuTabbar from "components/common/nav/YuTabbar";
export default {
  name: "Test",
  data() {
    return {
      funcs: [
        {
          code: "yhpc", //编码
          text: "隐患排查",
          icon: "coupon", //图标名称或图片链接
          badge: "5",
          to: "yhpc", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "gg", //编码
          text: "公告",
          icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
          dot: true,
        },
        {
          code: "yhpc", //编码
          text: "隐患排查",
          icon: "coupon", //图标名称或图片链接
          badge: "5",
          to: "yhpc", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "gg", //编码
          text: "公告",
          icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
          dot: true,
          url: "http://localhost:8080", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "yhpc", //编码
          text: "隐患排查治理",
          icon: "coupon", //图标名称或图片链接
          badge: "5",
          to: "yhpc", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
        {
          code: "gg", //编码
          text: "公告",
          icon: require("assets/images/mainfunc/main_gg.png"), //图标名称或图片链接
          dot: true,
          url: "http://localhost:8080", //点击后跳转的目标路由对象，同 vue-router 的 to 属性
        },
      ],
    };
  },
  components: {
    YuGrid,
    YuIcon,
    YuTabbar,
  },
};
</script>

<style scoped>
</style>

<template>
  <div class="test">
    <yu-grid :pData="funcs" :space="10" :columnNum="3"></yu-grid>
  </div>
</template>

<script>
import YuGrid from "components/common/nav/YuGrid";
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
  },
};
</script>

<style scoped>
</style>

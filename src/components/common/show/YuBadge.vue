<template>
  <div class="yu-badge">
    <van-badge :content="content" :color="color" :dot="dot" :max="max">
      <slot></slot>
    </van-badge>
  </div>
</template>

<script>
import { Badge as VanBadge } from "vant";
export default {
  name: "YuBadge",
  props: {
    content: "", //徽标内容
    color: {
      type: String,
      default: "#ee0a24", //	徽标背景颜色
    },
    dot: {
      type: Boolean,
      default: false, //是否展示为小红点
    },
    max: {
      type: Number,
      default: 99,
    },
  },
  data() {
    return {};
  },
  components: {
    VanBadge,
  },
};
</script>

<style scoped>
</style>

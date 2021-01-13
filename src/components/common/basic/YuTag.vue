<template>
  <div class="yu-tag">
    <van-tag
      :type="type"
      :size="size"
      :color="color"
      :plain="plain"
      :round="round"
      :textColor="textColor"
      >{{ content }}</van-tag
    >
  </div>
</template>

<script>
import { Tag as VanTag } from "vant";
export default {
  name: "YuTag",
  props: {
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "default", //类型，可选值为primary success danger warning
    },
    size: {
      type: String,
      default: "medium", //大小, 可选值为large medium
    },
    color: {
      type: String, //标签颜色
    },
    plain: {
      type: Boolean,
      default: false, //是否为空心样式
    },
    round: {
      type: Boolean,
      default: false, //是否为圆角样式
    },
    textColor: {
      type: String, //文本颜色
    },
  },
  data() {
    return {};
  },
  components: {
    VanTag,
  },
};
</script>

<style scoped>
</style>

<template>
  <div class="yu-image">
    <van-image
      :src="src"
      :width="width"
      :height="height"
      :radius="radius"
      :round="round"
      :fit="fit"
      :alt="alt"
      :show-loading="showLoading"
      :show-error="showError"
      :lazy-load="lazyLoad"
      @click="clickImage"
      @load="loadImage"
      @error="errorImage"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Lazyload } from "vant";

//Lazyload 是 Vue 指令，使用前需要对指令进行注册。
Vue.use(Lazyload);
export default {
  name: "YuImage",
  props: {
    src: {
      type: String,
      required: true, //
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    fit: {
      type: String,
      default: "fill", //图片填充模式contain（保持宽高缩放图片，使图片的长边能完全显示出来）,cover,fill,none(原始尺寸),scale-down（取none或contain中较小的一个）
    },
    alt: {
      type: String, //替代文本
    },
    radius: {
      type: String, //圆角大小
    },
    round: {
      type: Boolean,
      default: false, //是否显示为圆形
    },
    lazyLoad: {
      type: Boolean,
      default: true, //是否开启图片懒加载
    },
    showError: {
      type: Boolean,
      default: false, //是否展示图片加载失败提示
    },
    showLoading: {
      type: Boolean,
      default: true, //是否展示图片加载中提示
    },
  },
  data() {
    return {};
  },
  components: {
    VanImage,
  },
  methods: {
    clickImage(e) {
      this.$emit("clickImage", e);
    },
    loadImage() {
      this.$emit("loadImage");
    },
    errorImage() {
      this.$emit("errorImage");
    },
  },
};
</script>

<style scoped>
</style>

<template>
  <div class="yu-popup">
    <van-popup
      v-model="isShow"
      :overlay="overlay"
      :position="position"
      :close-on-click-overlay="overlayClickClose"
      :round="round"
      :duration="duration"
      :lock-scroll="lockScroll"
      @click="clickPopup"
      @click-overlay="clickPopupOverlay"
      @open="openPopup"
      @close="closePopup"
    >
      <slot>aaaa</slot>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
export default {
  name: "YuPopup",
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true, //是否显示弹出层
    },
    overlay: {
      type: Boolean,
      default: true, //是否显示遮罩层
    },
    position: {
      type: String,
      default: "bottom", //弹出位置，可选值为 top bottom right left center
    },
    overlayClickClose: {
      type: Boolean,
      default: false, //是否在点击遮罩层后关闭
    },
    round: {
      type: Boolean,
      default: false, //是否显示圆角
    },
    duration: {
      type: Number,
      default: 0.3, //动画时长，单位秒
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  components: {
    [Popup.name]: Popup,
  },
  methods: {
    clickPopup(e) {
      this.$emit("clickPopup", e);
    },
    clickPopupOverlay() {
      this.$emit("clickPopupOverlay");
    },
    openPopup() {
      this.$emit("openPopup");
    },
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
</style>

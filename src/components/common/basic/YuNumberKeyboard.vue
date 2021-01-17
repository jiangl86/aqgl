<template>
  <div class="yu-number-keyboard">
    <van-number-keyboard
      :show="show"
      :title="title"
      :maxlength="maxlength"
      :z-index="zIndex"
      :close-button-text="closeButtonText"
      :random-key-order="randomKeyOrder"
      :extra-key="extraKey"
      @input="inputNumber"
      @delete="deleteNumber"
      @blur="blurKeyboard"
    ></van-number-keyboard>
  </div>
</template>

<script>
import { NumberKeyboard as VanNumberKeyboard } from "vant";
export default {
  name: "YuNumberKeyboard",
  props: {
    type: {
      type: String,
      default: "number", //数字键盘类型，包含number 和IDCard两种，number为全数字，id除数字外包含X，用于身份证输入
    },
    initialValue: "", //初始值
    show: {
      type: Boolean, //是否显示键盘
      default: false,
    },
    title: {
      type: String, //键盘标题
    },
    maxlength: {
      type: Number, //输入值最大长度
    },
    zIndex: {
      type: Number,
      default: 100, //键盘 z-index 层级
    },
    closeButtonText: {
      type: String,
      default: "完成", //关闭按钮文字，空则不展示
    },
    randomKeyOrder: {
      type: Boolean,
      default: false, //是否将通过随机顺序展示按键
    },
  },
  data() {
    return {
      value: this.initialValue == null ? "" : this.initialValue.toString(),
    };
  },
  computed: {
    extraKey() {
      return this.type == "IDCard" ? "X" : null;
    },
  },
  components: {
    VanNumberKeyboard,
  },
  methods: {
    //点击按键时触发，number为点击的值
    inputNumber(number) {
      if (number != null) {
        this.value += number;
        this.$emit("inputNumber", this.value);
      } else {
        this.$emit("blurKeyboard");
      }
    },
    //点击删除按钮时触发
    deleteNumber() {
      if (this.value != "") {
        this.value = this.value.substring(0, this.value.length - 1);
      }
      this.$emit("deleteNumber", this.value);
    },
    //点击关闭按钮或非键盘区域时触发
    blurKeyboard() {
      this.$emit("blurKeyboard");
    },
  },
};
</script>

<style scoped>
</style>

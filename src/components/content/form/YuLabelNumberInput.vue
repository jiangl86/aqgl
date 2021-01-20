<template>
  <div class="yu-label-number-input">
    <label @click="clickLabel">{{ name }}</label>
    <yu-input
      :placeholder="placeholder"
      :initialValue="value"
      clearable
      readonly
      @touchstart.native.stop="focus"
      class="yu-input"
      ref="input"
    ></yu-input>

    <yu-number-keyboard
      :initialValue="value"
      :type="type"
      :show="showKeyboard && !readonly"
      :zIndex="zIndex"
      :randomKeyOrder="randomKeyOrder"
      @inputNumber="inputNumber"
      @deleteNumber="deleteNumber"
      @blurKeyboard="blurKeyboard"
    ></yu-number-keyboard>
  </div>
</template>

<script>
import YuInput from "components/common/basic/YuInput";
import YuNumberKeyboard from "components/common/basic/YuNumberKeyboard";
export default {
  name: "YuLabelNumberInput",
  props: {
    name: {
      type: String, //标签名称
      required: true,
    },
    type: {
      type: String,
      default: "number", //数字键盘类型，包含number 和IDCard两种，number为全数字，id除数字外包含X，用于身份证输入
    },
    initialValue: "",
    placeholder: {
      type: String,
      default: "请输入",
    },
    maxlength: {
      type: Number,
      default: 100,
    },
    zIndex: {
      type: Number,
      default: 100, //键盘 z-index 层级
    },
    randomKeyOrder: {
      type: Boolean,
      default: false, //是否将通过随机顺序展示按键
    },
    readonly: {
      type: Boolean,
      default: false, //是否只读
    },
  },
  data() {
    return {
      value: this.initialValue,
      showKeyboard: false,
    };
  },
  components: {
    YuInput,
    YuNumberKeyboard,
  },
  methods: {
    //输入字符
    inputNumber(value) {
      this.value = value;
    },
    //删除字符
    deleteNumber(value) {
      this.value = value;
    },
    //隐藏输入键盘
    blurKeyboard() {
      this.showKeyboard = false;
    },
    //输入框获得焦点时
    focus() {
      if (!this.readonly) {
        this.showKeyboard = true;
      }
    },

    //点击标签使对应的输入框激活
    clickLabel() {
      this.focus();
    },
  },
};
</script>

<style scoped>
.yu-label-number-input {
  display: flex;
  flex-direction: var(--showDirection);
  padding-bottom: 5px;
  background-color: var(--form-field-color);
  /* width: 100%; */
}
label {
  width: var(--form-label-width);
  text-align: left;
  padding-left: 10px;
  font-size: var(--font-size-sm);
  color: var(--form-label-color);
  align-self: flex-start;
  white-space: nowrap;
  overflow: hidden;
}
.yu-input {
  flex: 1;
  padding: 0 10px;
}
</style>

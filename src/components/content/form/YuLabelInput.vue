<template>
  <div class="label-input">
    <label @click="clickLabel"><span v-if="required">*</span>{{ name }}</label>
    <yu-input
      :placeholder="placeholder"
      :type="type"
      :initialValue="initialValue"
      :maxlength="maxlength"
      :clearable="clearable"
      :readonly="readonly"
      :disabled="disabled"
      @focus="focus"
      @blur="blur"
      @change="change"
      @input="input"
      @clear="clear"
      class="yu-input"
      ref="input"
    ></yu-input>
  </div>
</template>

<script>
import YuInput from "components/common/basic/YuInput";
export default {
  name: "YuLabelInput",
  props: {
    name: {
      type: String, //标签名称
      required: true,
    },
    required: {
      type: Boolean, //是否必填项，若为真会标识必填项标识
      default: false,
    },
    placeholder: "",
    type: {
      type: String,
      default: "text", //支持text/number/password/date
    },
    maxlength: {
      type: Number,
      default: 100,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initialValue: "",
  },
  data() {
    return {
      value: this.initialValue,
    };
  },
  components: {
    YuInput,
  },
  methods: {
    //输入框聚焦后触发此事件，如果禁用状态，则不触发
    focus() {
      this.$emit("focus");
    },
    //输入框失焦后触发此事件
    blur() {
      this.$emit("blur");
    },
    //绑定值改变且输入框失去焦点后触发
    change() {
      this.$emit("change", this.value);
    },
    //绑定值变化时触发
    input(value) {
      this.value = value;
      this.$emit("input", value);
    },

    //清空数据时触发
    clear() {
      this.$emit("clear");
    },

    //点击标签使对应的输入框激活
    clickLabel() {
      this.$refs.input.$el.children[0].children[0].focus();
    },
  },
};
</script>

<style scoped>
.label-input {
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
label span {
  color: red;
  margin-right: 3px;
}
.yu-input {
  flex: 1;
  padding: 0 10px;
}
</style>

<template>
  <div class="input-with-label">
    <label @click="clickLabel">{{ name }}</label>
    <za-input
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
      class="za-input"
      ref="input"
    ></za-input>
  </div>
</template>

<script>
import ZaInput from "components/common/basic/ZaInput";
export default {
  name: "InputWithLabel",
  props: {
    name: {
      type: String, //标签名称
      required: true,
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
    ZaInput,
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
      this.$emit("change");
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
.input-with-label {
  display: flex;
  flex-direction: row;
  /* width: 100%; */
}
label {
  font-size: var(--normalSize);
}
</style>

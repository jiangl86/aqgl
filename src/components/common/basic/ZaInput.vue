<template>
  <div class="za-input">
    <cube-input
      :placeholder="placeholder"
      :type="type"
      v-model="value"
      :maxlength="maxlength"
      :clearable="clearable"
      :readonly="readonly"
      :disabled="disabled"
      @focus="focus"
      @blur="blur"
      @change="change"
      @input="input"
    ></cube-input>
  </div>
</template>

<script>
export default {
  name: "ZaInput",
  props: {
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
  components: {},
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
    input() {
      if (this.value == "") {
        this.clear();
      } else {
        this.$emit("input");
      }
    },

    //清空数据时触发
    clear() {
      this.$emit("clear");
    },
  },
};
</script>

<style scoped>
</style>

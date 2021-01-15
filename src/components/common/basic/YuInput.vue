<template>
  <div class="yu-input">
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
      ref="input"
    ></cube-input>
  </div>
</template>

<script>
export default {
  name: "YuInput",
  props: {
    placeholder: {
      type: String,
      default: "请输入",
    },
    type: {
      type: String,
      default: "text", //支持text/number/password/date
    },
    height: {
      type: Number,
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
  mounted() {
    if (this.height) {
      this.$refs.input.$el.querySelector("input").style.height =
        this.height + "px";
    }
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
      if (this.value == "") {
        this.clear();
      } else {
        this.$emit("input", value);
      }
    },

    //清空数据时触发
    clear() {
      this.$emit("clear");
    },
  },
};
</script>

<style>
.cube-input-field {
  font-size: var(--font-size-sm);
}
</style>

<template>
  <div class="label-textarea">
    <label @click="clickLabel">{{ name }}</label>
    <yu-textarea
      :placeholder="placeholder"
      :initialValue="initialValue"
      :maxlength="maxlength"
      :showReamin="showReamin"
      :autoExpand="autoExpand"
      :readonly="readonly"
      :disabled="disabled"
      @focus="focus"
      @blur="blur"
      @input="input"
      ref="textarea"
      class="textarea"
    ></yu-textarea>
  </div>
</template>

<script>
import YuTextarea from "components/common/basic/YuTextarea";
export default {
  name: "YuLabelTextarea",
  props: {
    name: {
      type: String, //标签名称
      required: true,
    },
    placeholder: "请输入",
    maxlength: {
      type: Number,
      default: 500,
    },
    showReamin: {
      type: Boolean,
      default: false,
    },
    autoExpand: {
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
    return {};
  },
  components: {
    YuTextarea,
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
    //绑定值变化时触发
    input(value) {
      this.value = value;
      this.$emit("input", value);
    },

    //点击标签时，使对应输入框获得焦点
    clickLabel() {
      this.$refs.textarea.activate();
    },
  },
};
</script>

<style scoped>
.label-textarea {
  display: flex;
  flex-direction: var(--showDirection);
  padding-bottom: 5px;
  background-color: white;
}
label {
  width: 18%;
  text-align: left;
  padding-left: 10px;
  font-size: var(--font-size-sm);
  align-self: flex-start;
  white-space: nowrap;
  overflow: hidden;
}
.textarea {
  flex: 1;
  padding: 0 10px;
}
</style>

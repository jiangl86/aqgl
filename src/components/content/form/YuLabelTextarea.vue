<template>
  <div class="label-textarea">
    <label @click="clickLabel">{{ name }}</label>
    <yu-icon
      v-if="showFold"
      :icon="foldIcon"
      class="fold"
      @click.native="foldClick"
    ></yu-icon>
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
      v-show="showContent"
    ></yu-textarea>
  </div>
</template>

<script>
import YuTextarea from "components/common/basic/YuTextarea";
import YuIcon from "components/common/basic/YuIcon";
export default {
  name: "YuLabelTextarea",
  props: {
    showFold: {
      type: Boolean,
      default: true, //是否显示收起隐藏按钮，仅在查看时显示
    },
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
    return {
      foldIcon: "arrow-up",
      showContent: true,
      value: this.initialValue,
    };
  },
  components: {
    YuTextarea,
    YuIcon,
  },
  mounted() {
    if (this.showFold && this.$refs.textarea.initialHeight > 100) {
      this.foldClick();
    }
  },
  methods: {
    //点击收起隐藏
    foldClick() {
      this.showContent = !this.showContent;
      this.foldIcon = this.showContent ? "arrow-up" : "arrow-down";
    },

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
  background-color: var(--form-field-color);
  position: relative;
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

.fold {
  position: absolute;
  padding: 8px 10px;
  right: 0px;
  top: 0px;
}
.textarea {
  flex: 1;
  padding: 0 10px;
}
</style>

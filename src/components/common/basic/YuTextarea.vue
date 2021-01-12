<template>
  <div class="yu-textarea">
    <cube-textarea
      :placeholder="placeholder"
      v-model="value"
      :maxlength="maxlength"
      :indicator="indicator"
      :autoExpand="autoExpand"
      :readonly="readonly"
      :disabled="disabled"
      @focus="focus"
      @blur="blur"
      @input="input"
      ref="textarea"
    ></cube-textarea>
  </div>
</template>

<script>
export default {
  name: "YuTextarea",
  props: {
    placeholder: {
      type: String,
      default: "请输入",
    },
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
      value: this.initialValue,
      indicator: { remain: this.showReamin },
      initialHeight: 0, //组件初始高度
      initialRows: 1, //初始行数
      numPerRow: 0, //每行可展示字符个数
      rowHeight: 0, //每行行高
    };
  },
  components: {},
  methods: {
    //激活，使输入框获取焦点
    activate() {
      this.$refs.textarea.focus();
    },

    //设置value值
    setValue(value) {
      this.value = value;
    },
    // c初始化每行能显示的字符数量
    initNumOfRow() {
      let width = window
        .getComputedStyle(this.$refs.textarea.$el)
        .width.replace("px", "");
      const styles = getComputedStyle(document.querySelector(":root"));
      let fontSize = String(styles.getPropertyValue("--font-size-sm"))
        .trim()
        .replace("px", "");
      this.numPerRow = Math.floor((width - 20) / fontSize);
      this.rowHeight = Math.ceil(fontSize * 1.4);
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
      //调整控件高度
      if (this.autoExpand) {
        let height = this.$refs.textarea.$el.children[0].scrollHeight;
        let rows =
          Math.ceil(this.value.length / this.numPerRow) +
          this.value.split("/n").length -
          1;
        if (rows >= 1 && this.rowHeight != 0) {
          height =
            this.initialHeight + (rows - this.initialRows) * this.rowHeight;
          this.$refs.textarea.$el.style.height = height + "px";
        }
        // console.log(this.numPerRow);
        // console.log(rows);
        // console.log(this.initialHeight);
        // console.log(this.rowHeight);
        // console.log(height);
      }
      this.$emit("input", value);
    },
  },
  mounted() {
    this.initialHeight = this.$refs.textarea.$el.children[0].scrollHeight;
    this.initNumOfRow();
    //根据初始值设置组件初始高度
    if (this.initialValue) {
      this.$refs.textarea.$el.style.height = this.initialHeight + "px";
      this.initialRows =
        Math.ceil(this.initialValue.length / this.numPerRow) +
        this.value.split("/n").length -
        1;
    }
  },
};
</script>

<style>
.cube-textarea_expanded {
  height: 40px;
}
.cube-textarea-wrapper {
  font-size: var(--normalSize);
}
</style>

<template>
  <div class="za-textarea">
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
    <textarea name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
export default {
  name: "ZaTextarea",
  props: {
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
      default: false,
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
      initialHeight: 0,
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
    //绑定值变化时触发
    input() {
      let height = this.$refs.textarea.$el.children[0].scrollHeight;
      console.log(height);
      //   console.log(this.$refs.textarea.$el.style.height);
      console.log(this.initialHeight + "sdsd");
      if (height > this.initialHeight) {
        this.$refs.textarea.$el.style.height = height + "px";
      }

      this.$emit("input");
    },
  },
  mounted() {
    this.initialHeight = this.$refs.textarea.$el.children[0].scrollHeight;
  },
};
</script>

<style scoped>
</style>

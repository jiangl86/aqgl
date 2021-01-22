<template>
  <div class="yu-radio-group">
    <cube-radio-group
      v-model="selected"
      :options="options"
      :horizontal="horizontal"
      :colNum="colNum"
      :hollowStyle="hollowStyle"
      @input="input"
    />
  </div>
</template>

<script>
export default {
  name: "YuRadioGroup",
  props: {
    options: {
      type: Array, //选项数组,每一选项信息：选项,如果 options 中的项为字符串，此时默认 label 和 value 的值都为该字符串的值。如果为object,则可配置label（复选框显示文字），value复选框的值，disabled
      required: true,
    },
    initialSelected: {
      type: String,
    },
    horizontal: {
      type: Boolean,
      default: true, //是否水平排列
    },
    colNum: {
      type: Number,
      default: 2, //每行显示个数
    },
    hollowStyle: {
      type: Boolean,
      default: false, //是否镂空，默认否
    },
  },
  data() {
    return {
      selected: this.initialSelected,
    };
  },
  components: {},
  methods: {
    input(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style >
.cube-radio-wrap {
  text-align: left !important;
  justify-content: flex-start !important;
}
.cube-radio-group[data-horz="true"]::after,
.cube-radio-group[data-col="true"]::after {
  border: none !important;
}
</style>

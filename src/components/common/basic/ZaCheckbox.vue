<template>
  <div class="za-checkbox">
    <cube-checkbox
      v-model="value"
      :option="option"
      :position="position"
      :shape="shape"
      :hollow-style="hollowStyle"
      @input="input"
    >
    </cube-checkbox>
  </div>
</template>

<script>
export default {
  name: "ZaCheckbox",
  props: {
    option: "", //选项,如果 options 中的项为字符串，此时默认 label 和 value 的值都为该字符串的值。如果为object,则可配置label（复选框显示文字），value复选框的值，disabled
    initialValue: "", //默认选中状态
    position: {
      type: String,
      default: "left", //图标位置，left/right
    },
    shape: {
      type: String,
      default: "square", //图标形状，circel/square
    },
    hollowStyle: {
      type: Boolean,
      default: false, //图标形状是否镂空，默认否
    },
  },
  data() {
    return {
      value: this.initialValue,
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

<style scoped>
/* 若需要影响颜色设置，需要删除scoped */
.cube-checkbox_checked .cube-checkbox-ui i {
  color: #fc9153;
}
</style>

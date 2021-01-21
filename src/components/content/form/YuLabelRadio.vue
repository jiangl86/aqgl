<template>
  <div class="label-radio">
    <label>{{ name }}</label>
    <yu-radio-group
      :options="options"
      :initialSelected="initialSelected"
      :horizontal="horizontal"
      :colNum="colNum"
      :hollowStyle="hollowStyle"
      class="yu-radio-group"
      @input="input"
    ></yu-radio-group>
  </div>
</template>

<script>
import YuRadioGroup from "components/common/basic/YuRadioGroup";
export default {
  name: "YuLabelRadio",
  props: {
    name: {
      type: String, //标签名称
      required: true,
    },
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
      default: true, //是否镂空，默认否
    },
  },
  data() {
    return {
      value: "", //选中的结果值
    };
  },
  components: {
    YuRadioGroup,
  },
  methods: {
    //选的结果发生变化时，触发
    input(value) {
      this.value = value;
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.label-radio {
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
.yu-radio-group {
  flex: 1;
  padding: 0 10px;
  text-align: left;
}
</style>

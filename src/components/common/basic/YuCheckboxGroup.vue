<template>
  <div class="yu-checkbox-group">
    <cube-checkbox-group
      v-model="selected"
      :options="options"
      :horizontal="horizontal"
      :colNum="colNum"
      :shape="shape"
      :hollowStyle="hollowStyle"
      :min="min"
      @checked="checked"
      @cancel-checked="cancelChecked"
      @input="input"
    />
  </div>
</template>

<script>
export default {
  name: "YuCheckboxGroup",
  props: {
    options: {
      type: Array, //选项数组,每一选项信息：选项,如果 options 中的项为字符串，此时默认 label 和 value 的值都为该字符串的值。如果为object,则可配置label（复选框显示文字），value复选框的值，disabled
      required: true,
    },
    initialSelected: {
      type: Array,
      required: true,
    },
    horizontal: {
      type: Boolean,
      default: true, //是否水平排列
    },
    colNum: {
      type: Number,
      default: 2, //每行显示个数
    },
    shape: {
      type: String,
      default: "square", //图标形状，circle/square
    },
    hollowStyle: {
      type: Boolean,
      default: false, //是否镂空，默认否
    },
    min: {
      type: Number,
      default: 0, //最小选择个数
    },
  },
  data() {
    return {
      selected: this.initialSelected,
    };
  },
  components: {},
  methods: {
    //选中某个选项时触发，value为选中选项的值
    checked(value) {
      this.$emit("checked", value);
    },
    //取消选中某个选项时触发，value为取消选项的值
    cancelChecked(value) {
      this.$emit("cancelChecked", value);
    },
    //当绑定值变化时触发
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

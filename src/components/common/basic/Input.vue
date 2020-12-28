<template>
  <div class="input">
    <el-input
      :placeholder="placeholder"
      v-model="value"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :clearable="clearable"
      @clear="clear"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    placeholder: "",
    clearable: {
      type: Boolean,
      default: true,
    },
    prefixIcon: "", //前置图标，为空时不传
    suffixIcon: "", //后置图标，为空时不传
    initialValue: "",
  },
  data() {
    return {
      value: this.initialValue,
    };
  },
  components: {},
  methods: {
    clear() {
      this.$emit("clear");
    },
  },
};
</script>

<style scoped>
</style>

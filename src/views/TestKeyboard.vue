<template>
  <div class="test">
    <yu-label-number-input
      name="隐患数量"
      type="number"
      :initialValue="2323"
    ></yu-label-number-input>

    <yu-label-uploader name="隐患照片" disabled></yu-label-uploader>
  </div>
</template>

<script>
import YuLabelNumberInput from "components/content/form/YuLabelNumberInput";
import YuLabelUploader from "components/content/form/YuLabelUploader";
export default {
  name: "aaa",
  data() {
    return {
      show: false,
      value: "",
    };
  },
  components: {
    YuLabelNumberInput,
    YuLabelUploader,
  },
};
</script>

<style scoped>
.test {
  display: flex;
  height: 100vw;
  flex-direction: column;
  justify-content: center;
}
</style>

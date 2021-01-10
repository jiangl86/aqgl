<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <YuInputWithLabel name="企业名称"></YuInputWithLabel>
    <YuInputWithLabel name="地址"></YuInputWithLabel>
    <YuTextareaWithLabel name="经营范围s颠三倒四多"></YuTextareaWithLabel>
    <YuTextareaWithLabel name="备注"></YuTextareaWithLabel>
    <!-- <yu-image
      v-for="i in 100"
      :key="i"
      width="100px"
      height="100px"
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fahlxw.com%2Fupload%2F2014-4%2F2014041545936693.jpg&refer=http%3A%2F%2Fahlxw.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612678979&t=612c2d3c952ab6bbabda2d5ded1b52a7"
    ></yu-image> -->
    <yu-time-picker :minHour="8" :minuteInterval="10"></yu-time-picker>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import YuTextareaWithLabel from "components/content/form/YuLabelTextarea";

import YuInputWithLabel from "components/content/form/YuLabelInput";

import YuImage from "components/common/basic/YuImage";

import YuTimePicker from "components/common/popup/YuTimePicker";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    HelloWorld,
    YuTextareaWithLabel,
    YuInputWithLabel,
    YuImage,
    YuTimePicker,
  },
  mounted() {
    this.$loading.showLoading();
    setTimeout(() => {
      this.$loading.hideLoading();
    }, 2000);
  },
};
</script>
<style  scoped>
.input-with-label,
.textarea-with-label {
  margin-bottom: 10px;
}
</style>
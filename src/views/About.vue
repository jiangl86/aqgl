<template>
  <div class="about">
    <!-- <Yu-tree
      name="部门选择"
      :initialSelect="selected"
      chainSelect
      showSearch
      showSelected
      backTip
      selectAssert
    ></Yu-tree> -->
    <!-- <Yu-input prefixIcon="el-icon-date"></Yu-input> -->
    <!-- <YuOptionPicker
      name="风险等级"
      :pData="risks"
      :initialSelect="initialRisks"
      multiSelect
      :show="aa"
      @cancel="cancelSelect"
    ></YuOptionPicker> -->
    <!-- <Yu-textarea></Yu-textarea> -->
    <!-- <input-with-label name="企业名称"></input-with-label>
    <input-with-label name="企业名称"></input-with-label>
    <Yu-checkbox :option="option" initialValue="1"></Yu-checkbox>
    <YuCheckboxGroup
      :options="options"
      :initialSelected="initialSelected"
    ></YuCheckboxGroup>
    <YuRadioGroup :options="options" initialSelected=""></YuRadioGroup>
    <YuDatePicker ref="aaa" type="datetime"></YuDatePicker>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期">
      </el-date-picker>
    </div> -->

    <!-- <cube-upload
      action=""
      :simultaneous-uploads="1"
      @files-added="filesAdded"
    /> -->
    <!-- <YuImageBrowse></YuImageBrowse> -->
    <div @click="click">显示图片</div>
    <!-- <YuDatePicker
      ref="aaa"
      type="range"
      :defaultDate="defaultDate"
      readonly
    ></YuDatePicker> -->

    <!-- <div class="box">
      <div class="box1" @click="divClick">
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
          <li>444</li>
          <li>555</li>
          <li>666</li>
        </ul>
      </div>
      <div class="box2"></div>
    </div> -->
    <yu-badge :content="6">
      <yu-uploader @afterRead="read"></yu-uploader>
    </yu-badge>
  </div>
</template>

<script>
// @ is an alias to /src
import YuTree from "components/common/basic/YuTree";
import YuInput from "components/common/basic/YuInput";
import YuTextarea from "components/common/basic/YuTextarea";
import YuOptionPicker from "components/common/popup/YuOptionPicker";

import YuCheckbox from "components/common/basic/YuCheckbox";
import YuCheckboxGroup from "components/common/basic/YuCheckboxGroup";
import YuRadioGroup from "components/common/basic/YuRadioGroup";

import YuDatePicker from "components/common/popup/YuDatePicker";

import InputWithLabel from "components/content/form/YuLabelInput";

import YuImageBrowse from "components/common/popup/imagebrowse/YuImageBrowse";

import YuScroll from "components/common/scroll/YuScroll";

import YuUploader from "components/common/basic/YuUploader";

import YuBadge from "components/common/show/YuBadge";

export default {
  name: "Home",
  data() {
    return {
      fileList: [],
      selected: [
        // {
        //   name: "二级节点11",
        //   id: 11,
        // },
        {
          name: "四级节点5125",
          id: 5125,
        },
      ],
      risks: [
        {
          name: "重大风险",
          id: 1,
        },
        {
          name: "较大风险",
          id: 2,
        },
        {
          name: "一般风险",
          id: 3,
        },
        {
          name: "较小风险",
          id: 4,
        },
      ],
      initialRisks: [
        {
          name: "较大风险",
          id: 2,
        },
        {
          name: "一般风险",
          id: 3,
        },
      ],
      option: {
        label: "重大风险",
        value: "1",
      },
      options: [
        {
          label: "重大风险",
          value: "1",
        },
        {
          label: "较大风险",
          value: "2",
        },
        {
          label: "一般风险",
          value: "3",
        },
        {
          label: "较小风险",
          value: "4",
        },
      ],
      initialSelected: ["1"],
      checkList: ["1"],
      value1: "",
      imgs: [
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3647099666,2758135680&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3353587742,1540290353&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2268108947,1773100229&fm=26&gp=0.jpg",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn4.hbimg.cn%2Fstore%2Fwm%2Fbigfiles%2F200944%2F887EDABAE8C49FB48AF5D5C14AAF86.jpg&refer=http%3A%2F%2Fcdn4.hbimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612497493&t=aa157ba8360c2c284af4dac12a92fa4f",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3353587742,1540290353&fm=26&gp=0.jpg",
        "https://tenfei04.cfp.cn/creative/vcg/veer/800water/veer-329869328.jpg",
        "https://tenfei01.cfp.cn/creative/vcg/veer/800water/veer-310654525.jpg",
      ],
      aa: true,
      defaultDate: [],
    };
  },
  components: {
    YuTree,
    YuInput,
    YuOptionPicker,
    YuTextarea,
    InputWithLabel,
    YuCheckbox,
    YuCheckboxGroup,
    YuRadioGroup,
    YuDatePicker,
    YuImageBrowse,
    YuScroll,
    YuUploader,
    YuBadge,
  },
  methods: {
    read(file, detail) {
      console.log("sss");
      console.log(detail);
    },
    click() {
      // this.$imageBrowse.showImg(this.imgs, 4);
      console.log("aa");
      // this.aa = true;
      let options = { type: "loading", message: "提示文案" };
      // this.$toast(options);
      // this.$toast.success("aaaa");
      this.$dialog
        .confirm({
          title: "提示",
          message: "dsdslsdjlsdjlsdjls",
        })
        .then(() => {})
        .catch(() => {});
      this.$refs.aaa.showDatePicker();
      let date = new Date();
      date.setDate(date.getDate() + 100);
      this.$refs.aaa.scrollToDate(date);
    },
    dblclick() {
      alert("sss");
    },
    cancelSelect() {
      this.aa = false;
    },
    divClick() {
      console.log("sssd");
    },
  },
  created() {
    // this.$refs.aaa.focus();
    let today = new Date();
    today.setDate(today.getDate() + 3);
    this.defaultDate.push(today);
    let sec = new Date();
    this.defaultDate.push(sec);
  },
  mounted() {
    let A = [1, 23, 3, 5];
    for (let i in A) {
      console.log(i);
    }
  },
};
</script>
<style scoped>
.scroll {
  width: 100vw;
  height: 300px;
  overflow: hidden;
}
li {
  line-height: 50px;
}
.box {
  background-color: white;
  position: relative;
  height: 300px;
}
.box2 {
  position: absolute;
  left: 0;
  top: 0;
  height: 300px;
  width: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 1) 0px,
      rgba(255, 255, 255, 0) 120px
    ),
    linear-gradient(rgba(255, 255, 255, 0) 180px, rgba(255, 255, 255, 1) 300px);
  /* background-color: rgba(20, 232, 32, 0.5); */
  background-position: top, bottom;
  pointer-events: none;
}

.scroll {
  width: 100%;
  height: 150px;
  overflow: hidden;
}
ul {
  width: 100%;
  height: 2000px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>

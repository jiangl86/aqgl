<template>
  <div class="about">
    <!-- <za-tree
      name="部门选择"
      :initialSelect="selected"
      chainSelect
      showSearch
      showSelected
      backTip
      selectAssert
    ></za-tree> -->
    <za-input prefixIcon="el-icon-date"></za-input>
    <!-- <ZaOptionPicker
      name="风险等级"
      :pData="risks"
      :initialSelect="initialRisks"
      multiSelect
    ></ZaOptionPicker> -->
    <za-textarea></za-textarea>
    <input-with-label label="企业名称"></input-with-label>
  </div>
</template>

<script>
// @ is an alias to /src
import ZaTree from "components/common/basic/ZaTree";
import ZaInput from "components/common/basic/ZaInput";
import ZaTextarea from "components/common/basic/ZaTextarea";
import ZaOptionPicker from "components/common/popup/ZaOptionPicker";

import InputWithLabel from "components/content/form/InputWithLabel";

export default {
  name: "Home",
  data() {
    return {
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
    };
  },
  components: {
    ZaTree,
    ZaInput,
    ZaOptionPicker,
    ZaTextarea,
    InputWithLabel,
  },
  methods: {},
  mounted() {},
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
</style>

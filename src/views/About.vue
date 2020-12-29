<template>
  <div class="about">
    <za-tree
      name="部门选择"
      :initialSelect="selected"
      :multiSelect="true"
      chainSelect
      showSearch
      showSelected
      backTip
    ></za-tree>
    <!-- <za-input prefixIcon="el-icon-date"></za-input> -->
  </div>
</template>

<script>
// @ is an alias to /src
import ZaTree from "components/common/basic/Tree";
import ZaInput from "components/common/basic/Input";

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
    };
  },
  components: {
    ZaTree,
    ZaInput,
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

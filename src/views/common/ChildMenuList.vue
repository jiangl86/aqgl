<template>
  <div class="child-menu-list">
    <yu-menu-list :pData="childMenuList" :navName="funcName"></yu-menu-list>
  </div>
</template>

<script>
import YuMenuList from "components/common/nav/YuMenuList";

import { getChildFuncs, getFunName } from "service/home/funcs";
export default {
  name: "ChildMenuList",
  data() {
    return {
      funcName: "",
      childMenuList: [],
    };
  },
  components: {
    YuMenuList,
  },
  created() {
    console.log("aa");
    this.initData();
  },
  watch: {
    //动态路由不会重新刷新生命周期函数，所以需要监测路由变化
    $route(to, from) {
      this.initData();
    },
  },

  methods: {
    initData() {
      this.funcName = getFunName(this.$route.params.code);
      this.childMenuList = getChildFuncs(this.$route.params.code);
    },
  },
};
</script>

<style scoped>
</style>

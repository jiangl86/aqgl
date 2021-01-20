<template>
  <div class="aqgg-list">
    <yu-list
      placeholder="公告"
      :pList="aqggList"
      showNav
      navName="公告"
      showSearch
      @pullingUp="loadMore"
      @pullingDown="refreshData"
      @clickItem="clickItem"
      @searchClick="search"
    ></yu-list>
  </div>
</template>

<script>
import YuList from "components/content/show/YuList";

import { getAqggList } from "service/aqgg";
export default {
  name: "AqggList",
  data() {
    return {
      aqggList: [],
      page: 1,
    };
  },
  created() {
    //请求公告列表
    this.aqggList = getAqggList({ page: this.page++ });
  },
  components: {
    YuList,
  },
  methods: {
    loadMore() {
      this.aqggList.push(...getAqggList({ page: this.page++ }));
    },
    refreshData() {
      this.aqggList = getAqggList({ page: 1 });
      this.page = 1;
    },
    clickItem(item) {
      this.$router.push({ name: "AqggDetail", query: { ggId: item.id } });
    },
    search(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
</style>

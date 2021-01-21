<template>
  <div class="aqgg-list">
    <yu-list
      placeholder="公告"
      :pList="aqggList"
      :isLastPage="isLastPage"
      showNav
      showState
      navName="公告"
      showSearch
      showLongTouchPopup
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
import { getCorps } from "network/test";
export default {
  name: "AqggList",
  data() {
    return {
      aqggList: [],
      page: 1,
      isLastPage: false,
    };
  },
  created() {
    //请求公告列表
    this.aqggList = getAqggList({ page: this.page++ });
    getCorps();
  },
  components: {
    YuList,
  },
  methods: {
    loadMore() {
      console.log("loadmore");
      if (!this.isLastPage) {
        this.aqggList.push(...getAqggList({ page: this.page++ }));
      }
      //如果是最后一页，不再请求新数据
      if (this.page == 8) {
        this.isLastPage = true;
      }
    },
    refreshData() {
      this.page = 1;
      this.aqggList = getAqggList({ page: this.page++ });

      //如果不只有一页数据，刷新isLastPage
      this.isLastPage = false;
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

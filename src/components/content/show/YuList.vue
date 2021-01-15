<template>
  <div class="yu-list">
    <yu-top-nav
      :showFunc="false"
      :name="navName"
      @pullingDown="pullingDown"
      @pullingUp="pullingUp"
    ></yu-top-nav>
    <div class="search" v-if="showSearch">
      <yu-input :height="38" :placeholder="placeholder" ref="input"></yu-input>
      <button class="search-btn" @click="searchClick">搜索</button>
    </div>
    <yu-scroll pullDownRefresh pullUpload class="scroll" ref="scroll">
      <yu-listitem
        v-for="item in pList"
        :key="item.id"
        :showImage="showImage"
        :round="round"
        :width="width"
        :height="height"
        :fit="fit"
        :showState="showState"
        :bgColor="bgColor"
        :currentUserColor="currentUserColor"
        :pData="item"
        class="items"
      ></yu-listitem>
    </yu-scroll>
  </div>
</template>

<script>
import YuTopNav from "components/common/nav/YuTopNav";
import YuListitem from "./YuListitem";
import YuScroll from "components/common/scroll/YuScroll";
import YuInput from "components/common/basic/YuInput";
export default {
  name: "YuList",
  props: {
    navName: {
      type: String,
      required: true,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: true,
    },
    pList: {
      type: Array,
      required: true, //需要展示的数据列表
    },
    showImage: {
      type: Boolean,
      default: false, //是否有图片
    },
    round: {
      type: Boolean,
      default: false, //图片是否显示为圆形
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    fit: {
      type: String, //图片填充模式contain（保持宽高缩放图片，使图片的长边能完全显示出来）,cover,fill,none(原始尺寸),scale-down（取none或contain中较小的一个）
    },
    showState: {
      type: Boolean,
      default: false, //是否显示state,默认在右上角
    },
    bgColor: {
      type: String,
    },
    currentUserColor: {
      type: String,
    },
  },
  data() {
    return {};
  },
  components: {
    YuTopNav,
    YuListitem,
    YuScroll,
    YuInput,
  },
  mounted() {
    this.initScrollStyle();
    this.$refs.scroll.refresh();
  },
  methods: {
    initScrollStyle() {
      let height = window.screen.height;
      let marginTop = 44;
      height -= 44;
      if (this.showSearch) {
        height -= 40;
        marginTop -= 44;
      }
      this.$refs.scroll.$el.style.height = height + "px";
      this.$refs.scroll.$el.style.marginTop = marginTop + "px";
    },
    //下拉刷新
    pullingUp() {
      this.$emit("pullingUp");
    },
    // 上来加载
    pullingDown() {
      this.$emit("pullingDown");
    },

    searchClick() {
      this.$emit("searchClick", this.$refs.input.value);
    },
  },
};
</script>

<style scoped>
.yu-list {
  display: flex;
  flex-direction: column;
}
.search {
  height: 40px;
  width: 100%;
  margin-top: 44px;
  position: relative;
}
.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 12px;
  height: 37px;
  border: none;
  border-radius: 0 3px 3px 0;
}
.scroll {
  width: 100vw;
  overflow: hidden;
}
.items {
  margin-bottom: 5px;
}
</style>
